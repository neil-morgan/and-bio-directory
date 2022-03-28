import { useMutation } from "@apollo/client";
import { Button, Typography, TextField } from "@mui/material";
import { CREATE_USER } from "api";
import type { FC } from "react";
import { useState } from "react";
import { defaultNewUser, updateUsers, validateUserForm } from "utils";

type UserCreateProps = {
  handleModalClose: () => void;
};

export const UserCreate: FC<UserCreateProps> = ({ handleModalClose }) => {
  const [inputs, setInputs] = useState(defaultNewUser);
  const [errors, setErrors] = useState(defaultNewUser);

  const [createUser] = useMutation(CREATE_USER, updateUsers());

  const handleInputChange = (event: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = () => {
    const validations = validateUserForm(inputs, true);
    setErrors(validations);

    // // checks for validation errors
    if (Object.values(validations).some(i => i !== "")) {
      return;
    }

    const payload = {
      name: inputs.name,
      surname: inputs.surname,
      role: inputs.role
    };

    createUser({
      variables: {
        input: payload
      }
    });
    setInputs(defaultNewUser);
    handleModalClose();
  };

  return (
    <>
      <Typography sx={modalTitleStyle} variant="h6" component="h2">
        Create a new user
      </Typography>

      <TextField
        error={Boolean(errors.name)}
        helperText={errors.name ? errors.name : "A-Z"}
        label="Name"
        name="name"
        onChange={handleInputChange}
        size="small"
        sx={modalInputStyle}
        value={inputs.name}
      />

      <TextField
        error={Boolean(errors.surname)}
        helperText={errors.surname ? errors.surname : "A-Z"}
        label="Surname"
        name="surname"
        onChange={handleInputChange}
        size="small"
        sx={modalInputStyle}
        value={inputs.surname}
      />

      <TextField
        {...(errors.role && { helperText: errors.role })}
        error={Boolean(errors.role)}
        label="Role"
        name="role"
        onChange={handleInputChange}
        size="small"
        sx={modalInputStyle}
        value={inputs.role}
      />

      <Button
        type="button"
        variant="contained"
        onClick={() => {
          handleSubmit();
        }}
        sx={modalButtonStyle}
      >
        Create
      </Button>
    </>
  );
};

const modalTitleStyle = {
  mb: 3
};

const modalButtonStyle = {
  ml: "auto"
};

const modalInputStyle = {
  width: "100%",
  mb: 2
};
