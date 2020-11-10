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
import { withStyles } from "@material-ui/core/styles";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { gql, useLazyQuery, useMutation } from "@apollo/client";

import { debounce } from "lodash";

const styles = {
  dialogPaper: {
    minHeight: "400px",
    maxHeight: "400px",
  },
};

const listSkills = /* GraphQL */ `
  query ListSkills(
    $filter: ModelSkillFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSkills(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
    }
  }
`;

const CREATE_EMPLOYEE = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
    }
  }
`;

const CREATE_CONNECTION = /* GraphQL */ `
  mutation CreateEmployeeSkillConnection(
    $input: CreateEmployeeSkillConnectionInput!
    $condition: ModelEmployeeSkillConnectionConditionInput
  ) {
    createEmployeeSkillConnection(input: $input, condition: $condition) {
      id
      employeeID
      skillID
    }
  }
`;

const CreateEmployeeForm = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [skills, setSkills] = useState([]);
  const [getSkills, { data: skillsData }] = useLazyQuery(gql(listSkills));
  const [alertOpen, setAlertOpen] = useState(false);
  const [createEmployee] = useMutation(gql(CREATE_EMPLOYEE));
  const [createConnection] = useMutation(gql(CREATE_CONNECTION));

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: props.classes.dialogPaper }}
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Create Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new employee record, please enter your first name, last
            name and skills.
          </DialogContentText>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                id="firstname"
                label="First Name"
                type="text"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
                margin="dense"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lastname"
                label="Last Name"
                type="text"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
                margin="dense"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                name="skills-select"
                placeholder="Search a skill"
                value={skills}
                onChange={(selectedSkills) => setSkills(selectedSkills)}
                options={
                  skillsData
                    ? skillsData.listSkills.items.map((skill) => ({
                        value: skill.id,
                        label: skill.name,
                      }))
                    : []
                }
                onInputChange={debounce((inputValue) => {
                  if (inputValue !== "") {
                    getSkills({
                      variables: {
                        filter: { name: { beginsWith: inputValue } },
                      },
                    });
                  }
                }, 500)}
                isMulti
                components={makeAnimated()}
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
              if (firstname === "" || lastname === "") {
                setAlertOpen(true);
                return;
              }
              createEmployee({
                variables: { input: { firstname, lastname } },
              }).then((res) => {
                let { id } = res.data.createEmployee;
                Promise.all(
                  (skills ? skills : []).map((skill) =>
                    createConnection({
                      variables: {
                        input: { employeeID: id, skillID: skill.value },
                      },
                    })
                  )
                ).then(() => {
                  props.refetch();
                  setFirstname("");
                  setLastname("");
                  setSkills([]);
                  props.onClose();
                  props.onSuccess();
                });
              });
            }}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
        <Collapse in={alertOpen}>
          <Alert onClose={() => setAlertOpen(false)} severity="error">
            Both first name and last name are required!
          </Alert>
        </Collapse>
      </Dialog>
    </React.Fragment>
  );
};

export default withStyles(styles)(CreateEmployeeForm);
