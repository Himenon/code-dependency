import React from "react";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import { Editor } from "@app/container";

export const createRouter = async () => {
  const EditorContainer = await Editor.createContainer();
  return () => (
    <Router hashType="noslash">
      <Switch>
        <Route key="/" path="/" exact={true} basename={process.env.PUBLIC_PATH}>
          <EditorContainer />
        </Route>
      </Switch>
    </Router>
  );
};
