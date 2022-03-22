import { useMutation } from "@apollo/client";
import { Button, Typography, TextField } from "@mui/material";
import { UPDATE_USER } from "api";
import type { FC } from "react";
import { useState } from "react";
import { defaultNewUser, updateUsers, validateUpdateUser } from "utils";

type Props = {
  id: number;
  name: string;
  jobTitle: string;
  handleModalClose: () => void;
};

export const UserUpdate: FC<Props> = ({
  handleModalClose,
  id,
  name,
  jobTitle
}) => {
  const [inputs, setInputs] = useState({ name, jobTitle });
  const [errors, setErrors] = useState(defaultNewUser);

  const [updateUser] = useMutation(UPDATE_USER, updateUsers());

  const handleInputChange = (event: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = () => {
    const validations = validateUpdateUser(inputs);
    setErrors(validations);

    // // checks for validation errors
    if (Object.values(validations).some(i => i !== "")) {
      return;
    }

    updateUser({
      variables: {
        input: { id, name: inputs.name, jobTitle: inputs.jobTitle }
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
        name="name"
        error={Boolean(errors.name)}
        {...(errors.name && { helperText: errors.name })}
        label="Name"
        size="small"
        value={inputs.name}
        onChange={handleInputChange}
        sx={modalInputStyle}
      />

      <TextField
        name="jobTitle"
        error={Boolean(errors.jobTitle)}
        {...(errors.jobTitle && { helperText: errors.jobTitle })}
        label="Job title"
        size="small"
        value={inputs.jobTitle}
        onChange={handleInputChange}
        sx={modalInputStyle}
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
