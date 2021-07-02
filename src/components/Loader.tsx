import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { CirclesLoader, GearsLoader, ClockLoader } from "../assets/svg";

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

const chooseLoader = () => {
  const loaders = [CirclesLoader, GearsLoader, ClockLoader];
  const random = Math.floor(Math.random() * loaders.length);
  return loaders[random]
}

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <img
        className={classes.image}
        src={chooseLoader()}
        alt="loading"
        height="300"
      />
    </div>
  );
};

export default Loader;
