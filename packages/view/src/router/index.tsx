import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Editor } from "@app/container";
import { InjectionMethod } from "@app/interface";

export const RootRouter = (_props: InjectionMethod) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route key="/" path="/" exact={true} basename={process.env.PUBLIC_PATH}>
          <Editor.Container />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
