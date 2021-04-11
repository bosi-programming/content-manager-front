import React from "react";
import { Typography } from "@material-ui/core";

import ResourceCard from "./ResourceCard";

const QuoteCard = ({ quote, handleDelete }) => {
  return (
    <ResourceCard handleDelete={handleDelete} id={quote._id}>
      <Typography variant="h4">{quote.content}</Typography>
      <Typography>{quote.where}</Typography>
    </ResourceCard>
  );
};

export default QuoteCard;
