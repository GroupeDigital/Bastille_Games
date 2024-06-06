import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";

function ResultModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Gratulujeme, úspešne ste splnili úlohu!</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ResultModal;
