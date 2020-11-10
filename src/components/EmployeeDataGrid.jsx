import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { gql, useMutation } from "@apollo/client";

import UpdateEmployeeForm from "./UpdateEmployeeForm";

const DELETE_EMPLOYEE = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
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

const EmployeeDataGrid = (props) => {
  const [deleteEmployee] = useMutation(gql(DELETE_EMPLOYEE));
  const [deleteConnection] = useMutation(gql(DELETE_CONNECTION));
  const [data, setData] = useState(null);
  const [updateEmployeeAlertOpen, setUpdateEmployeeAlertOpen] = useState(false);
  const [deleteEmployeeAlertOpen, setDeleteEmployeeAlertOpen] = useState(false);

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      sortable: false,
      width: 75,
      renderCell: (params) => (
        <Avatar>
          {params.data.firstname.charAt(0) + params.data.lastname.charAt(0)}
        </Avatar>
      ),
    },
    { field: "firstname", headerName: "First Name", width: 125 },
    { field: "lastname", headerName: "Last Name", width: 125 },
    {
      field: "fullname",
      headerName: "Full Name",
      sortable: false,
      width: 150,
      valueGetter: (params) =>
        `${params.data.firstname} ${params.data.lastname}`,
    },
    {
      field: "skills",
      headerName: "Skills",
      sortable: false,
      width: 300,
      renderCell: (params) =>
        params.value.items.map((item) => (
          <Chip
            key={item.skill.id}
            label={item.skill.name}
            variant="outlined"
            size="small"
            style={{ marginLeft: 5 }}
          />
        )),
    },
    {
      field: "createdAt",
      headerName: "Created at",
      width: 200,
      valueGetter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "updatedAt",
      headerName: "Updated at",
      width: 200,
      valueGetter: (params) => new Date(params.value).toLocaleString(),
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
                params.data.skills.items.map((connection) =>
                  deleteConnection({
                    variables: { input: { id: connection.id } },
                  })
                )
              ).then(() =>
                deleteEmployee({
                  variables: { input: { id: params.data.id } },
                }).then(() => {
                  props.refetch();
                  setDeleteEmployeeAlertOpen(true);
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
      <DataGrid rows={props.data.listEmployees.items} columns={columns} />
      {data && (
        <UpdateEmployeeForm
          data={data}
          onClose={() => setData(null)}
          refetch={props.refetch}
          onSuccess={() => {
            setUpdateEmployeeAlertOpen(true);
            props.onIncrement();
          }}
        />
      )}
      <Snackbar
        open={updateEmployeeAlertOpen}
        autoHideDuration={5000}
        onClose={() => setUpdateEmployeeAlertOpen(false)}
      >
        <Alert
          onClose={() => setUpdateEmployeeAlertOpen(false)}
          severity="success"
        >
          Employee Updated!
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteEmployeeAlertOpen}
        autoHideDuration={5000}
        onClose={() => setDeleteEmployeeAlertOpen(false)}
      >
        <Alert
          onClose={() => setDeleteEmployeeAlertOpen(false)}
          severity="success"
        >
          Employee Deleted!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default EmployeeDataGrid;
