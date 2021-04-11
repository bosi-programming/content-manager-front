import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import customFetch from "../utils/customFetch";

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

const AddAuthor = () => {
  const history = useHistory();
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [abreviation, setAbreviation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "author";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      firstName,
      lastName,
      abreviation,
    };

    const postRes = await customFetch(url, options, body);

    history.push("/author");
  };

  return (
    <div className={classes.content}>
      <form className={classes.formInnerContainer} onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          name="firstName"
          required
        />
        <TextField
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name"
          name="lastName"
          required
        />
        <TextField
          onChange={(e) => setAbreviation(e.target.value)}
          label="Abreviation"
          name="abreviation"
        />
        <Button
          className={classes.button}
          color="primary"
          type="submit"
          variant="contained"
        >
          Add New Author
        </Button>
      </form>
    </div>
  );
};

export default AddAuthor;
