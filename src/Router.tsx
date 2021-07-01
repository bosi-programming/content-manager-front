import React, { useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

import constants from "./constants";
import { theme } from "./theme/theme";

import LateralMenu from "./components/LateralMenu";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import AddImage from "./screens/AddImage";
import Authors from "./screens/Authors";
import Medias from "./screens/Medias";
import Quotes from "./screens/Quotes";
import Images from "./screens/Images";
import AddAuthor from "./screens/AddAuthor";
import AddMedia from "./screens/AddMedia";
import AddQuote from "./screens/AddQuote";

const useStyles = makeStyles({
  main: {
    display: "flex",
    height: "100vh",
  },
});

function Router() {
  const history = useHistory();
  const location = useLocation();

  const isOnLoginOrSignUp =
    /login/.test(location.pathname) || /signup/.test(location.pathname);

  const classes = useStyles();

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
        .catch(() => {
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
        .catch(() => {
          if (!isOnLoginOrSignUp && history) {
            history.push("/login");
          }
        });
    }
  }, [history, isOnLoginOrSignUp]);

  return (
    <ThemeProvider theme={theme}>
      <main className={classes.main}>
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
          <Route path="/image">
            <Images />
          </Route>
          <Route path="/author/add">
            <AddAuthor />
          </Route>
          <Route path="/author">
            <Authors />
          </Route>
          <Route path="/media/add">
            <AddMedia />
          </Route>
          <Route path="/media">
            <Medias />
          </Route>
          <Route path="/quote/add">
            <AddQuote />
          </Route>
          <Route path="/">
            <Quotes />
          </Route>
        </Switch>
      </main>
    </ThemeProvider>
  );
}

export default Router;
