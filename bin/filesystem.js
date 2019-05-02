"use strict";
exports.__esModule = true;
var fs = require("fs");
exports.readConfig = function (filename) {
    try {
        return JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
    }
    catch (e) {
        throw Error("Failed: " + filename);
    }
};
exports.saveConfig = function (filename, data) {
    console.log("Save file: " + filename);
    fs.writeFileSync(filename, JSON.stringify(data, null, 2) + "\n", { encoding: "utf-8" });
};
exports.mkdirP = function (dirPath) {
    if (!fs.existsSync(dirPath) && !fs.statSync(dirPath).isDirectory()) {
        console.log("Make dir : " + dirPath);
        fs.mkdirSync(dirPath, { recursive: true });
    }
    else {
        console.log("Already exists: " + dirPath);
    }
};
