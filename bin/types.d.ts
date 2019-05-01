export interface TsConfig {
  compilerOptions: {
    tsBuildInfoFile?: string;
  }
}

interface Package {
  scripts: { [key: string]: string }
}

interface JestConfig {
  cacheDirectory?: string;
}
