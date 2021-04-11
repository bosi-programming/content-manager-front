import React from "react";
import { Typography } from "@material-ui/core";

import ResourceCard from "./ResourceCard";

const AuthorCard = ({ author, handleDelete }) => {
  return (
    <ResourceCard handleDelete={handleDelete} id={author._id}>
      <Typography variant="h4">{`${author.firstName} ${author.lastName}`}</Typography>
      <Typography>{author.abreviation}</Typography>
    </ResourceCard>
  );
};

export default AuthorCard;
