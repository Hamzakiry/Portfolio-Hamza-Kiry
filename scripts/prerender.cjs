// Render the existing home components into the static build; no second content source.
process.env.NODE_ENV = "production";
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
require("dotenv").config({ path: path.join(root, ".env.local") });
require("dotenv").config({ path: path.join(root, ".env") });
const packageInfo = require("../package.json");
const configuredAssetBase = process.env.PUBLIC_URL ?? new URL(packageInfo.homepage).pathname;
const assetPath = /^https?:\/\//.test(configuredAssetBase) ? new URL(configuredAssetBase).pathname : configuredAssetBase;
process.env.PUBLIC_URL = assetPath.replace(/\/$/, "");
const buildDirectory = path.resolve(root, process.env.BUILD_PATH || "build");
const siteUrl = new URL(process.env.PORTFOLIO_SITE_URL || `${packageInfo.homepage.replace(/\/$/, "")}/`);
if (siteUrl.protocol !== "https:" || siteUrl.search || siteUrl.hash) throw new Error("PORTFOLIO_SITE_URL must be a clean HTTPS URL");
const canonicalSite = siteUrl.href.replace(/\/$/, "") + "/";
const previousSite = packageInfo.homepage.replace(/\/$/, "") + "/";
const files = require(path.join(buildDirectory, "asset-manifest.json")).files;
const original = require.extensions[".js"];
const babel = require("@babel/core");
function compile(module, filename) {
  if (!filename.startsWith(path.join(root, "src") + path.sep)) return original(module, filename);
  const { code } = babel.transformSync(fs.readFileSync(filename, "utf8"), {
    filename, babelrc: false, configFile: false,
    presets: [[require.resolve("@babel/preset-env"), { targets: { node: "current" } }], [require.resolve("@babel/preset-react"), { runtime: "automatic" }]],
  });
  module._compile(code, filename);
}
require.extensions[".js"] = compile;
require.extensions[".jsx"] = compile;
require.extensions[".webp"] = (module, filename) => {
  const value = files[`static/media/${path.basename(filename)}`];
  if (!value) throw new Error(`Missing built image: ${filename}`);
  module.exports = value;
};
const React = require("react");
const { renderToString } = require("react-dom/server");
const { MemoryRouter } = require("react-router-dom");
const Home = require("../src/Home").default;
const { LanguageProvider } = require("../src/i18n/Language");
const markup = renderToString(React.createElement(LanguageProvider, null, React.createElement(MemoryRouter, null, React.createElement(Home))))
  .replace(/href="\/(projects|contact)?"/g, (_, route = "") => `href="${process.env.PUBLIC_URL}/#/${route}"`);
const output = path.join(buildDirectory, "index.html");
let html = fs.readFileSync(output, "utf8");
if (!html.includes('<div id="root"></div>')) throw new Error("Build root not found; refusing to silently skip pre-rendering");
html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
// Keep the current GitHub Pages build intact; customize metadata only for an explicit target.
if (canonicalSite !== previousSite) html = html.split(previousSite).join(canonicalSite);
const token = process.env.GOOGLE_SITE_VERIFICATION;
if (token) {
  if (!/^[A-Za-z0-9_-]+$/.test(token)) throw new Error("Invalid Google verification token");
  html = html.replace("</head>", `<meta name="google-site-verification" content="${token}"/></head>`);
}
fs.writeFileSync(output, html);
const sitemapPath = path.join(buildDirectory, "sitemap.xml");
fs.writeFileSync(sitemapPath, fs.readFileSync(sitemapPath, "utf8").split(previousSite).join(canonicalSite));
if (process.env.PORTFOLIO_SITE_URL) {
  fs.writeFileSync(path.join(buildDirectory, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${canonicalSite}sitemap.xml\n`);
}
console.log(`Pre-rendered existing homepage (${Buffer.byteLength(markup)} bytes).`);
