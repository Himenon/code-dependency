import * as Domain from "@app/domain";
import * as Dendrogram from "../Dendrogram";

export interface ViewStore {
  dendrogram: Dendrogram.Store;
}

export const createViewStore = (stores: Domain.Stores): ViewStore => {
  return {
    dendrogram: Dendrogram.generateStore(stores),
  };
};
