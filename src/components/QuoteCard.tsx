import React from "react";
import { Typography } from "@material-ui/core";

import ResourceCard from "./ResourceCard";

interface IQuote {
  _id: string;
  authorId: string;
  mediaId: string;
  where: string;
  content: string;
}


interface QuoteCardProps {
  quote: IQuote,
  handleDelete: (id: string) => void,
  handleSelect:(id: string) => void,
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, handleDelete, handleSelect }) => {
  return (
    <ResourceCard handleDelete={handleDelete} id={quote._id}>
      <Typography variant="h4" onClick={() => handleSelect(quote._id)}>
        {quote.content}
      </Typography>
      <Typography>{quote.where}</Typography>
    </ResourceCard>
  );
};

export default QuoteCard;
