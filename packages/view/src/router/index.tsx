import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Editor } from "@app/container";
import * as Wrapper from "./Wrapper";
import { ServerSideRenderingProps } from "@app/interface";

export const RootRouter = (props: ServerSideRenderingProps) => {
  return (
    <Router basename={props.pagePathname}>
      <Switch>
        <Route key={props.publicPathname} path={props.publicPathname}>
          <Wrapper.Container ssrProps={props} component={Editor.Container} />
        </Route>
      </Switch>
    </Router>
  );
};
