export interface TsConfig {
  extends?: "../tsconfig.shared";
  compilerOptions: {
    tsBuildInfoFile?: "buildcache/tsconfig.json.tsbuildinfo";
    sourceMap?: boolean;
    declarationMap?: boolean;
  }
}

interface Package {
  scripts: { [key: string]: string }
}

interface JestConfig {
  cacheDirectory?: string;
}
