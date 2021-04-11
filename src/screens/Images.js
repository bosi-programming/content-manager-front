import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ImageCard from "../components/ImageCard";
import customFetch from "../utils/customFetch";
import deleteResource from "../utils/deleteResource";

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
  imagesWrapper: {
    display: "grid",
    width: "100%",
    gridGap: 40,
    gridTemplateColumns: '1fr 1fr',
  },
  button: {
    float: "right",
    marginTop: 16,
    marginRight: 16,
  },
});

const Images = () => {
  const classes = useStyles();
  const history = useHistory();
  const [imageName, setImageName] = useState();
  const [images, setImages] = useState();

  useEffect(() => {
    async function fetchData() {
      const imageUrl = imageName ? `image?imageName=${imageName}` : "image";
      const imagesData = await customFetch(imageUrl);
      setImages(imagesData);
    }
    fetchData();
  }, [imageName]);

  const handleDelete = (id) => {
    deleteResource("image", id);
    const newImages = images.filter((image) => image._id !== id);
    setImages(newImages);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <TextField
          onChange={(e) => setImageName(e.target.value)}
          label="Image name"
          name="imageName"
        />
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={() => history.push("/image/add")}
        >
          Add new image
        </Button>
      </div>
      <div className={classes.imagesWrapper}>
        {images && images.length > 0 ? (
          images.map((image) => (
            <ImageCard
              image={image}
              handleDelete={handleDelete}
              key={image._id}
            />
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Images;
