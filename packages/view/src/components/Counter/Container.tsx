import * as React from "react";
import * as Counter from "./Counter";
import { Store } from "./Store";

const generateProps = (store: Store): Counter.Props => {
  return {
    counterDisplay: {
      children: store.value,
    },
    countUpper: {
      onClick: store.countUp,
      children: "Count Up",
    },
  };
};

export const Container = ({ store }: { store: Store }) => {
  return <Counter.Component {...generateProps(store)} />;
};
