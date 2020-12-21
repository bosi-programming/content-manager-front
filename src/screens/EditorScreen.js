import React, { useState } from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import PostEditor from "../components/PostEditor";

const useStyles = makeStyles({
  editorMob: {
    margin: "0 20px",
    width: "100%",
  },
  editorTablet: {
    margin: "0 auto",
    maxWidth: 900,
  },
  editorDesktop: {
    margin: "0 auto",
    maxWidth: 1200,
  },
});
const EditorScreen = () => {
  const classes = useStyles();
  const [postState, setPostState] = useState("");
  const mobile = useMediaQuery("(max-width: 768px)");
  const tablet = useMediaQuery("(min-width: 769px) and (max-width: 1200px)");
  const desktop = useMediaQuery("(min-width: 1201px)");

  return (
    <div
      className={classnames({
        [classes.editorMob]: mobile,
        [classes.editorTablet]: tablet,
        [classes.editorDesktop]: desktop,
      })}
    >
      <PostEditor postState={postState} setPostState={setPostState} />
    </div>
  );
};

export default EditorScreen;
