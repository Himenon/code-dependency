import { InputSourceDependency, ViewSourceDependency } from "@code-dependency/interfaces";

/**
 * `InputSourceDependency[dependencies]`が循環依存する`InputSourceDependency[source]`の配列を返す。
 *
 * TODO a -> b -> c -> a
 */
const getCircularRefs = (target: InputSourceDependency, flatDependencies: InputSourceDependency[]): string[] => {
  const refs: string[] = [];
  target.dependencies.forEach(dependency => {
    if (!dependency.module.startsWith(".") || !dependency.resolved) {
      return;
    }
    // `InputSourceDependency[dependencies]` --> `InputSourceDependency[]`
    const circularDeps = flatDependencies
      // child -> parent[]
      .filter(flatDep => flatDep.source === dependency.resolved)
      // (parent has child)[]
      .filter(flatDep => {
        return flatDep.dependencies.filter(dep => dep.resolved === target.source).length > 0;
      });
    if (circularDeps.length > 0) {
      refs.push(dependency.resolved);
    }
  });
  return refs;
};

export const transformViewDependency = (flatDependencies: InputSourceDependency[]): ViewSourceDependency[] => {
  return flatDependencies.map(inputSourceDependency => {
    return {
      ...inputSourceDependency,
      circular: getCircularRefs(inputSourceDependency, flatDependencies),
    };
  });
};
