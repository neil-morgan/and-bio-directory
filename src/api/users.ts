import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
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
