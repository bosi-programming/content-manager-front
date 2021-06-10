import React, { useState } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import constants from "../constants";

const useStyles = makeStyles({
  content: {
    alignItems: "center",
    backgroundColor: "white",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    overflowY: "auto",
  },
  formInnerContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 24,
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    maxWidth: 500,
  },
  welcomeContainer: {
    display: "flex",
  },
  welcomeText: {
    color: "black",
    fontSize: 32,
    fontWeight: 500,
  },
  button: {
    width: "100%",
    margin: "16px 0px",
  },
  signup: {
    width: "100%",
    margin: "0px",
  },
});

const Login = () => {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = {
      userName,
      authorName,
      role: 'MAIN',
      mainAccount: userName,
      password,
    };
    fetch(`${constants.baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={classes.content}>
      <form className={classes.formInnerContainer} onSubmit={handleSubmit}>
        <div className={classes.welcomeContainer}>
          <Typography className={classes.welcomeText} component="span">
            Welcome!
          </Typography>
        </div>
        <TextField
          onChange={(e) => setUserName(e.target.value)}
          label="Usuário"
          name="userName"
        />
        <TextField
          onChange={(e) => setAuthorName(e.target.value)}
          label="Nome ou pseudonimo"
          name="authorName"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          name="password"
          type="password"
        />
        <Button
          className={classes.button}
          color="primary"
          type="submit"
          variant="contained"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Login;

