import { GET_USERS } from "api";
import type { DocumentNode } from "graphql";

export const updateUsers = (): {
  refetchQueries: {
    query: DocumentNode;
  }[];
} => ({
  refetchQueries: [{ query: GET_USERS }],
});
