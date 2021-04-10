import React, { useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import constants from "./constants";

import LateralMenu from "./components/LateralMenu";

import EditorScreen from "./screens/EditorScreen";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import AddImage from "./screens/AddImage";
import AddAuthor from "./screens/AddAuthor";
import AddMedia from "./screens/AddMedia";
import AddQuote from "./screens/AddQuote";

const useStyles = makeStyles({
  main: {
    display: "flex",
    height: ({ isOnLoginOrSignUp }) =>
      isOnLoginOrSignUp ? "100vh" : "calc(100vh - 100px)",
  },
  header: {
    width: "100vw",
    height: 100,
    borderBottom: "1px solid grey",
  },
});

function Router() {
  const history = useHistory();
  const location = useLocation();

  const isOnLoginOrSignUp =
    /login/.test(location.pathname) || /signup/.test(location.pathname);

  const classes = useStyles(isOnLoginOrSignUp);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!isOnLoginOrSignUp) {
      fetch(`${constants.baseUrl}/users`, {
        headers: token ? { "x-access-token": token } : {},
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.logged) {
            history.push("/login");
          }
        })
        .catch((e) => {
          if (!isOnLoginOrSignUp && history) {
            history.push("/login");
          }
        });
    } else if (token) {
      fetch(`${constants.baseUrl}/users`, {
        headers: { "x-access-token": token },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.logged) {
            history.push("/");
          }
        })
        .catch((e) => {
          if (!isOnLoginOrSignUp && history) {
            history.push("/login");
          }
        });
    }
  }, [history, isOnLoginOrSignUp]);

  return (
    <>
      {!isOnLoginOrSignUp && <div className={classes.header} />}
      <div className={classes.main}>
        {!isOnLoginOrSignUp && <LateralMenu />}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/image/add">
            <AddImage />
          </Route>
          <Route path="/author/add">
            <AddAuthor />
          </Route>
          <Route path="/media/add">
            <AddMedia />
          </Route>
          <Route path="/quote/add">
            <AddQuote />
          </Route>
          <Route path="/">
            <EditorScreen />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Router;
