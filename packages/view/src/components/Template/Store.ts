import * as Domain from "@app/domain";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";
import * as ProjectMenu from "../ProjectMenu";

export interface ViewStore {
  menu: Menu.Store;
  dendrogram: Dendrogram.Store;
  projectMenu: ProjectMenu.Store;
}

export const createViewStore = (stores: Domain.Stores): ViewStore => {
  return {
    menu: Menu.generateStore(stores),
    dendrogram: Dendrogram.generateStore(stores),
    projectMenu: ProjectMenu.generateStore(stores),
  };
};
