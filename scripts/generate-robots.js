const fs = require("fs");

function generateRobots() {
  const robots = `
User-agent: *
Allow: /

Sitemap: https://aiexor.com/sitemap.xml
  `;

  fs.writeFileSync("robots.txt", robots.trim());
  console.log("Generated robots.txt");
}

module.exports = generateRobots;

generateRobots();
