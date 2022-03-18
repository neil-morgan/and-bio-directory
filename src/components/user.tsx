import { useMutation } from "@apollo/client";
import { Box } from "@mui/material";
import { DELETE_USER } from "api";
import type { FC } from "react";
import type { UserProps } from "types";
import { updateUsers } from "utils";
import { v4 as uuid } from "uuid";

export const User: FC<UserProps> = ({ name, id }) => {
  const [deleteUser] = useMutation(DELETE_USER, updateUsers());

  const handleDeleteUser = (id: number) => {
    deleteUser({
      variables: {
        id,
      },
    });
  };

  return (
    <Box key={uuid()} sx={wrapper}>
      <div>
        id: {id} - name: {name}
      </div>
      <button
        type="button"
        onClick={() => {
          handleDeleteUser(id);
        }}
      >
        delete
      </button>
    </Box>
  );
};

const wrapper = {
  display: "flex",
};
