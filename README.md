# BuildOps Full-Stack Coding Test

## Development

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deployment

### `npm install -g @aws-amplify/cli`

Installs the Amplify CLI globally (you might need to run the command above with `sudo`).

### `amplify configure`

Configures Amplify and creates an IAM user.

### `amplify push`

Deploys the backend.

### `amplify add hosting`

Adds hosting to your app.

### `amplify publish`

Publishes your app.

## Usage

This project implements CRUD queries to support Employee and Skill schema.

Click `Employees` to display all records of employees with avatar, first name, last name, full name, skills (a list of skills that the employee has), created at and updated at.

Click `Skills` to display all records of skills with name and employees (a list of employees that have the skill).

Click `Create Employee` to create a new record of employee by entering first name, last name, and choosing from existing skills (first name and last name cannot be empty).

Click `Create Skill` to create a new record of skill by entering name (name cannot be empty).

For each record of employee or skill, click `Update` to update the record (same rules apply here) or click `Delete` to delete the record.

The notification badge counts the number of create/update/delete, i.e. mutations, during the current visit. Click it to mark as read.

The account badge is reserved for login functionality in the future development.
