import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { CirclesLoader } from "../assets/svg";

const useStyles = makeStyles((theme) => ({
  image: {
    margin: "0 auto",
    height: 300,
  },
  wrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const Loader:React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <img
        className={classes.image}
        src={CirclesLoader}
        alt="loading"
        height="300"
      />
    </div>
  );
};

export default Loader;
