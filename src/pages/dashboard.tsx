import { useQuery } from "@apollo/client";
import { GET_USERS } from "api";
import { User, Users, Search } from "components";
import type { FC } from "react";
import { v4 as uuid } from "uuid";

export const Dashboard: FC = () => {
  // useQuery gets data on load
  const { data, loading } = useQuery(GET_USERS);

  if (loading) {
    return <span>Data loading please wait...</span>;
  }

  return (
    <>
      <Search />
      <Users>
        {data?.users.map((user: { name: string; id: number }) => (
          <User key={uuid()} name={user.name} id={user.id} />
        ))}
      </Users>
    </>
  );
};
