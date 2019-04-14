import * as Domain from "@app/domain";

export interface Store {
  rootSource: string;
  dependencies: string[];
  changeRootSource: (nextSource: string) => void;
}

export const generateStore = (domainStores: Domain.Stores): Store => ({
  rootSource: domainStores.app.state.rootSource,
  dependencies: domainStores.app.state.flatDependencies.map(d => d.source),
  changeRootSource: (nextSource: string) => {
    domainStores.app.dispatch({
      type: "UPDATE_ROOT_SOURCE",
      source: nextSource,
    });
  },
});
