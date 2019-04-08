import { ResolveOption } from "@my/types";
import * as enhancedResolve from "enhanced-resolve";

const init = (pResolveOptions: ResolveOption, pCachingContext: string) => {
  let gResolver = null;
  const gInitialized = {};
  if (!gInitialized[pCachingContext] || pResolveOptions.bustTheCache) {
    gResolver = enhancedResolve.ResolverFactory.createResolver({
      ...pResolveOptions,
      // we're doing that ourselves for now
      symlinks: false,
    });
    /* eslint security/detect-object-injection:0 */
    gInitialized[pCachingContext] = true;
  }
  return gResolver;
};

export const resolve = (pModuleName: string, pFileDir: string, pResolveOptions: ResolveOption, pCachingContext = "cruise"): string => {
  const gResolver = init(pResolveOptions, pCachingContext);
  if (!gResolver) {
    return "";
  }

  return gResolver.resolveSync(
    {},
    // lookupStartPath
    pFileDir,
    // request
    pModuleName,
  );
};
