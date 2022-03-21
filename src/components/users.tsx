import { useMutation } from "@apollo/client";
import { Box, Button, Typography, TextField, Modal } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CREATE_USER } from "api";
import type { FC } from "react";
import type { UsersProps } from "types";
import { useState } from "react";
import { defaultNewUser, updateUsers } from "utils";

export const Users: FC<UsersProps> = ({ children }) => {
  const [inputs, setInputs] = useState(defaultNewUser);
  const [open, setOpen] = useState(false);
  const [createUser] = useMutation(CREATE_USER, updateUsers());

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCreateUser = () => {
    if (inputs.name === "") {
      return;
    }
    createUser({
      variables: {
        input: { name: inputs.name },
      },
    });
    setInputs(defaultNewUser);
  };

  return (
    <>
      <Box sx={usersBox}>
        <Typography sx={usersTitle} variant="h5">
          All users
        </Typography>
        {children}
        <Button
          onClick={handleModalOpen}
          variant="contained"
          size="small"
          sx={newUserButton}
        >
          Add new user
        </Button>
      </Box>

      <Modal open={open} onClose={handleModalClose}>
        <Box sx={modalBoxStyle}>
          <Typography sx={modalTitleStyle} variant="h6" component="h2">
            Create a new user
          </Typography>
          <TextField
            name="name"
            label="Name"
            size="small"
            onChange={handleInputChange}
            sx={modalInputStyle}
          />
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              handleCreateUser();
              handleModalClose();
            }}
            sx={modalButtonStyle}
          >
            Create User
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const usersBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  p: 2,
  bgcolor: grey[50],
  my: 2,
  borderRadius: 2,
};

const usersTitle = {
  mb: 2,
  width: "100%",
  textAlign: "center",
};

const newUserButton = {
  mt: 2,
};

const modalBoxStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: grey[50],
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const modalTitleStyle = {
  mb: 3,
};

const modalInputStyle = {
  width: "100%",
};

const modalButtonStyle = {
  mt: 3,
};
