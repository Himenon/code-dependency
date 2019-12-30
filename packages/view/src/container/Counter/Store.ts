import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => ({
  value: domainStores.app.state.value,
  countUp: () => {
    domainStores.app.dispatch({ type: "UPDATE_COUNT", value: domainStores.app.state.value + 1 });
  },
});

export type Store = ReturnType<typeof generateStore>;
