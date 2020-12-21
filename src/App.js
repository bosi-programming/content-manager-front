import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import EditorScreen from "./screens/EditorScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/editor">
          <EditorScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
