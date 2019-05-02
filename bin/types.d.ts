export interface TsConfig {
  extends?: "../tsconfig.shared";
  compilerOptions: {
    tsBuildInfoFile?: string;
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
