import { useQuery } from "@apollo/client";
import { GET_USERS } from "api";
import { User, Users } from "components/views";
import type { FC } from "react";
import type { UserProps } from "types";
import { v4 as uuid } from "uuid";

export const HomePage: FC = () => {
  // useQuery gets data on load
  const { data, loading } = useQuery(GET_USERS);

  if (loading) {
    return <span>Data loading please wait...</span>;
  }

  return (
    <Users>
      {data?.users.map(({ name, id, jobTitle }: UserProps) => (
        <User key={uuid()} name={name} jobTitle={jobTitle} id={id} />
      ))}
    </Users>
  );
};
