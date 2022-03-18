import type { FC } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_USER, GET_USER } from "api";
import { updateUsers } from "utils";
import { useQuery } from "@apollo/client";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";

export const UserPage: FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  const [deleteUser] = useMutation(DELETE_USER, updateUsers());

  const handleDeleteUser = (id: number) => {
    deleteUser({
      variables: {
        id,
      },
    });
  };

  return loading ? (
    <CircularProgress />
  ) : (
    <Box sx={wrapper}>
      <Link to={"/"}>
        <Typography>back</Typography>
      </Link>
      <Typography variant="h6">ID: {data.user.id}</Typography>
      <Typography variant="h4">{data.user.name}'s page</Typography>

      <button
        type="button"
        onClick={() => {
          handleDeleteUser(data.user.id);
          navigate("/");
        }}
      >
        delete
      </button>
    </Box>
  );
};

const wrapper = {
  display: "flex",
  flexDirection: "column",
};
