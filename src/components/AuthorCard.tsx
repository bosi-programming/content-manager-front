import React from "react";
import { Typography } from "@material-ui/core";
import ResourceCard from "./ResourceCard";
import {IAuthor} from "../model";

interface QuoteCardProps {
  author: IAuthor,
  handleDelete: (id: string) => void,
}

const AuthorCard: React.FC<QuoteCardProps> = ({ author, handleDelete }) => {
  return (
    <ResourceCard handleDelete={handleDelete} id={author._id}>
      <Typography variant="h4">{`${author.firstName} ${author.lastName}`}</Typography>
      <Typography>{author.abreviation}</Typography>
    </ResourceCard>
  );
};

export default AuthorCard;
