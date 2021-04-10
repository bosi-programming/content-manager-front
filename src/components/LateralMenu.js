import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  menu: {
    height: "100vh",
    width: "10vw",
    padding: 32,
    borderRight: "1px solid grey",
  },
  link: {
    textDecoration: "none",
  },
  linkText: {
    color: "black",
    "&:hover": {
      transform: "scale(1.2)",
      transformOrigin: "0 50%",
    },
  },
});
const LateralMenu = () => {
  const classes = useStyles();

  return (
    <div className={classes.menu}>
      <Link className={classes.link} to="/image">
        <Typography className={classes.linkText} variant="h4" gutterBottom>
          Image
        </Typography>
      </Link>
    </div>
  );
};

export default LateralMenu;
