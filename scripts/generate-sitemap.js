const fs = require("fs");
const path = require("path");

function generateSitemap() {
  const pages = fs.readdirSync(".");
  const urls = pages
    .filter(file => file.endsWith(".html"))
    .map(file => `<url><loc>https://aiexor.com/${file}</loc></url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  fs.writeFileSync("sitemap.xml", xml);
  console.log("Generated sitemap.xml");
}

module.exports = generateSitemap;

generateSitemap();
