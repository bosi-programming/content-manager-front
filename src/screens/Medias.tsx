import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchAuthor from "../components/SearchAuthor";
import MediaCard from "../components/MediaCard";
import customFetch from "../utils/customFetch";
import deleteResource from "../utils/deleteResource";
import {IMedia} from "../model";

const useStyles = makeStyles({
  header: {
    display: "grid",
    gridGap: 40,
    gridTemplateColumns: "3fr 1fr",
    marginLeft: 16,
  },
  wrapper: {
    width: "calc(100% - 10vw)",
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
  const [authorList, setAuthorList] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [medias, setMedias] = useState<IMedia[]>([]);

  useEffect(() => {
    async function fetchData() {
      const mediaUrl = authorId ? `media?authorId=${authorId}` : "media";
      const mediasData = await customFetch(mediaUrl);
      const autocompleteData = await customFetch("author");
      setAuthorList(autocompleteData);
      setMedias(mediasData);
    }
    fetchData();
  }, [authorId]);

  const handleDelete = (id: string) => {
    deleteResource("media", id);
    const newMedias = medias.filter((media) => media._id !== id);
    setMedias(newMedias);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <SearchAuthor authorList={authorList} setAuthorId={setAuthorId} />
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={() => history.push("/media/add")}
        >
          Add new media
        </Button>
      </div>
      <div className={classes.mediasWrapper}>
        {medias && medias.length > 0 ? (
          medias.map((media) => (
            <MediaCard
              media={media}
              handleDelete={handleDelete}
              key={media._id}
            />
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Medias;
