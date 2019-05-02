"use strict";
exports.__esModule = true;
var path = require("path");
var main = function () {
    if (process.argv.length < 4) {
        console.log("At least set argument 2");
        return;
    }
    var cwd = process.cwd();
    var file1 = path.resolve(cwd, process.argv[2]);
    var file2 = path.resolve(cwd, process.argv[3]);
    var childPackage = require(file1);
    var parentPackage = require(file2);
    var dependenciesSet = new Set(Object.keys(childPackage.dependencies || {}));
    var devDependenciesSet = new Set(Object.keys(childPackage.devDependencies || {}));
    Object.keys(parentPackage.dependencies || {}).forEach(function (dependency) {
        dependenciesSet["delete"](dependency);
    });
    Object.keys(parentPackage.devDependencies || {}).forEach(function (devDependencies) {
        devDependenciesSet["delete"](devDependencies);
    });
    var pkgDiff = {
        dependencies: {},
        devDependencies: {}
    };
    dependenciesSet.forEach(function (key) {
        pkgDiff.dependencies[key] = childPackage.dependencies[key];
    });
    devDependenciesSet.forEach(function (key) {
        pkgDiff.devDependencies[key] = childPackage.devDependencies[key];
    });
    console.log(JSON.stringify(pkgDiff, null, 2));
};
main();
