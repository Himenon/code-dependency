"use strict";
exports.__esModule = true;
var paths_1 = require("./paths");
var filesystem_1 = require("./filesystem");
var path = require("path");
var rewriteTsBuildInfoFile = function () {
    paths_1.packageNameList.map(function (name) {
        var tsConfigFileName = paths_1.tsConfigs[name];
        var tsConfig = filesystem_1.readConfig(tsConfigFileName);
        filesystem_1.mkdirP(path.join("buildcache", name));
        tsConfig["extends"] = "../tsconfig.shared";
        tsConfig.compilerOptions.tsBuildInfoFile = "../../buildcache/" + name + "/tsconfig.json.tsbuildinfo";
        filesystem_1.saveConfig(tsConfigFileName, tsConfig);
    });
};
rewriteTsBuildInfoFile();
