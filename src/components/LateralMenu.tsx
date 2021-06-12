import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  menu: {
    width: "4vw",
    padding: 32,
    borderRight: "1px solid grey",
    boxShadow: "3px 0px 10px grey",
    zIndex: 999,
  },
  linkText: {
    color: "black",
    cursor: "pointer",
    marginBottom: 32,
    "&:hover": {
      transform: "scale(1.2)",
      transformOrigin: "0 50%",
    },
  },
  emoji: {
    marginBottom: 32,
    textAlign: "center",
  },
});
const LateralMenu = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.menu}>
      <Typography className={classes.emoji} variant="h4" gutterBottom>
        📝
      </Typography>
      <Typography
        className={classes.linkText}
        variant="h6"
        gutterBottom
        onClick={() => history.push("/author")}
      >
        Author
      </Typography>
      <Typography
        className={classes.linkText}
        variant="h6"
        gutterBottom
        onClick={() => history.push("/media")}
      >
        Media
      </Typography>
      <Typography
        className={classes.linkText}
        variant="h6"
        gutterBottom
        onClick={() => history.push("/quote")}
      >
        Quote
      </Typography>
      <Typography
        className={classes.linkText}
        variant="h6"
        gutterBottom
        onClick={() => history.push("/image")}
      >
        Image
      </Typography>
    </div>
  );
};

export default LateralMenu;
