import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PostCard from "../components/PostCard";
import customFetch from "../utils/customFetch";
import deleteResource from "../utils/deleteResource";

const useStyles = makeStyles({
  wrapper: {
    width: "calc(100% - 10vw)",
  },
  postsWrapper: {
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

const Posts = () => {
  const classes = useStyles();
  const history = useHistory();
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchData() {
      const postsData = await customFetch("post");
      setPosts(postsData);
    }
    fetchData();
  }, []);

  const handleDelete = (id) => {
    deleteResource("post", id);
    const newPosts = posts.filter((post) => post._id !== id);
    setPosts(newPosts);
  };

  return (
    <div className={classes.wrapper}>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => history.push("/add")}
      >
        Add new post
      </Button>
      <div className={classes.postsWrapper}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <PostCard post={post} handleDelete={handleDelete} key={post._id} />
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Posts;
