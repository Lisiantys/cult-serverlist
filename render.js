const ejs = require("ejs");
const config = require("./config.json");
const fs = require("fs");
const { execSync } = require("child_process");

async function main() {
    config.revision = execSync('git rev-parse HEAD').toString().trim();
    config.site.revisionTime = execSync('git log -1 --format=%at').toString().trim();

    const renderedHtml = await ejs.renderFile("./views/index.ejs", config);
    fs.writeFileSync("./public/index.html", renderedHtml);
}

main();
