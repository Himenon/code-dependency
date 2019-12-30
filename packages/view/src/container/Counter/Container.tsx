import { Counter } from "src/component";
import { Store } from "./Store";

export const generateProps = (store: Store): Counter.Props => {
  return {
    display: {
      children: store.value,
    },
    button: {
      onClick: store.countUp,
      children: "Count Up",
    },
  };
};
