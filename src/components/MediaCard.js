import React from "react";
import { startCase, lowerCase } from "lodash";
import { Typography } from "@material-ui/core";

import ResourceCard from "./ResourceCard";

const MediaCard = ({ media, handleDelete }) => {
  return (
    <ResourceCard handleDelete={handleDelete} id={media.id}>
      <Typography variant="h4">{media.mediaName}</Typography>
      {media.publisher && (
        <Typography>
          <strong>Publisher:</strong> {media.publisher}
        </Typography>
      )}
      <Typography>
        <strong>Date of publication:</strong> {media.dateOfPublication}
      </Typography>
      <Typography>
        <strong>Type of media:</strong>{" "}
        {startCase(lowerCase(media.typeOfMedia))}
      </Typography>
      {media.link && (
        <Typography>
          <strong>Link:</strong> {media.link}
        </Typography>
      )}
    </ResourceCard>
  );
};

export default MediaCard;
