"use strict";
exports.__esModule = true;
var paths_1 = require("./paths");
var filesystem_1 = require("./filesystem");
var versions = {
    cli: {
        name: "@code-dependency/cli",
        version: "0.0.1-alpha.0"
    },
    map: {
        name: "@code-dependency/map",
        version: "0.0.1-alpha.0"
    },
    converter: {
        name: "@code-dependency/converter",
        version: "0.0.1-alpha.0"
    },
    extract: {
        name: "@code-dependency/extract",
        version: "0.0.1-alpha.0"
    },
    interfaces: {
        name: "@code-dependency/interfaces",
        version: "0.0.1-alpha.0"
    },
    resolver: {
        name: "@code-dependency/resolver",
        version: "0.0.1-alpha.0"
    },
    view: {
        name: "@code-dependency/view",
        version: "0.0.1-alpha.0"
    }
};
var generateShareScripts = function (name) {
    return {
        lint: "eslint --cache --cache-location ../../buildcache/" + name + "/ -c ../../.eslintrc.json 'src/**/*.{ts,tsx}'",
        develop: undefined,
        "build:lib": undefined,
        "lint:fix": "yarn run lint --fix",
        "test:ci": name === "view" ? "yarn run build:scripts && yarn run test && codecov" : "yarn run test && codecov",
        "format": "prettier --config ../../.prettierrc --write src/*.{ts,tsx}",
        "test:jest": "jest --cache -c ./jest.config.json",
        "clean": "rimraf ./lib ./build",
        "clean:cache": undefined,
        "clean:lib": "rimraf lib",
        "test:watch": "yarn run test:jest --watch"
    };
};
var generateShareJestConfig = function (name) { return ({
    cacheDirectory: "<rootDir>/../../buildcache/" + name
}); };
var updatePackage = function () {
    paths_1.packageNameList.forEach(function (name) {
        var pkg = filesystem_1.readConfig(paths_1.packages[name]);
        var shareScripts = generateShareScripts(name);
        pkg.version = versions[name].version;
        Object.keys(shareScripts).forEach(function (key) {
            pkg.scripts[key] = shareScripts[key];
        });
        Object.values(versions).forEach(function (value) {
            if (pkg.dependencies && value.name in pkg.dependencies) {
                pkg.dependencies[value.name] = value.version;
            }
            if (pkg.devDependencies && value.name in pkg.devDependencies) {
                pkg.devDependencies[value.name] = value.version;
            }
            if (pkg.peerDependencies && value.name in pkg.peerDependencies) {
                pkg.peerDependencies[value.name] = value.version;
            }
        });
        filesystem_1.saveConfig(paths_1.packages[name], pkg);
    });
};
var updateJestConfig = function () {
    paths_1.packageNameList.forEach(function (name) {
        var jestConfig = filesystem_1.readConfig(paths_1.jestConfigs[name]);
        var sharedConfigs = generateShareJestConfig(name);
        Object.keys(sharedConfigs).forEach(function (key) {
            jestConfig[key] = sharedConfigs[key];
        });
        filesystem_1.saveConfig(paths_1.jestConfigs[name], jestConfig);
    });
};
updatePackage();
updateJestConfig();
