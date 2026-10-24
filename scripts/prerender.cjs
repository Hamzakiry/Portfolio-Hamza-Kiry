// Render the existing home components into the static build; no second content source.
process.env.NODE_ENV = "production";
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
require("dotenv").config({ path: path.join(root, ".env.local") });
require("dotenv").config({ path: path.join(root, ".env") });
process.env.PUBLIC_URL = "/Portfolio-Hamza-Kiry";
const files = require(path.join(root, "build/asset-manifest.json")).files;
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
const output = path.join(root, "build/index.html");
let html = fs.readFileSync(output, "utf8");
if (!html.includes('<div id="root"></div>')) throw new Error("Build root not found; refusing to silently skip pre-rendering");
html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
const token = process.env.GOOGLE_SITE_VERIFICATION;
if (token) {
  if (!/^[A-Za-z0-9_-]+$/.test(token)) throw new Error("Invalid Google verification token");
  html = html.replace("</head>", `<meta name="google-site-verification" content="${token}"/></head>`);
}
fs.writeFileSync(output, html);
console.log(`Pre-rendered existing homepage (${Buffer.byteLength(markup)} bytes).`);
