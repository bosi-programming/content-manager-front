import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SearchAuthor = ({ authorList, setAuthorId }) => {
  return (
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
  );
};

export default SearchAuthor;
