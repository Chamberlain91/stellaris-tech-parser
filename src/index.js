const StellarisParser = require("./parser");
const fs = require("fs");

// To load from a .env file the DIRECTORY variable
// to not expose my local filesystem path to github
require("dotenv").load();

// Get base directory
let directory = process.env.DIRECTORY || ".";

// 
const parser = new StellarisParser();
if (!parser) {
    process.exit(-1); // Bad!
}

// TODO: Recursively scan directories?

// Load tech file and parser
let text = fs.readFileSync(`${directory}/00_phys_weapon_tech.txt`, "utf8");
let data = parser.parse(text);

// Make output directory
if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
}

// Write result to output directory
fs.writeFileSync("dist/result.json", JSON.stringify(data, null, 4), "utf8");