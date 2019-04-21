import * as Domain from "../domain";
import { createItem, Item } from "./child";

export interface Container {
  children: Item[];
  model?: string;
}

export const createContainer = (): Container => {
  return {
    children: [createItem("item1")],
    model: Domain.App.Model.createModel(),
  };
};
