const chalk = require("chalk");
const peg = require("pegjs");
const fs = require("fs");

module.exports = class StellarisParser {

    constructor() {

        try {

            // Loads the grammar and creates parser
            let gramamr = fs.readFileSync(`./src/stellaris.pegjs`, "utf8");
            this._parser = peg.generate(gramamr);

        } catch (e) {
            console.error("PegJS Error:");
            console.error(chalk.red(e.message || e));
            return undefined;
        }
    }

    parse(text) {

        try {

            // Attempt to parse 
            return this._parser.parse(text);

        } catch (e) {

            let start = e.location.start; // line, column, offset
            let end = e.location.end; // line, column, offset

            // Display red error
            console.error(chalk.red(`${e.name}`));
            console.error(chalk.red(`${e.message} ( ${start.line}:${start.column} to ${end.line}:${end.column} )`));
        }
    }
}