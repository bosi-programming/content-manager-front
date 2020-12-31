import React, { useState } from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import PostEditor from "../components/PostEditor";
import FormField from "../components/FormField";

const useStyles = makeStyles({
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
  const classes = useStyles();
  const mobile = useMediaQuery("(max-width: 768px)");
  const tablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const smallDesktop = useMediaQuery("(min-width: 1025px) and (max-width: 1200px)");
  const desktop = useMediaQuery("(min-width: 1201px)");

  const [authorState, setAuthorState] = useState("");
  const [titleState, setTitleState] = useState("");
  const [postState, setPostState] = useState("");

  return (
    <form
      className={classnames({
        [classes.editorMob]: mobile,
        [classes.editorTablet]: tablet,
        [classes.editorSmallDesktop]: smallDesktop,
        [classes.editorBigDesktop]: desktop,
      })}
    >
      <h1 className={classes.title}>Write your article</h1>
      <div className={classes.flexDiv}>
        <FormField
          state={authorState}
          setState={setAuthorState}
          label="Author"
        />
        <FormField state={titleState} setState={setTitleState} label="Title" />
      </div>
      <div className={classes.content}>
        <PostEditor postState={postState} setPostState={setPostState} />
      </div>
    </form>
  );
};

export default EditorScreen;
