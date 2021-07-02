import React from "react";
import { Typography } from "@material-ui/core";

import ResourceCard from "./ResourceCard";
import { useQuotesMutation } from "../requests/mutations/useQuotesMutation";

export interface IQuote {
  _id: string;
  authorId: string;
  mediaId: string;
  where: string;
  content: string;
}

interface QuoteCardProps {
  quote: IQuote;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  const { deleteQuoteMutation } = useQuotesMutation();

  const handleSelect = (id: string) => {
    console.error("Implement id routes ", id);
  };

  return (
    <ResourceCard handleDelete={deleteQuoteMutation.mutate} id={quote._id}>
      <Typography variant="h4" onClick={() => handleSelect(quote._id)}>
        {quote.content}
      </Typography>
      <Typography>{quote.where}</Typography>
    </ResourceCard>
  );
};

export default QuoteCard;
