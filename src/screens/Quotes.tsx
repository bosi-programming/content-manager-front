import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SearchAuthor from "../components/SearchAuthor";
import SearchMedia from "../components/SearchMedia";
import QuoteCard, { IQuote } from "../components/QuoteCard";
import customFetch from "../utils/customFetch";
import deleteResource from "../utils/deleteResource";

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
    height: "100%",
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
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [authorList, setAuthorList] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [mediaList, setMediaList] = useState([]);
  const [mediaId, setMediaId] = useState("");

  useEffect(() => {
    async function fetchData() {
      const quotesUrl =
        authorId || mediaId
          ? `quote?${authorId ? `authorId=${authorId}&` : ""}${
              mediaId ? `mediaId=${mediaId}` : ""
            }`
          : "quote";
      const mediaUrl = authorId ? `media?authorId=${authorId}` : "media";

      const quotesData = await customFetch(quotesUrl);
      const autocompleteAuthorData = await customFetch("author");
      const autocompleteMediaData = await customFetch(mediaUrl);
      setAuthorList(autocompleteAuthorData);
      setMediaList(autocompleteMediaData);
      setQuotes(quotesData);
    }
    fetchData();
  }, [authorId, mediaId]);

  const handleDelete = (id: string) => {
    deleteResource("quote", id);
    const newQuotes = quotes.filter((quote) => quote._id !== id);
    setQuotes(newQuotes);
  };

  const handleSelect = (id: string) => {
    console.error("Implement id routes ", id);
  };

  return (
    <div className={classes.wrapper}>
      <Card raised className={classes.header}>
        <SearchAuthor authorList={authorList} setAuthorId={setAuthorId} />
        <SearchMedia mediaList={mediaList} setMediaId={setMediaId} />
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={() => history.push("/quote/add")}
        >
          Add new quote
        </Button>
      </Card>
      <div className={classes.quotesWrapper}>
        {quotes && quotes.length > 0 ? (
          quotes.map((quote) => (
            <QuoteCard
              quote={quote}
              handleSelect={handleSelect}
              handleDelete={handleDelete}
              key={quote._id}
            />
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Quotes;
