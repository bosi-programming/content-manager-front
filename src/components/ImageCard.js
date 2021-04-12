import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ResourceCard from "./ResourceCard";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    maxWidth: 300,
    maxHeight: 300,
  },
  title: {
    marginTop: 16,
  },
});

const ImageCard = ({ image, handleDelete, handleSelect }) => {
  const classes = useStyles();

  const imageNameBeggining = image.imageName.split(".")[0];
  const imageNameEnd = image.imageName.split(".")[1];
  const imageType = imageNameEnd === "jpg" ? "jpg" : "png";
  return (
    <ResourceCard handleDelete={handleDelete} id={image._id}>
      <img
        className={classes.image}
        src={`data:image/${imageType};base64, ${image.image}`}
        alt={image.imageName}
        onClick={() => handleSelect(image._id)}
      />
      <Typography className={classes.title} variant="h4">
        {imageNameBeggining}
      </Typography>
    </ResourceCard>
  );
};

export default ImageCard;
