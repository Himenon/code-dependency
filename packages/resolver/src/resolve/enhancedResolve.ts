import { ResolveOption } from "@code-dependency/interfaces";
import * as enhancedResolve from "enhanced-resolve";

interface CacheResolver {
  [key: string]: ReturnType<typeof enhancedResolve.ResolverFactory.createResolver>;
}

const cachedResolver: CacheResolver = {};

const createResolver = (option: ResolveOption, cacheContext: string) => {
  if (!cachedResolver[cacheContext]) {
    return (cachedResolver[cacheContext] = enhancedResolve.ResolverFactory.createResolver({
      ...option,
      symlinks: false,
    }));
  }
  return cachedResolver[cacheContext];
};

/**
 * @see https://github.com/webpack/enhanced-resolve
 */
export const resolve = (moduleName: string, fileDir: string, option: ResolveOption, cacheContext = "code-dependency"): string => {
  const resolver = createResolver(option, cacheContext);
  return resolver.resolveSync({}, fileDir, moduleName);
};
