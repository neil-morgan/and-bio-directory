import { useMutation } from "@apollo/client";
import { Button, Typography, TextField } from "@mui/material";
import { UPDATE_USER } from "api";
import type { FC } from "react";
import { useState } from "react";
import type { UserProps } from "types";
import { defaultNewUser, refetchUsers, validateUserForm } from "utils";

type UserUpdateProps = {
  handleModalClose: () => void;
} & UserProps;

export const UserUpdate: FC<UserUpdateProps> = ({
  handleModalClose,
  id,
  name,
  surname,
  role
}) => {
  const [inputs, setInputs] = useState({ name, surname, role });
  const [errors, setErrors] = useState(defaultNewUser);

  const [updateUser] = useMutation(UPDATE_USER, refetchUsers());

  const handleInputChange = (event: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = () => {
    const validations = validateUserForm(inputs);
    setErrors(validations);

    // // checks for validation errors
    if (Object.values(validations).some(i => i !== "")) {
      return;
    }

    const payload = {
      id,
      name: inputs.name,
      surname: inputs.surname,
      role: inputs.role
    };

    updateUser({
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
        Update user
      </Typography>

      <TextField
        {...(errors.name && { helperText: errors.name })}
        error={Boolean(errors.name)}
        label="Name"
        name="name"
        onChange={handleInputChange}
        size="small"
        sx={modalInputStyle}
        value={inputs.name}
      />

      <TextField
        {...(errors.surname && { helperText: errors.surname })}
        error={Boolean(errors.surname)}
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
        Update
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
