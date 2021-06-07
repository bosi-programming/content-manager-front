import React, { useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import constants from "./constants";

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

type IStyle = {
  isOnLoginOrSignUp: boolean;
};

const useStyles = makeStyles({
  main: {
    display: "flex",
    height: (props: IStyle) =>
      props.isOnLoginOrSignUp ? "100vh" : "calc(100vh - 100px)",
  },
  header: {
    width: "100vw",
    height: 100,
    borderBottom: "1px solid grey",
  },
  linkText: {
    color: "black",
    cursor: "pointer",
    marginBottom: 16,
    paddingTop: 32,
    paddingLeft: 32,
    "&:hover": {
      transform: "scale(1.2)",
      transformOrigin: "0 50%",
    },
  },
});

function Router() {
  const history = useHistory();
  const location = useLocation();

  const isOnLoginOrSignUp =
    /login/.test(location.pathname) || /signup/.test(location.pathname);

  const classes = useStyles({ isOnLoginOrSignUp });

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
    <>
      {!isOnLoginOrSignUp && (
        <div className={classes.header}>
          <Typography
            className={classes.linkText}
            variant="h4"
            gutterBottom
            onClick={() => history.push("/")}
          >
            Home
          </Typography>
        </div>
      )}
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
      </div>
    </>
  );
}

export default Router;
