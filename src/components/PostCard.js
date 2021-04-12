import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, IconButton } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { makeStyles } from "@material-ui/core/styles";

import ResourceCard from "./ResourceCard";
import constants from "../constants";

const useStyles = makeStyles({
  title: {
    cursor: "pointer",
  },
});

const PostCard = ({ post, handleDelete }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <ResourceCard handleDelete={handleDelete} id={post._id}>
      <Typography
        className={classes.title}
        onClick={() => history.push(`/${post._id}`)}
        variant="h4"
      >
        {post.title}
      </Typography>
      <a download href={`${constants.baseUrl}/post/download/${post._id}`}>
        <IconButton>
          <GetAppIcon />
        </IconButton>
      </a>
    </ResourceCard>
  );
};

export default PostCard;
