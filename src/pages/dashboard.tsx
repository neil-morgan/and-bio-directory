import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
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
    <Box sx={wrapperProps}>
      <Search />
      <Users>
        {data?.users.map(
          ({
            name,
            id,
            job_title,
          }: {
            name: string;
            job_title: string;
            id: number;
          }) => (
            <User key={uuid()} name={name} jobTitle={job_title} id={id} />
          )
        )}
      </Users>
    </Box>
  );
};

const wrapperProps = {
  display: "flex",
  flexDirection: "column",
  p: 1,
};
