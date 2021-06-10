import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import SearchAuthor from "../components/SearchAuthor";
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
  const history = useHistory();
  const classes = useStyles();
  const [authorList, setAuthorList] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [dateOfPublication, setDateOfPublication] = useState<
    string | null | undefined
  >(new Date().toString());
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

  const handleDateChange = (_: any, value?: string | null) => {
    setDateOfPublication(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    console.log(postRes);
    history.push("/media");
  };

  return (
    <div className={classes.content}>
      <form className={classes.formInnerContainer} onSubmit={handleSubmit}>
        <SearchAuthor authorList={authorList} setAuthorId={setAuthorId} />
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
            onChange={handleDateChange}
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
        <FormControl>
          <InputLabel id="demo-simple-select-label">Type of media</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeOfMedia}
            onChange={(e: React.ChangeEvent<{ value: unknown}>) => setTypeOfMedia(e.target.value as string)}
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
