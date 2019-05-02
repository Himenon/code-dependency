"use strict";
exports.__esModule = true;
var paths_1 = require("./paths");
var filesystem_1 = require("./filesystem");
var isDistMode = process.argv[2] === "dist";
exports.rewriteTsconfig = function () {
    var tsConfig = filesystem_1.readConfig(paths_1.tsConfigs.view);
    tsConfig.compilerOptions.tsBuildInfoFile = isDistMode ? undefined : "../../buildcache/view/tsconfig.json.tsbuildinfo";
    filesystem_1.saveConfig(paths_1.tsConfigs.view, tsConfig);
};
exports.rewriteTsconfig();
