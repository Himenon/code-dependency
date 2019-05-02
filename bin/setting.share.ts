import { packages, jestConfigs, packageNameList } from "./paths";
import { readConfig, saveConfig } from "./filesystem";
import { Package, JestConfig } from "./types";

const generateShareScripts = (name: string) => {
  return {
    lint: `eslint --cache --cache-location ../../buildcache/${name}/ -c ../../.eslintrc.json 'src/**/*.{ts,tsx}'`,
    develop: undefined,
    "build:lib": undefined,
    "lint:fix": "yarn run lint --fix",
    "test:ci": name === "view" ? "yarn run build:scripts && yarn run test && codecov" : "yarn run test && codecov",
    "format": "prettier --config ../../.prettierrc --write src/*.{ts,tsx}",
    "test:jest": "jest --cache -c ./jest.config.json",
    "clean": "rimraf ./lib ./build",
    "clean:cache": undefined,
    "clean:lib": undefined,
    "test:watch": "yarn run test:jest --watch",
  }
};

const generateShareJestConfig = (name: string) => ({
  cacheDirectory: `<rootDir>/../../buildcache/${name}`,
});

const updatePackage = () => {
  packageNameList.forEach(name => {
    const pkg = readConfig<Package>(packages[name]);
    const shareScripts = generateShareScripts(name);
    Object.keys(shareScripts).forEach(key => {
      pkg.scripts[key] = shareScripts[key];
    });
    saveConfig(packages[name], pkg);
  })
}

const updateJestConfig = () => {
  packageNameList.forEach(name => {
    const jestConfig = readConfig<JestConfig>(jestConfigs[name]);
    const sharedConfigs = generateShareJestConfig(name);
    Object.keys(sharedConfigs).forEach(key => {
      jestConfig[key] = sharedConfigs[key];
    });
    saveConfig(jestConfigs[name], jestConfig);
  })
}

updatePackage();
updateJestConfig();
