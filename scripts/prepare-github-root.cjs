// Establish branding at the hostname root used by Google site names and favicons.
// This is a redirect only: the portfolio remains hosted on Vercel.
const fs = require('fs');
const path = require('path');
require('./prepare-legacy-redirect.cjs');
const destination = path.resolve(__dirname, '../tmp/github-root-redirect');
fs.mkdirSync(destination, { recursive: true });
const target = 'https://hamza-kiry-portfolio.vercel.app/';
const schema = {
 '@context': 'https://schema.org', '@type': 'WebSite',
 url: 'https://hamzakiry.github.io/', name: 'Hamza Kiry Portfolio',
 alternateName: ['Hamza Kiry', 'Portfolio Hamza Kiry']
};
let html = fs.readFileSync(path.resolve(__dirname, '../build-legacy/index.html'), 'utf8');
html = html.replace(`href="${target}favicon.png"`, 'href="/favicon.png"');
html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`);
for (const name of ['index.html', '404.html']) fs.writeFileSync(path.join(destination, name), html);
for (const name of ['favicon.png', 'favicon.ico']) fs.copyFileSync(path.resolve(__dirname, '../public', name), path.join(destination, name));
fs.writeFileSync(path.join(destination, '.nojekyll'), '');
fs.writeFileSync(path.join(destination, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${target}sitemap.xml\n`);
console.log('Prepared GitHub hostname branding and redirect at ' + destination);
