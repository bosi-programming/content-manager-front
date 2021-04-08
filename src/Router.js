import React, { useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import EditorScreen from "./screens/EditorScreen";
import Login from "./screens/Login";
import constants from './constants';

function Router() {
  const history = useHistory();

  const token = localStorage.getItem("token");

  const isOnLogin = /login/.test(window.location);

  useEffect(() => {
    if (!isOnLogin) {
      fetch(`${constants.baseUrl}/users`, {
        headers: { "x-access-token": token },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.logged) {
            console.log(data.logged);
            console.log(history);
            history.push("/login");
          }
        })
        .catch((e) => {
          if (!isOnLogin && history) {
            history.push("/login");
          }
        });
    }
  }, [token, history, isOnLogin]);

  return (
    <>
      {!isOnLogin && <p>Test</p>}
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/editor">
          <EditorScreen />
        </Route>
      </Switch>
    </>
  );
}

export default Router;
