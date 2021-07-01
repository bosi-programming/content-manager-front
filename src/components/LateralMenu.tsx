import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import {
  PersonTwoTone,
  LibraryBooksTwoTone,
  FormatQuoteTwoTone,
  ImageTwoTone,
  InfoTwoTone,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  menu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: "5vw",
    padding: theme.spacing(4, 3),
    borderRight: "1px solid grey",
    boxShadow: "3px 0px 10px grey",
    zIndex: 999,
  },
  linkText: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.textColor.main,
    cursor: "pointer",
    marginBottom: theme.spacing(4),
    "&:hover": {
      transform: "scale(1.2)",
      transformOrigin: "0 50%",
    },
  },
  externalLink: {
    color: theme.palette.textColor.main,
    textAlign: "center",
    textDecoration: "none",
    "&:hover p": {
      transform: "scale(1.2)",
      transformOrigin: "50% 0",
    },
  },
  emoji: {
    marginBottom: theme.spacing(4),
    textAlign: "center",
    cursor: "default",
  },
  icon: {
    marginRight: theme.spacing(),
  },
}));
const LateralMenu = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <aside className={classes.menu}>
      <div>
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
        <Typography
          className={classes.linkText}
          variant="h6"
          gutterBottom
        >
          <InfoTwoTone className={classes.icon} /> About
        </Typography>
      </div>
      <a
        className={classes.externalLink}
        rel="noreferrer"
        href="https://bosibackend.com/about/"
        target="_blank"
      >
        <Typography>Felipe A. Bosi</Typography>
        <Typography component="p" noWrap variant="subtitle2">
          Backend Eng.
        </Typography>
      </a>
    </aside>
  );
};

export default LateralMenu;
