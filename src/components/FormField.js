import React from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  formFieldMob: {
    width: "100%",
  },
  formFieldDesktop: {
    width: "calc(50% - 40px)",
  },
  formField: {
    marginBottom: 20,
  },
});

const FormField = ({ state, setState, label }) => {
  const classes = useStyles();
  const mobile = useMediaQuery("(max-width: 768px)");
  return (
    <TextField
      classes={{
        root: classnames(
          mobile ? classes.formFieldMob : classes.formFieldDesktop,
          classes.formField
        ),
      }}
      label={label}
      value={state}
      onChange={(e) => setState(e.target.value)}
    />
  );
};

export default FormField;
