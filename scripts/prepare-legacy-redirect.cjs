// GitHub Pages cannot send an HTTP 301; use an instant refresh plus a route-preserving script.
const fs = require("fs");
const path = require("path");
const target = "https://hamza-kiry-portfolio.vercel.app/";
const output = path.resolve(__dirname, "../build-legacy");
fs.mkdirSync(output, { recursive: true });
const html = String.raw`<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Hamza Kiry Portfolio | IA &amp; Big Data</title>
<meta name="description" content="Portfolio de Hamza Kiry, étudiant ingénieur en IA et Big Data. Retrouvez mes projets, certifications et CV."/>
<meta name="google-site-verification" content="4Se9ZSrSuTzjrOvj-OuhBqFCtH-VfA7XY5zvNXwtYhE"/>
<meta name="robots" content="index,follow"/>
<link rel="canonical" href="${target}"/>
<link rel="icon" type="image/png" sizes="96x96" href="${target}favicon.png"/>
<meta property="og:site_name" content="Hamza Kiry Portfolio"/>
<meta property="og:title" content="Hamza Kiry Portfolio | IA &amp; Big Data"/>
<meta property="og:url" content="${target}"/>
<meta property="og:image" content="${target}hamza-kiry.webp"/>
<script>
(function () {
  var hash = window.location.hash;
  if (!hash && /\/(contact|projects)\/?$/.test(window.location.pathname)) {
    hash = "#/" + window.location.pathname.match(/\/(contact|projects)\/?$/)[1];
  }
  window.location.replace("${target}" + window.location.search + hash);
})();
</script>
<meta http-equiv="refresh" content="0;url=${target}"/>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#101312;color:#f5f5ef;font:16px system-ui,sans-serif}main{max-width:34rem;padding:2rem}a{color:#bdedb5}img{width:72px;height:72px;border-radius:50%}</style>
</head><body><main>
<img src="${target}favicon.png" alt="Hamza Kiry" width="72" height="72"/>
<h1>Hamza Kiry Portfolio</h1>
<p>Mon portfolio est désormais disponible à cette adresse :</p>
<p><a href="${target}">hamza-kiry-portfolio.vercel.app</a></p>
</main></body></html>`;
for (const name of ["index.html", "404.html"]) fs.writeFileSync(path.join(output, name), html);
for (const name of ["favicon.png", "favicon.ico", "logo192.png", "logo512.png"]) {
  fs.copyFileSync(path.resolve(__dirname, "../public", name), path.join(output, name));
}
fs.cpSync(path.resolve(__dirname, "../public/cv"), path.join(output, "cv"), { recursive: true });
fs.writeFileSync(path.join(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${target}</loc></url></urlset>`);
console.log("Prepared legacy GitHub Pages redirect to " + target);
