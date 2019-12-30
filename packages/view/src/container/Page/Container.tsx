import * as Domain from "@app/domain";
import * as React from "react";
import * as Counter from "../Counter";
import { generateStore, Store } from "./Store";
import { CounterPage } from "@app/component";

const generateProps = (stores: Domain.Stores, store: Store): CounterPage.Props => {
  return {
    heading: {
      children: "Counter",
    },
    counter: Counter.generateProps(store.counter),
  };
};

export const Container = ({ reducers }: { reducers: Domain.Reducers }) => {
  const createReducer = <T, S>([state, dispatch]: [T, S]): { state: T; dispatch: S } => ({ state, dispatch });
  const domainStores: Domain.Stores = {
    app: createReducer(React.useReducer(...reducers.app)),
  };
  const viewStore = generateStore(domainStores);
  return <CounterPage.Component {...generateProps(domainStores, viewStore)} />;
};
