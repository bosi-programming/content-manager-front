import React, { useState } from "react";
import { Typography, Grid, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import constants from "../constants";

const useStyles = makeStyles();

const Login = () => {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      userName,
      password,
    };
    fetch(`${constants.baseUrl}/login`, {
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
      <form onSubmit={handleSubmit}>
        <div className={classes.formInnerContainer}>
          <div className={classes.welcomeContainer}>
            <Typography className={classes.welcomeText} component="span">
              Welcome!
            </Typography>
          </div>
          <Grid container spacing={5}>
            <Grid item xs={8}>
              <TextField
                onChange={(e) => setUserName(e.target.value)}
                label="UserName"
                name="userName"
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                name="password"
                type="password"
              />
            </Grid>
            <Grid item xs={5}>
              <Button
                className={classes.button}
                color="primary"
                type="submit"
                variant="contained"
              >
                Sign in
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};

export default Login;
