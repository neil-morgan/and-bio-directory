import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { GET_USERS } from "api";
import { User, Users, Search } from "components/views";
import type { FC } from "react";
import { v4 as uuid } from "uuid";

export const HomePage: FC = () => {
  // useQuery gets data on load
  const { data, loading } = useQuery(GET_USERS);

  if (loading) {
    return <span>Data loading please wait...</span>;
  }

  type DashboardProps = {
    name: string;
    jobTitle: string;
    id: number;
  };

  return (
    <Box sx={wrapperProps}>
      <Search />
      <Users>
        {data?.users.map(({ name, id, jobTitle }: DashboardProps) => (
          <User key={uuid()} name={name} jobTitle={jobTitle} id={id} />
        ))}
      </Users>
    </Box>
  );
};

const wrapperProps = {
  display: "flex",
  flexDirection: "column",
  p: 1
};
