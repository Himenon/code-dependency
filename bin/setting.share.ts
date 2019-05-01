import { packages, jestConfigs, packageNameList } from "./paths";
import { readConfig, saveConfig } from "./filesystem";
import { Package, JestConfig } from "./types";

const shareScripts: Package["scripts"] = {
  // lint: "eslint --cache --cache-location buildcache -c ../../.eslintrc.json 'src/**/*.{ts,tsx}'",
  develop: undefined,
  "lint:fix": "yarn run lint --fix",
  "test:ci": "yarn run test && codecov",
  "format": "prettier --config ../../.prettierrc --write src/*.{ts,tsx}",
  "test:jest": "jest --cache -c ./jest.config.json",
  "test:watch": "yarn run test:jest --watch",
}

const sharedJestConfig: JestConfig = {
  cacheDirectory: "<rootDir>/buildcache"
};

const updatePackage = () => {
  packageNameList.forEach(name => {
    const pkg = readConfig<Package>(packages[name]);
    Object.keys(shareScripts).forEach(key => {
      if (key in pkg.scripts) {
        pkg.scripts[key] = shareScripts[key];
      }
    });
    saveConfig(packages[name], pkg);
  })
}

const updateJestConfig = () => {
  packageNameList.forEach(name => {
    const jestConfig = readConfig<JestConfig>(jestConfigs[name]);
    Object.keys(sharedJestConfig).forEach(key => {
      jestConfig[key] = sharedJestConfig[key];
    });
    saveConfig(jestConfigs[name], jestConfig);
  })
}

updatePackage();
updateJestConfig();
