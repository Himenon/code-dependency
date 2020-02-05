import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Editor } from "@app/container";
import * as Wrapper from "./Wrapper";
import { ServerSideRenderingProps } from "@app/interface";

export const RootRouter = (props: ServerSideRenderingProps) => {
  return (
    <Router basename={props.routeProjectBasePath}>
      <Switch>
        <Route key={props.routeProjectPath} path={props.routeProjectPath}>
          <Wrapper.Container ssrProps={props} component={Editor.Container} />
        </Route>
      </Switch>
    </Router>
  );
};
