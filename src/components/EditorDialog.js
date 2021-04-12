import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

const EditorDialog = ({ children, open, title, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default EditorDialog;
