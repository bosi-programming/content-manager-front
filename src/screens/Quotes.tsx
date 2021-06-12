import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SearchAuthor from "../components/SearchAuthor";
import SearchMedia from "../components/SearchMedia";
import QuoteCard, { IQuote } from "../components/QuoteCard";
import customFetch from "../utils/customFetch";
import deleteResource from "../utils/deleteResource";
import {grey} from "@material-ui/core/colors";

const useStyles = makeStyles({
  header: {
    display: "grid",
    gridGap: 40,
    gridTemplateColumns: "2fr 2fr 1fr",
    marginLeft: 16,
  },
  wrapper: {
    backgroundColor: grey[200],
    width: "calc(100% - 4vw)",
    height: '100%',
  },
  quotesWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  button: {
    float: "right",
    marginTop: 16,
    marginRight: 16,
  },
});

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
      <div className={classes.header}>
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
      </div>
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
