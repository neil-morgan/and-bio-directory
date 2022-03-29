import { useQuery } from "@apollo/client";
import { GET_USERS } from "api";
import { UsersList, UserItem } from "components/views";
import type { FC } from "react";
import type { UserProps } from "types";
import { v4 as uuid } from "uuid";

export const UsersPage: FC = () => {
  // useQuery gets data on load
  const { data, loading } = useQuery(GET_USERS);

  if (loading) {
    return <span>Data loading please wait...</span>;
  }

  return (
    <UsersList>
      {data?.users.map(({ name, surname, id, role, seniority, skills }: UserProps) => (
        <UserItem
          key={uuid()}
          name={name}
          surname={surname}
          role={role}
          id={id}
          seniority={seniority}
          skills={skills}
        />
      ))}
    </UsersList>
  );
};
