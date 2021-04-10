import React, { useState, useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import customFetch from "../utils/customFetch";

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

const AddMedia = () => {
  const classes = useStyles();
  const [authorList, setAuthorList] = useState();
  const [authorId, setAuthorId] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [dateOfPublication, setDateOfPublication] = useState(new Date());
  const [typeOfMedia, setTypeOfMedia] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    async function fetchData() {
      const url = `author`;
      const autocompleteData = await customFetch(url);
      setAuthorList(autocompleteData);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "media";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      authorId,
      mediaName,
      publisher,
      dateOfPublication,
      typeOfMedia,
      link,
    };

    const postRes = await customFetch(url, options, body);
  };

  return (
    <div className={classes.content}>
      <form className={classes.formInnerContainer} onSubmit={handleSubmit}>
        <Autocomplete
          freeSolo
          id="author"
          options={authorList}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          onChange={(_, value) => setAuthorId(value._id)}
          renderInput={(params) => (
            <TextField {...params} label="Author" required />
          )}
        />
        <TextField
          onChange={(e) => setMediaName(e.target.value)}
          label="Media Name"
          name="publisher"
          required
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            required
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-of-publication"
            label="Date of publication"
            value={dateOfPublication}
            onChange={setDateOfPublication}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          onChange={(e) => setPublisher(e.target.value)}
          label="Publisher"
          name="publisher"
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Type of media</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeOfMedia}
            onChange={(e) => setTypeOfMedia(e.target.value)}
          >
            <MenuItem value="BOOK">Book</MenuItem>
            <MenuItem value="ARTICLE">Article</MenuItem>
            <MenuItem value="BLOGPOST">Blogpot</MenuItem>
            <MenuItem value="MOVIE">Movie</MenuItem>
            <MenuItem value="WEBVIDEO">Webvideo</MenuItem>
          </Select>
        </FormControl>
        <TextField
          onChange={(e) => setLink(e.target.value)}
          label="Link"
          name="link"
          type="url"
        />
        <Button
          className={classes.button}
          color="primary"
          type="submit"
          variant="contained"
        >
          Add New Media
        </Button>
      </form>
    </div>
  );
};

export default AddMedia;
