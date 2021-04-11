import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ImageUploader from "react-images-upload";

import constants from "../constants";

const useStyles = makeStyles({
  content: {
    alignItems: "center",
    backgroundColor: "white",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    overflowY: "auto",
  },
  formInnerContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 24,
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    maxWidth: 500,
  },
  welcomeContainer: {
    display: "flex",
  },
  welcomeText: {
    color: "black",
    fontSize: 32,
    fontWeight: 500,
  },
  button: {
    width: "100%",
    margin: "16px 0px",
  },
  signup: {
    width: "100%",
    margin: "0px",
  },
});

const AddImage = () => {
  const history = useHistory();
  const classes = useStyles();
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const body = new FormData();
    body.append("imageName", imageName);
    body.append("image", image);

    fetch(`${constants.baseUrl}/image`, {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        history.push("/image");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={classes.content}>
      <form className={classes.formInnerContainer} onSubmit={handleSubmit}>
        <ImageUploader
          withIcon={true}
          buttonText="Select a image"
          onChange={(pic) => {
            if (pic[0]) {
              setImageName(pic[0].name);
              setImage(pic[0]);
            } else {
              setImageName();
              setImage();
            }
          }}
          singleImage
          label={
            imageName ? `Selected image: ${imageName}` : "Max file size: 5mb"
          }
          withPreview
        />
        <Button
          className={classes.button}
          color="primary"
          type="submit"
          variant="contained"
        >
          Upload the image
        </Button>
      </form>
    </div>
  );
};

export default AddImage;
