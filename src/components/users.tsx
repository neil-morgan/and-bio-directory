import { useMutation } from "@apollo/client";
import { Box } from "@mui/material";
import { CREATE_USER } from "api";
import type { FC, ReactNode } from "react";
import { useState } from "react";
import { updateUsers } from "utils";

type UsersProps = {
  children?: ReactNode | ReactNode[];
};

export const Users: FC<UsersProps> = ({ children }) => {
  const [name, setName] = useState("");
  const [createUser] = useMutation(CREATE_USER, updateUsers());

  const handleCreateUser = () => {
    if (name === "") {
      return;
    }
    createUser({
      variables: {
        input: { name },
      },
    });
  };

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <div>
        <label htmlFor="name">add user</label>
        <input
          name="name"
          aria-label="Name"
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <button type="button" onClick={handleCreateUser}>
          Create User
        </button>
      </div>
      {children}
    </Box>
  );
};
