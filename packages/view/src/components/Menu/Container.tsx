import * as React from "react";
import * as Menu from "./Menu";
import { Store } from "./Store";

const styles = require("./menu.scss");

const generateProps = (rootSource: string, store: Store): Menu.Props => {
  const isActive = rootSource === store.rootSource;
  return {
    li: {
      key: rootSource,
    },
    a: {
      href: "#",
      className: [styles.navLink, isActive ? styles.active : ""].join(" "),
      onClick: () => {
        store.changeRootSource(rootSource);
      },
      children: rootSource,
    },
  };
};

export const Container = ({ store }: { store: Store }) => {
  return (
    <ul className={[styles.nav, styles.flexColumn].join(" ")}>
      {store.dependencies.map(key => {
        return <Menu.Component {...generateProps(key, store)} key={`menu-item-${key}`} />;
      })}
    </ul>
  );
};
