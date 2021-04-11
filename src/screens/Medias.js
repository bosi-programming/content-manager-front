import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MediaCard from "../components/MediaCard";
import customFetch from "../utils/customFetch";
import deleteResource from "../utils/deleteResource";

const useStyles = makeStyles({
  wrapper: {
    width: "calc(100% - 20vw)",
  },
  mediasWrapper: {
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

const Medias = () => {
  const classes = useStyles();
  const history = useHistory();
  const [medias, setMedias] = useState();

  useEffect(() => {
    async function fetchData() {
      const mediasData = await customFetch("media");
      setMedias(mediasData);
    }
    fetchData();
  }, []);

  const handleDelete = (id) => {
    deleteResource("media", id);
    const newMedias = medias.filter((media) => media._id !== id);
    setMedias(newMedias);
  };

  return (
    <div className={classes.wrapper}>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => history.push("/media/add")}
      >
        Add new media
      </Button>
      <div className={classes.mediasWrapper}>
        {medias &&
          medias.map((media) => (
            <MediaCard
              media={media}
              handleDelete={handleDelete}
              key={media._id}
            />
          ))}
      </div>
    </div>
  );
};

export default Medias;

