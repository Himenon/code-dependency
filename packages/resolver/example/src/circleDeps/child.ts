import { Container } from "./parent";

export interface Item {
  name: string;
  container?: Container;
}

export const createItem = (name: string): Item => {
  return {
    name,
  };
};
