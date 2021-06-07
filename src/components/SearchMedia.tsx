import React from "react";
import { get } from "lodash";
import { TextField } from "@material-ui/core";
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

const SearchMedia: React.FC<SearchMediaProps> = ({ mediaList, setMediaId }) => {
  return (
    <>
      {mediaList && mediaList.length > 0 ? (
        <Autocomplete
          freeSolo
          id="media"
          options={mediaList}
          getOptionLabel={(option) => option.mediaName}
          onChange={(_, value) => setMediaId(get(value, "_id", null))}
          renderInput={(params) => (
            <TextField {...params} label="Media name" required />
          )}
        />
      ) : (
        <TextField
          label="This author has no media yet. Add a new media"
          disabled
        />
      )}
    </>
  );
};

export default SearchMedia;
