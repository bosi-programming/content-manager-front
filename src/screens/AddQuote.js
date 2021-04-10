import React, { useState, useEffect } from "react";
import "date-fns";
import { Button, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
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

const AddQuote = () => {
  const classes = useStyles();
  const [authorList, setAuthorList] = useState();
  const [mediaList, setMediaList] = useState();
  const [authorId, setAuthorId] = useState("");
  const [mediaId, setMediaId] = useState("");
  const [where, setWhere] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchData() {
      const autocompleteData = await customFetch("author");
      const autocompleteMediaData = await customFetch(
        `media?authorId=${authorId}`
      );
      setAuthorList(autocompleteData);
      setMediaList(autocompleteMediaData);
    }
    fetchData();
  }, [authorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "quote";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      authorId,
      mediaId,
      where,
      content,
    };

    const postRes = await customFetch(url, options, body);
  };

  return (
    <div className={classes.content}>
      <form className={classes.formInnerContainer} onSubmit={handleSubmit}>
        <Autocomplete
          freeSolo
          id="author"
          options={authorList}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          onChange={(_, value) => setAuthorId(value._id)}
          renderInput={(params) => (
            <TextField {...params} label="Author" required />
          )}
        />
        <Autocomplete
          freeSolo
          id="media"
          options={mediaList}
          getOptionLabel={(option) => option.mediaName}
          onChange={(_, value) => setMediaId(value._id)}
          renderInput={(params) => (
            <TextField {...params} label="Media name" required />
          )}
        />
        <TextField
          onChange={(e) => setWhere(e.target.value)}
          label="Where"
          name="where"
        />
        <TextField
          onChange={(e) => setContent(e.target.value)}
          label="Content"
          name="content"
        />
        <Button
          className={classes.button}
          color="primary"
          type="submit"
          variant="contained"
        >
          Add New Quote
        </Button>
      </form>
    </div>
  );
};

export default AddQuote;
