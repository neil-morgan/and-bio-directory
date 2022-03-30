import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($input: createUserData!) {
    createUser(input: $input) {
      id
      name
      role
      seniority
      skills
      surname
      traits
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($input: updateUserData!) {
    updateUser(input: $input) {
      name
      role
      seniority
      skills
      surname
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
      role
      seniority
      skills
      surname
      traits
    }
  }
`;

export const GET_USER = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      name
      role
      seniority
      skills
      surname
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
