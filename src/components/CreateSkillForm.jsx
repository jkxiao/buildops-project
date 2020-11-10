import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";

import { gql, useMutation } from "@apollo/client";

export const CREATE_SKILL = /* GraphQL */ `
  mutation CreateSkill(
    $input: CreateSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    createSkill(input: $input, condition: $condition) {
      id
    }
  }
`;

const CreateSkillForm = (props) => {
  const [name, setName] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [createSkill] = useMutation(gql(CREATE_SKILL));

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Create Skill</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new skill record, please enter the name.
        </DialogContentText>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="skillname"
              label="Skill Name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setAlertOpen(false);
            props.onClose();
          }}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (name === "") {
              setAlertOpen(true);
              return;
            }
            createSkill({
              variables: { input: { name } },
            }).then(() => {
              props.refetch();
              setName("");
              props.onClose();
              props.onSuccess();
            });
          }}
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
      <Collapse in={alertOpen}>
        <Alert onClose={() => setAlertOpen(false)} severity="error">
          Name is required!
        </Alert>
      </Collapse>
    </Dialog>
  );
};

export default CreateSkillForm;
