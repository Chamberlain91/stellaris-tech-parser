const peg = require("pegjs");
const chalk = require("chalk");
const fs = require("fs");

let file = "stellaris";

// 
let gramamr = fs.readFileSync(`src/${file}.pegjs`, "utf8");
let tech = fs.readFileSync(`src/${file}.txt`, "utf8");

try {

    // Generate Parser
    let parser = peg.generate(gramamr);

    try {

        // Parse result
        let data = parser.parse(tech);

        // Write result
        fs.writeFileSync("result.json", JSON.stringify(data, null, 4), "utf8");

    } catch (e) {

        let start = e.location.start; // line, column, offset
        let end = e.location.end; // line, column, offset

        // Display red error
        console.error(chalk.red(`${e.name}`));
        console.error(chalk.red(`${e.message} ( ${start.line}:${start.column} )`));
    }

} catch (e) {
    console.error("PegJS Error:");
    console.error(chalk.red(e.message || e));
}

function escape(str) {
    if (str) {
        return str
            .replace(/[\\]/g, '\\\\')
            .replace(/[\"]/g, '\\\"')
            .replace(/[\/]/g, '\\/')
            .replace(/[\b]/g, '\\b')
            .replace(/[\f]/g, '\\f')
            .replace(/[\n]/g, '\\n')
            .replace(/[\r]/g, '\\r')
            .replace(/[\t]/g, '\\t');
    } else {
        return undefined;
    }
};