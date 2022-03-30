import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($input: createUserData!) {
    createUser(input: $input) {
      id
      name
      surname
      role
      skills
      seniority
      traits
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($input: updateUserData!) {
    updateUser(input: $input) {
      name
      surname
      role
      seniority
      skills
      traits
    }
  }
`;

export const DELETE_USER = gql`
  mutation ($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      name
      surname
      role
    }
  }
`;

export const GET_USER = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      name
      surname
      role
      seniority
      skills
      traits
    }
  }
`;

export const GET_USER_BY_NAME = gql`
  query ($name: String!) {
    userByName(name: $name) {
      name
    }
  }
`;
