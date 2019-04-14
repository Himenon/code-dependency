import * as Domain from "@app/domain";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";

export interface ViewStore {
  menu: Menu.Store;
  dendrogram: Dendrogram.Store;
}

export const createViewStore = (stores: Domain.Stores): ViewStore => {
  return {
    menu: Menu.generateStore(stores),
    dendrogram: Dendrogram.generateStore(stores),
  };
};
