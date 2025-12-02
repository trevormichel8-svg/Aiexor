const fs = require("fs");
const path = require("path");

const domain = "https://aiexor.com";
const output = path.join(__dirname, "../sitemap.xml");

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);

    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(file));
    } else if (file.endsWith(".html")) {
      results.push(file);
    }
  });

  return results;
}

const pages = getHtmlFiles(path.join(__dirname, ".."));

const urls = pages.map(file => {
  const relative = file.replace(path.join(__dirname, ".."), "");
  const loc = domain + relative.replace(/\\/g, "/");
  const lastmod = new Date().toISOString().split("T")[0];
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

fs.writeFileSync(output, sitemap, "utf8");

console.log("Sitemap generated successfully!");
