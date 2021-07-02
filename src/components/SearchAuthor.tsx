import React from "react";
import { get } from "lodash";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { IAuthor } from "../model";

interface SearchAuthorProps {
  authorList: IAuthor[];
  setAuthorId: (id: string) => void;
}

const useStyles = makeStyles({
  card: {
    marginTop: 16,
  },
  search: {
    padding: 16,
  },
});

const SearchAuthor: React.FC<SearchAuthorProps> = ({
  authorList,
  setAuthorId,
}) => {
  const classes = useStyles();
  return (
    <Autocomplete
      classes={{ root: classes.search }}
      freeSolo
      id="author"
      options={authorList}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      onChange={(_, value) => setAuthorId(get(value, "_id", null))}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{
            shrink: true,
          }}
          label="Author"
          required
        />
      )}
    />
  );
};

export default SearchAuthor;
