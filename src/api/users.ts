import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
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

export const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
    }
  }
`;
