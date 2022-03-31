import { useQuery } from "@apollo/client";
import { GET_USERS } from "api";
import { UsersList, UserItem } from "components/views";
import type { FC } from "react";
import type { UserType } from "types";
import { v4 as uuid } from "uuid";

export const UsersPage: FC = () => {
  // useQuery gets data on load
  const { data, loading } = useQuery(GET_USERS);

  if (loading) {
    return <span>Data loading please wait...</span>;
  }

  return (
    <UsersList>
      {data?.users.map((props: UserType) => (
        <UserItem key={uuid()} {...props} />
      ))}
    </UsersList>
  );
};
