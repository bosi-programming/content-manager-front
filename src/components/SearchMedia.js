import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SearchMedia = ({ mediaList, setMediaId }) => {
  return (
    <>
      {mediaList && mediaList.length > 0 ? (
        <Autocomplete
          freeSolo
          id="media"
          options={mediaList}
          getOptionLabel={(option) => option.mediaName}
          onChange={(_, value) => setMediaId(value._id)}
          renderInput={(params) => (
            <TextField {...params} label="Media name" required />
          )}
        />
      ) : (
        <TextField label="This author has no media yet. Add a new media" disabled />
      )}
    </>
  );
};

export default SearchMedia;
