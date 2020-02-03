import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Editor } from "@app/container";
import * as Wrapper from "./Wrapper";
import { ServerSideRenderingProps } from "@app/interface";

export const RootRouter = (props: ServerSideRenderingProps) => {
  return (
    <Router>
      <Switch>
        <Route key="/project" path="/project" basename={process.env.PUBLIC_PATH}>
          <Wrapper.Container ssrProps={props} component={Editor.Container} />
        </Route>
      </Switch>
    </Router>
  );
};
