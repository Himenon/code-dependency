import * as Types from "@app/types";

import * as React from "react";
import * as Link from "./TreeLink";

import { Store } from "./Store";

const generateProps = (store: Store, link: Types.Link): Link.Props => {
  return {
    x1: link.source.x * store.position.scale.x + store.position.offset.x,
    x2: link.target.x * store.position.scale.x + store.position.offset.x,
    y1: link.source.y * store.position.scale.y + store.position.offset.y,
    y2: link.target.y * store.position.scale.y + store.position.offset.y,
  };
};

export const Container = ({ store }: { store: Store }) => {
  if (!store.canShow) {
    return null;
  }
  return (
    <>
      {store.links.map((link, idx) => {
        return <Link.Component {...generateProps(store, link)} key={`link-${idx}`} />;
      })}
    </>
  );
};
