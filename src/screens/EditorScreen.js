import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import classnames from "classnames";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import PostEditor from "../components/PostEditor";
import customFetch from "../utils/customFetch";

const useStyles = makeStyles({
  title: {
    width: "100%",
    marginBottom: 16,
  },
  editorMob: {
    margin: "0 20px",
    width: "calc(100% - 40px)",
  },
  editorTablet: {
    margin: "0 auto",
    maxWidth: 700,
  },
  editorSmallDesktop: {
    margin: "0 auto",
    maxWidth: 1000,
  },
  editorBigDesktop: {
    margin: "0 auto",
    maxWidth: 1200,
  },
  content: {
    border: "1px solid #ddd",
    padding: 20,
  },
  flexDiv: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
const EditorScreen = () => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const mobile = useMediaQuery("(max-width: 768px)");
  const tablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const smallDesktop = useMediaQuery(
    "(min-width: 1025px) and (max-width: 1200px)"
  );
  const desktop = useMediaQuery("(min-width: 1201px)");

  const [title, setTitle] = useState("");
  const [postState, setPostState] = useState("");

  useEffect(() => {
    if (id) {
      async function fetchData() {
        const url = `post/${id}`;
        const postRes = await customFetch(url);
        setTitle(postRes.title);
        setPostState(postRes.content);
        console.log(postRes);
      }
      fetchData();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      title,
      content: postState,
      date: new Date(),
    };
    if (!id) {
    const url = "post";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const postRes = await customFetch(url, options, body);

      history.push("/");
    } else {
    const url = `post/${id}`;
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const postRes = await customFetch(url, options, body);

      history.push("/");
    }
  };

  return (
    <form
      className={classnames({
        [classes.editorMob]: mobile,
        [classes.editorTablet]: tablet,
        [classes.editorSmallDesktop]: smallDesktop,
        [classes.editorBigDesktop]: desktop,
      })}
      onSubmit={handleSubmit}
    >
      <h1 className={classes.title}>Write your article</h1>
      <div className={classes.flexDiv}>
        <TextField
          className={classes.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
        />
      </div>
      <div className={classes.content}>
        <PostEditor postState={postState} setPostState={setPostState} />
      </div>
      <Button
        className={classes.button}
        color="primary"
        type="submit"
        variant="contained"
      >
        Save
      </Button>
    </form>
  );
};

export default EditorScreen;
