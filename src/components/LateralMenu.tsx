import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import {
  PersonTwoTone,
  LibraryBooksTwoTone,
  FormatQuoteTwoTone,
  ImageTwoTone,
} from "@material-ui/icons";

const useStyles = makeStyles({
  menu: {
    width: "5vw",
    padding: "32px 24px",
    borderRight: "1px solid grey",
    boxShadow: "3px 0px 10px grey",
    zIndex: 999,
  },
  linkText: {
    display: "flex",
    alignItems: "center",
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
  icon: {
    marginRight: 8,
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
        <PersonTwoTone className={classes.icon} /> Author
      </Typography>
      <Typography
        className={classes.linkText}
        variant="h6"
        gutterBottom
        onClick={() => history.push("/media")}
      >
        <LibraryBooksTwoTone className={classes.icon} /> Media
      </Typography>
      <Typography
        className={classes.linkText}
        variant="h6"
        gutterBottom
        onClick={() => history.push("/quote")}
      >
        <FormatQuoteTwoTone className={classes.icon} /> Quote
      </Typography>
      <Typography
        className={classes.linkText}
        variant="h6"
        gutterBottom
        onClick={() => history.push("/image")}
      >
        <ImageTwoTone className={classes.icon} /> Image
      </Typography>
    </div>
  );
};

export default LateralMenu;
