"use strict";
exports.__esModule = true;
var paths_1 = require("./paths");
var filesystem_1 = require("./filesystem");
var isDistMode = process.argv[2] === "dist";
exports.updateDistributionSettings = function () {
    var tsConfig = filesystem_1.readConfig(paths_1.tsConfigShared);
    tsConfig.compilerOptions.sourceMap = isDistMode ? false : true;
    tsConfig.compilerOptions.declarationMap = isDistMode ? false : true;
    filesystem_1.saveConfig(paths_1.tsConfigShared, tsConfig);
};
exports.updateDistributionSettings();
