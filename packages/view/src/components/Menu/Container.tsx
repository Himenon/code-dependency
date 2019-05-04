import * as React from "react";
import * as Menu from "./Menu";
import { Store } from "./Store";

const generateProps = (store: Store): Menu.Props => {
  return {
    rootDirectory: store.rootDirectory,
  };
};

export const Container = ({ store }: { store: Store }) => {
  return <Menu.Component {...generateProps(store)} />;
};
