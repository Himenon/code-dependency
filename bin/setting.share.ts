import { packages, jestConfigs, packageNameList } from "./paths";
import { readConfig, saveConfig } from "./filesystem";
import { Package, JestConfig } from "./types";
import { MonorepoPackageVersion } from "./types";

const versions: MonorepoPackageVersion = {
  cli: {
    name: "@code-dependency/cli",
    version: "0.0.1-alpha.0",
  },
  map: {
    name: "@code-dependency/map",
    version: "0.0.1-alpha.0",
  },
  converter: {
    name: "@code-dependency/converter",
    version: "0.0.1-alpha.0",
  },
  extract: {
    name: "@code-dependency/extract",
    version: "0.0.1-alpha.0",
  },
  interfaces: {
    name: "@code-dependency/interfaces",
    version: "0.0.1-alpha.0",
  },
  resolver: {
    name: "@code-dependency/resolver",
    version: "0.0.1-alpha.0",
  },
  view: {
    name: "@code-dependency/view",
    version: "0.0.1-alpha.0",
  },
}

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
    "clean:lib": "rimraf lib",
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
    pkg.version = versions[name].version;
    Object.keys(shareScripts).forEach(key => {
      pkg.scripts[key] = shareScripts[key];
    });
    Object.values(versions).forEach(value => {
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
