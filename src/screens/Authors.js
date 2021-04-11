import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AuthorCard from "../components/AuthorCard";
import customFetch from "../utils/customFetch";
import deleteResource from "../utils/deleteResource";

const useStyles = makeStyles({
  wrapper: {
    width: "calc(100% - 10vw)",
  },
  authorsWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  button: {
    float: "right",
    marginTop: 16,
    marginRight: 16,
  },
});

const Authors = () => {
  const classes = useStyles();
  const history = useHistory();
  const [authors, setAuthors] = useState();

  useEffect(() => {
    async function fetchData() {
      const authorsData = await customFetch("author");
      setAuthors(authorsData);
    }
    fetchData();
  }, []);

  const handleDelete = (id) => {
    deleteResource("author", id);
    const newAuthors = authors.filter((author) => author._id !== id);
    setAuthors(newAuthors);
  };

  return (
    <div className={classes.wrapper}>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => history.push("/author/add")}
      >
        Add new author
      </Button>
      <div className={classes.authorsWrapper}>
        {authors &&
          authors.map((author) => (
            <AuthorCard
              author={author}
              handleDelete={handleDelete}
              key={author._id}
            />
          ))}
      </div>
    </div>
  );
};

export default Authors;
