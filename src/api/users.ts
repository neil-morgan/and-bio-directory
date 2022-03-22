import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($input: CreateUserData!) {
    createUser(input: $input) {
      id
      name
      jobTitle
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      jobTitle
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
      jobTitle
    }
  }
`;

export const GET_USER = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      name
      jobTitle
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
