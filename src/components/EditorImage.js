import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { IconButton, Button, TextField } from "@material-ui/core";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import { AtomicBlockUtils } from "draft-js";

import EditorDialog from "./EditorDialog";
import ImageCard from "../components/ImageCard";
import customFetch from "../utils/customFetch";
import deleteResource from "../utils/deleteResource";

const useStyles = makeStyles({
  image: {
    cursor: "pointer",
  },
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
    gridTemplateColumns: "1fr",
  },
  button: {
    float: "right",
    marginTop: 16,
    marginRight: 16,
  },
});

const EditorImage = ({ editorState, onChange }) => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    deleteResource("image", id);
    const newImages = images.filter((image) => image._id !== id);
    setImages(newImages);
  };

  const handleSelect = async (id) => {
    async function fetchData() {
      const imageUrl = `image/${id}`;
      return await customFetch(imageUrl);
    }
    const image = await fetchData();
    const imageNameEnd = image.imageName.split(".")[1];
    const imageType = imageNameEnd === "jpg" ? "jpg" : "png";

    const entityData = {
      src: `data:image/${imageType};base64, ${image.image}`,
      height: 300,
    };

    const entityKey = editorState
      .getCurrentContent()
      .createEntity("IMAGE", "MUTABLE", entityData)
      .getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      " "
    );
    onChange(newEditorState);
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <ImageSearchIcon />
      </IconButton>
      <EditorDialog open={open} title="Choose an image" onClose={handleClose}>
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
              <div className={classes.image}>
                <ImageCard
                  image={image}
                  handleDelete={handleDelete}
                  key={image._id}
                  handleSelect={handleSelect}
                />
              </div>
            ))
          ) : (
            <div />
          )}
        </div>
      </EditorDialog>
    </div>
  );
};

export default EditorImage;
