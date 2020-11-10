import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { gql, useMutation } from "@apollo/client";

import UpdateSkillForm from "./UpdateSkillForm";

const DELETE_SKILL = /* GraphQL */ `
  mutation DeleteSkill(
    $input: DeleteSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    deleteSkill(input: $input, condition: $condition) {
      id
    }
  }
`;

const DELETE_CONNECTION = /* GraphQL */ `
  mutation DeleteEmployeeSkillConnection(
    $input: DeleteEmployeeSkillConnectionInput!
    $condition: ModelEmployeeSkillConnectionConditionInput
  ) {
    deleteEmployeeSkillConnection(input: $input, condition: $condition) {
      id
      employeeID
      skillID
    }
  }
`;

const SkillDataGrid = (props) => {
  const [deleteSkill] = useMutation(gql(DELETE_SKILL));
  const [deleteConnection] = useMutation(gql(DELETE_CONNECTION));
  const [selection, setSelection] = useState([]);
  const [data, setData] = useState(null);
  const [updateSkillAlertOpen, setUpdateSkillAlertOpen] = useState(false);
  const [deleteSkillAlertOpen, setDeleteSkillAlertOpen] = useState(false);

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "employees",
      headerName: "Employees",
      sortable: false,
      width: 300,
      renderCell: (params) =>
        params.value.items.map((item) => (
          <Tooltip
            title={`${item.employee.firstname} ${item.employee.lastname}`}
            placement="top"
            arrow
            interactive
            key={item.employee.id}
          >
            <Avatar style={{ marginLeft: 5 }}>
              {item.employee.firstname.charAt(0) +
                item.employee.lastname.charAt(0)}
            </Avatar>
          </Tooltip>
        )),
    },
    {
      field: "buttons",
      headerName: "Update or Delete",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <React.Fragment>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ marginLeft: 10 }}
            onClick={() => setData(params.data)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            style={{ marginLeft: 10 }}
            onClick={() => {
              Promise.all(
                params.data.employees.items.map((connection) =>
                  deleteConnection({
                    variables: { input: { id: connection.id } },
                  })
                )
              ).then(() =>
                deleteSkill({
                  variables: { input: { id: params.data.id } },
                }).then(() => {
                  props.refetch();
                  setDeleteSkillAlertOpen(true);
                  props.onIncrement();
                })
              );
            }}
          >
            Delete
          </Button>
        </React.Fragment>
      ),
      disableClickEventBubbling: true,
    },
  ];

  return (
    <React.Fragment>
      <DataGrid
        rows={props.data.listSkills.items}
        columns={columns}
        checkboxSelection
        selection={selection}
        onSelectionChange={(selection) => {
          setSelection(selection.rows);
        }}
      />
      {data && (
        <UpdateSkillForm
          data={data}
          onClose={() => setData(null)}
          refetch={props.refetch}
          onSuccess={() => {
            setUpdateSkillAlertOpen(true);
            props.onIncrement();
          }}
        />
      )}
      <Snackbar
        open={updateSkillAlertOpen}
        autoHideDuration={5000}
        onClose={() => setUpdateSkillAlertOpen(false)}
      >
        <Alert
          onClose={() => setUpdateSkillAlertOpen(false)}
          severity="success"
        >
          Skill Updated!
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteSkillAlertOpen}
        autoHideDuration={5000}
        onClose={() => setDeleteSkillAlertOpen(false)}
      >
        <Alert
          onClose={() => setDeleteSkillAlertOpen(false)}
          severity="success"
        >
          Skill Deleted!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default SkillDataGrid;
