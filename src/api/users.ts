import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;

export const DELETE_USER = gql`
  mutation ($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      id
    }
  }
`;

export const GET_USER_BY_NAME = gql`
  query userByName($name: String!) {
    userByName(name: $name) {
      name
    }
  }
`;

export const QUERY_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
    }
  }
`;
