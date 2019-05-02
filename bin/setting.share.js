"use strict";
exports.__esModule = true;
var paths_1 = require("./paths");
var filesystem_1 = require("./filesystem");
var generateShareScripts = function (name) {
    return {
        lint: "eslint --cache --cache-location ../../buildcache/" + name + " -c ../../.eslintrc.json 'src/**/*.{ts,tsx}'",
        develop: undefined,
        "build:lib": undefined,
        "lint:fix": "yarn run lint --fix",
        "test:ci": name === "view" ? "yarn run build:scripts && yarn run test && codecov" : "yarn run test && codecov",
        "format": "prettier --config ../../.prettierrc --write src/*.{ts,tsx}",
        "test:jest": "jest --cache -c ./jest.config.json",
        "clean": "rimraf ./lib ./build",
        "clean:cache": undefined,
        "clean:lib": undefined,
        "test:watch": "yarn run test:jest --watch"
    };
};
var generateSheareJestConfig = function (name) { return ({
    cacheDirectory: "<rootDir>/../../buildcache/" + name
}); };
var updatePackage = function () {
    paths_1.packageNameList.forEach(function (name) {
        var pkg = filesystem_1.readConfig(paths_1.packages[name]);
        var shareScripts = generateShareScripts(name);
        Object.keys(shareScripts).forEach(function (key) {
            pkg.scripts[key] = shareScripts[key];
        });
        filesystem_1.saveConfig(paths_1.packages[name], pkg);
    });
};
var updateJestConfig = function () {
    paths_1.packageNameList.forEach(function (name) {
        var jestConfig = filesystem_1.readConfig(paths_1.jestConfigs[name]);
        var sharedConfigs = generateSheareJestConfig(name);
        Object.keys(sharedConfigs).forEach(function (key) {
            jestConfig[key] = sharedConfigs[key];
        });
        filesystem_1.saveConfig(paths_1.jestConfigs[name], jestConfig);
    });
};
updatePackage();
updateJestConfig();
