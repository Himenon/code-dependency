import * as Domain from "@app/domain";
import * as Counter from "../Counter";

export interface ViewStore {
  counter: Counter.Store;
}

export const createViewStore = (stores: Domain.Stores): ViewStore => {
  return {
    counter: Counter.generateStore(stores),
  };
};
