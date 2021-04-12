import React, { useState, useEffect } from "react";
import { upperCase } from "lodash";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { IconButton, Button, TextField } from "@material-ui/core";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import { EditorState, Modifier, SelectionState } from "draft-js";

import EditorDialog from "./EditorDialog";
import QuoteCard from "../components/QuoteCard";
import customFetch from "../utils/customFetch";
import deleteResource from "../utils/deleteResource";

const useStyles = makeStyles({
  quote: {
    cursor: "pointer",
  },
  header: {
    display: "grid",
    gridGap: 40,
    gridTemplateColumns: "3fr 1fr",
    marginLeft: 16,
  },
  wrapper: {
    width: "calc(100% - 10vw)",
  },
  quotesWrapper: {
    display: "grid",
    width: "100%",
    gridGap: 40,
    gridTemplateColumns: "1fr",
  },
  button: {
    float: "right",
    marginTop: 16,
    marginRight: 16,
  },
});

const EditorQuote = ({ editorState, onChange }) => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [quoteName, setQuoteName] = useState();
  const [quotes, setQuotes] = useState();

  useEffect(() => {
    async function fetchData() {
      const quoteUrl = quoteName ? `quote?quoteName=${quoteName}` : "quote";
      const quotesData = await customFetch(quoteUrl);
      setQuotes(quotesData);
    }
    fetchData();
  }, [quoteName]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    deleteResource("quote", id);
    const newQuotes = quotes.filter((quote) => quote._id !== id);
    setQuotes(newQuotes);
  };

  const handleSelect = async (id) => {
    async function fetchData() {
      const quoteUrl = `quote/${id}`;
      const quoteData = await customFetch(quoteUrl);

      const mediaUrl = `media/${quoteData.mediaId}`;
      const media = await customFetch(mediaUrl);

      const authorUrl = `author/${quoteData.authorId}`;
      const author = await customFetch(authorUrl);

      return {
        quote: `${quoteData.content}(${upperCase(author.lastName)},${
          quoteData.where
        })`,
        reference: `\n${upperCase(author.lastName)}, ${author.firstName}. ${
          media.mediaName
        }. ${media.publisher} ${
          media && media.publisher ? ":" : ""
        } ${media.dateOfPublication.substring(0, 4)}`,
      };
    }

    const quote = await fetchData();

    const currentSelection = editorState.getSelection();

    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      currentSelection,
      quote.quote,
      editorState.getCurrentInlineStyle()
    );

    handleBibliography(quote.reference, contentState);

    setOpen(false);
  };

  const handleBibliography = (content, contentState) => {
    const addBibliography = Modifier.replaceText(
      contentState,
      EditorState.moveSelectionToEnd(editorState).getSelection(),
      content,
      editorState.getCurrentInlineStyle()
    );

    onChange(
      EditorState.push(editorState, addBibliography, "insert-characters")
    );
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <FormatQuoteIcon />
      </IconButton>
      <EditorDialog open={open} title="Choose an quote" onClose={handleClose}>
        <div className={classes.header}>
          <TextField
            onChange={(e) => setQuoteName(e.target.value)}
            label="Quote name"
            name="quoteName"
          />
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
              <div className={classes.quote}>
                <QuoteCard
                  quote={quote}
                  handleDelete={handleDelete}
                  key={quote._id}
                  handleSelect={handleSelect}
                />
              </div>
            ))
          ) : (
            <div />
          )}
        </div>
      </EditorDialog>
    </div>
  );
};

export default EditorQuote;
