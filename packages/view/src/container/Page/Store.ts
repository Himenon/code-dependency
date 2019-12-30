import * as Domain from "@app/domain";
import * as Counter from "../Counter";

export const generateStore = (stores: Domain.Stores) => {
  return {
    counter: Counter.generateStore(stores),
  };
};

export type Store = ReturnType<typeof generateStore>;
