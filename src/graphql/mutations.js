/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
      firstname
      lastname
      skills {
        items {
          id
          employeeID
          skillID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $input: UpdateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    updateEmployee(input: $input, condition: $condition) {
      id
      firstname
      lastname
      skills {
        items {
          id
          employeeID
          skillID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
      id
      firstname
      lastname
      skills {
        items {
          id
          employeeID
          skillID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createSkill = /* GraphQL */ `
  mutation CreateSkill(
    $input: CreateSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    createSkill(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          employeeID
          skillID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateSkill = /* GraphQL */ `
  mutation UpdateSkill(
    $input: UpdateSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    updateSkill(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          employeeID
          skillID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteSkill = /* GraphQL */ `
  mutation DeleteSkill(
    $input: DeleteSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    deleteSkill(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          employeeID
          skillID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createEmployeeSkillConnection = /* GraphQL */ `
  mutation CreateEmployeeSkillConnection(
    $input: CreateEmployeeSkillConnectionInput!
    $condition: ModelEmployeeSkillConnectionConditionInput
  ) {
    createEmployeeSkillConnection(input: $input, condition: $condition) {
      id
      employeeID
      skillID
      employee {
        id
        firstname
        lastname
        skills {
          nextToken
        }
        createdAt
        updatedAt
      }
      skill {
        id
        name
        employees {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateEmployeeSkillConnection = /* GraphQL */ `
  mutation UpdateEmployeeSkillConnection(
    $input: UpdateEmployeeSkillConnectionInput!
    $condition: ModelEmployeeSkillConnectionConditionInput
  ) {
    updateEmployeeSkillConnection(input: $input, condition: $condition) {
      id
      employeeID
      skillID
      employee {
        id
        firstname
        lastname
        skills {
          nextToken
        }
        createdAt
        updatedAt
      }
      skill {
        id
        name
        employees {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteEmployeeSkillConnection = /* GraphQL */ `
  mutation DeleteEmployeeSkillConnection(
    $input: DeleteEmployeeSkillConnectionInput!
    $condition: ModelEmployeeSkillConnectionConditionInput
  ) {
    deleteEmployeeSkillConnection(input: $input, condition: $condition) {
      id
      employeeID
      skillID
      employee {
        id
        firstname
        lastname
        skills {
          nextToken
        }
        createdAt
        updatedAt
      }
      skill {
        id
        name
        employees {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
