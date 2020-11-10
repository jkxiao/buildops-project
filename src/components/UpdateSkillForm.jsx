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

export const UPDATE_SKILL = /* GraphQL */ `
  mutation UpdateSkill(
    $input: UpdateSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    updateSkill(input: $input, condition: $condition) {
      id
    }
  }
`;

const UpdateSkillForm = (props) => {
  let skill = props.data;
  const [name, setName] = useState(skill.name);
  const [alertOpen, setAlertOpen] = useState(false);
  const [updateSkill] = useMutation(gql(UPDATE_SKILL));

  return (
    <Dialog
      open={true}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Update Skill</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To update a skill record, please modify the name.
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
            updateSkill({
              variables: { input: { id: skill.id, name } },
            }).then(() => {
              props.refetch();
              props.onClose();
              props.onSuccess();
            });
          }}
          color="primary"
        >
          Update
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

export default UpdateSkillForm;
