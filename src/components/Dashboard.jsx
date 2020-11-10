import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { gql, useQuery } from "@apollo/client";

import EmployeeDataGrid from "./EmployeeDataGrid";
import SkillDataGrid from "./SkillDataGrid";
import CreateEmployeeForm from "./CreateEmployeeForm";
import CreateSkillForm from "./CreateSkillForm";

import logo from "../logo.png";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2.5),
  },
}));

const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        skills {
          items {
            id
            skill {
              id
              name
            }
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

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
        employees {
          items {
            id
            employee {
              id
              firstname
              lastname
            }
          }
        }
      }
      nextToken
    }
  }
`;

const Dashboard = () => {
  const classes = useStyles();
  const [createEmployeeFormOpen, setCreateEmployeeFormOpen] = useState(false);
  const [createSkillFormOpen, setCreateSkillFormOpen] = useState(false);
  const [createEmployeeAlertOpen, setCreateEmployeeAlertOpen] = useState(false);
  const [createSkillAlertOpen, setCreateSkillAlertOpen] = useState(false);
  const { data: employeesData, refetch: employeesRefetch } = useQuery(
    gql(listEmployees)
  );
  const { data: skillsData, refetch: skillsRefetch } = useQuery(
    gql(listSkills)
  );
  const refetch = () => {
    employeesRefetch();
    skillsRefetch();
  };
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={{ background: "#b3e5fc" }}
        >
          <Toolbar>
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <img src={logo} alt="BuildOps" style={{ marginTop: "10px" }} />
            </Link>
          </Toolbar>
          <div style={{ margin: "5px 25px" }}>
            <IconButton color="default" onClick={() => setCount(0)}>
              <Badge badgeContent={count} color="secondary">
                <NotificationsIcon fontSize="large" />
              </Badge>
            </IconButton>
            <IconButton color="default">
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </div>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <Link
                to="/employees"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <ListItem button key="employees">
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Employees" />
                </ListItem>
              </Link>
              <Link
                to="/skills"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <ListItem button key="skills">
                  <ListItemIcon>
                    <LibraryBooksIcon />
                  </ListItemIcon>
                  <ListItemText primary="Skills" />
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <ListItem
                button
                key="addEmployee"
                onClick={() => setCreateEmployeeFormOpen(true)}
              >
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Create Employee" />
              </ListItem>
              <CreateEmployeeForm
                open={createEmployeeFormOpen}
                onClose={() => setCreateEmployeeFormOpen(false)}
                refetch={refetch}
                onSuccess={() => {
                  setCreateEmployeeAlertOpen(true);
                  setCount((prevCount) => prevCount + 1);
                }}
              />
              <Snackbar
                open={createEmployeeAlertOpen}
                autoHideDuration={5000}
                onClose={() => setCreateEmployeeAlertOpen(false)}
              >
                <Alert
                  onClose={() => setCreateEmployeeAlertOpen(false)}
                  severity="success"
                >
                  Employee Created!
                </Alert>
              </Snackbar>
              <ListItem
                button
                key="addSkill"
                onClick={() => setCreateSkillFormOpen(true)}
              >
                <ListItemIcon>
                  <LibraryAddIcon />
                </ListItemIcon>
                <ListItemText primary="Create Skill" />
              </ListItem>
              <CreateSkillForm
                open={createSkillFormOpen}
                onClose={() => setCreateSkillFormOpen(false)}
                refetch={refetch}
                onSuccess={() => {
                  setCreateSkillAlertOpen(true);
                  setCount((prevCount) => prevCount + 1);
                }}
              />
              <Snackbar
                open={createSkillAlertOpen}
                autoHideDuration={5000}
                onClose={() => setCreateSkillAlertOpen(false)}
              >
                <Alert
                  onClose={() => setCreateSkillAlertOpen(false)}
                  severity="success"
                >
                  Skill Created!
                </Alert>
              </Snackbar>
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Switch>
            <Route path="/" exact>
              <h1 style={{ height: "80vh", width: "100%", margin: 0 }}>
                Welcome!
              </h1>
            </Route>
            <Route path="/employees">
              <div style={{ height: "80vh", width: "100%" }}>
                {employeesData && (
                  <EmployeeDataGrid
                    data={employeesData}
                    refetch={refetch}
                    onIncrement={() => setCount((prevCount) => prevCount + 1)}
                  />
                )}
              </div>
            </Route>
            <Route path="/skills">
              <div style={{ height: "80vh", width: "100%" }}>
                {skillsData && (
                  <SkillDataGrid
                    data={skillsData}
                    refetch={refetch}
                    onIncrement={() => setCount((prevCount) => prevCount + 1)}
                  />
                )}
              </div>
            </Route>
          </Switch>
          <div style={{ height: "25px" }}></div>
          <Typography color="textSecondary" align="center">
            {`Copyright © Jiankai Xiao ${new Date().getFullYear()}.`}
          </Typography>
        </main>
      </div>
    </Router>
  );
};

export default Dashboard;
