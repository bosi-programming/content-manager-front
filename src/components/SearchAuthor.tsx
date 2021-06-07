import React from "react";
import { get } from "lodash";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface IAuthor {
  _id: string;
  firstName: string;
  lastName: string;
  abreviation: string;
}

interface SearchAuthorProps {
  authorList: IAuthor[];
  setAuthorId: (id: string) => void;
}

const SearchAuthor: React.FC<SearchAuthorProps> = ({ authorList, setAuthorId }) => {
  return (
    <Autocomplete
      freeSolo
      id="author"
      options={authorList}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      onChange={(_, value) => setAuthorId(get(value, '_id', null))}
      renderInput={(params) => (
        <TextField {...params} label="Author" required />
      )}
    />
  );
};

export default SearchAuthor;
