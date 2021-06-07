import React from "react";
import { Card, CardActions, IconButton, CardContent } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    margin: "16px 16px 0",
    display: "flex",
  },
  CardContent: {
    flexGrow: 1,
  },
});

interface ResourceCardProps {
  handleDelete: (id: string) => void;
  id: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  children,
  handleDelete,
  id,
}) => {
  const classes = useStyles();

  return (
    <Card raised className={classes.card}>
      <CardContent className={classes.CardContent}>{children}</CardContent>
      <CardActions>
        <IconButton onClick={() => handleDelete(id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ResourceCard;
