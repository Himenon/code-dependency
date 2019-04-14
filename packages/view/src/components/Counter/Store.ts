import * as Domain from "@app/domain";

export interface Store {
  value: number;
  countUp: () => void;
}

export const generateStore = (domainStores: Domain.Stores): Store => ({
  value: domainStores.app.state.value,
  countUp: () => {
    domainStores.app.dispatch({ type: "UPDATE_COUNT", value: domainStores.app.state.value + 1 });
  },
});
