import * as Domain from "@app/domain";
import * as React from "react";
import { Template } from "./components";
import "./style.scss";

interface AppProps {
  reducers: Domain.Reducers;
}

export const App = ({ reducers }: AppProps) => {
  return <Template.Container reducers={reducers} />;
};

export { AppProps as Props, App as Container };
