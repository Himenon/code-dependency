import * as React from "react";

interface ClassNames {
  navItem?: string;
  navLink?: string;
}

const styles: ClassNames = require("./menu.scss");

export interface MenuProps {
  a: JSX.IntrinsicElements["a"];
  li: JSX.IntrinsicElements["li"];
}

export const Menu = (props: MenuProps) => {
  return (
    <li className={styles.navItem} {...props.li}>
      <a href="#" className={styles.navLink} {...props.a} />
    </li>
  );
};

export { MenuProps as Props, Menu as Component };
