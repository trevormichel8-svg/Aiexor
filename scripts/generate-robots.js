const fs = require("fs");

const robots = `User-agent: *
Allow: /

Sitemap: https://aiexor.com/sitemap.xml
`;

fs.writeFileSync("robots.txt", robots);
console.log("✓ robots.txt generated");
