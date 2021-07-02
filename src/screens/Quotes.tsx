import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SearchAuthor from "../components/SearchAuthor";
import SearchMedia from "../components/SearchMedia";
import QuoteCard from "../components/QuoteCard";
import customFetch from "../utils/customFetch";
import { useQuotesQuery } from "../requests/queries/useQuotesQuery";
import Loader from "../components/Loader";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "grid",
    gridGap: theme.spacing(5),
    gridTemplateColumns: "2fr 2fr 1fr",
    margin: theme.spacing(2, 2, 1, 2),
    alignItems: "center",
  },
  wrapper: {
    backgroundColor: theme.palette.backgroundColor.main,
    width: "calc(100% - 4vw)",
    display: "flex",
    flexDirection: "column",
  },
  quotesWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  button: {
    margin: 16,
  },
}));

const Quotes = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    isLoading,
    props: { quotes, authorId },
    handlers: { onAuthorChange, onMediaChange },
  } = useQuotesQuery();
  const [authorList, setAuthorList] = useState([]);
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const mediaUrl = authorId ? `media?authorId=${authorId}` : "media";

      const autocompleteAuthorData = await customFetch("author");
      const autocompleteMediaData = await customFetch(mediaUrl);
      setAuthorList(autocompleteAuthorData);
      setMediaList(autocompleteMediaData);
    }
    fetchData();
  }, [authorId]);

  return (
    <div className={classes.wrapper}>
      <Card raised className={classes.header}>
        <SearchAuthor authorList={authorList} setAuthorId={onAuthorChange} />
        <SearchMedia mediaList={mediaList} setMediaId={onMediaChange} />
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={() => history.push("/quote/add")}
        >
          Add new quote
        </Button>
      </Card>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.quotesWrapper}>
          {quotes && quotes.length > 0 ? (
            quotes.map((quote) => <QuoteCard quote={quote} key={quote._id} />)
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
};

export default Quotes;
