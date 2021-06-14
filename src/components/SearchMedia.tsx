import React from "react";
import { get } from "lodash";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";

enum EnumMedia {
  BOOK = "BOOK",
  ARTICLE = "ARTICLE",
  BLOGPOST = "BLOGPOST",
  MOVIE = "MOVIE",
  WEBVIDEO = "WEBVIDEO",
}

interface IMedia {
  _id: string;
  mediaName: string;
  authorId: string;
  publisher?: string;
  dateOfPublication: Date;
  typeOfMedia: EnumMedia;
  link?: string;
}

interface SearchMediaProps {
  mediaList: IMedia[];
  setMediaId: (id: string) => void;
}

const useStyles = makeStyles({
  search: {
    padding: 16,
  },
});

const SearchMedia: React.FC<SearchMediaProps> = ({ mediaList, setMediaId }) => {
  const classes = useStyles();
  return (
    <>
      {mediaList && mediaList.length > 0 ? (
        <Autocomplete
          classes={{ root: classes.search }}
          freeSolo
          id="media"
          options={mediaList}
          getOptionLabel={(option) => option.mediaName}
          onChange={(_, value) => setMediaId(get(value, "_id", null))}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: true,
              }}
              label="Media name"
              required
            />
          )}
        />
      ) : (
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Media name"
          placeholder="This author has no media yet. Add a new media"
          disabled
        />
      )}
    </>
  );
};

export default SearchMedia;
