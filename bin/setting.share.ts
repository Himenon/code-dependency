import { monorepoSettings } from "./settings";
import { readConfig, saveConfig } from "./filesystem";
import { PackageJson } from "type-fest";
import { JestConfig } from "./types";

const generateShareScripts = (name: string) => {
  return {
    lint: `eslint --cache --cache-location ../../buildcache/${name}/ -c ../../.eslintrc.json 'src/**/*.{ts,tsx}'`,
    "build:lib": undefined,
    "lint:fix": "yarn run lint --fix",
    "test:ci": name === "view" ? "yarn run build:scripts && yarn run test && codecov" : "yarn run test && codecov",
    format: "prettier --config ../../.prettierrc --write src/*.{ts,tsx}",
    "test:jest": "jest --cache -c ./jest.config.json",
    clean: "rimraf ./lib ./build",
    "clean:cache": undefined,
    "clean:lib": "rimraf lib",
    "test:watch": "yarn run test:jest --watch",
  };
};

const generateShareJestConfig = (name: string) => ({
  cacheDirectory: `<rootDir>/../../buildcache/${name}`,
});

const updatePackage = () => {
  Object.entries(monorepoSettings).forEach(entry => {
    const [pkgName, settings] = entry;
    const pkg = readConfig<PackageJson>(settings.packageJson);
    const shareScripts = generateShareScripts(pkgName);
    pkg.version = settings.version.value;
    Object.keys(shareScripts).forEach(key => {
      if (pkg.scripts) {
        pkg.scripts[key] = shareScripts[key];
      }
    });
    Object.entries(monorepoSettings).forEach(innerEntry => {
      const version = innerEntry[1].version;
      if (pkg.dependencies && version.name in pkg.dependencies) {
        pkg.dependencies[version.name] = `^${version.value}`;
      }
      if (pkg.devDependencies && version.name in pkg.devDependencies) {
        pkg.devDependencies[version.name] = `^${version.value}`;
      }
      if (pkg.peerDependencies && version.name in pkg.peerDependencies) {
        pkg.peerDependencies[version.name] = `^${version.value}`;
      }
    });
    saveConfig(settings.packageJson, pkg);
  });
};

const updateJestConfig = () => {
  Object.entries(monorepoSettings).forEach(entry => {
    const [name, settings] = entry;
    const jestConfig = readConfig<JestConfig>(settings.jestConfig);
    const sharedConfigs = generateShareJestConfig(name);
    Object.keys(sharedConfigs).forEach(key => {
      jestConfig[key] = sharedConfigs[key];
    });
    saveConfig(settings.jestConfig, jestConfig);
  });
};

updatePackage();
updateJestConfig();
