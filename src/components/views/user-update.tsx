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
        {...(errors.jobTitle && { helperText: errors.jobTitle })}
        error={Boolean(errors.jobTitle)}
        label="Job title"
        name="jobTitle"
        onChange={handleInputChange}
        size="small"
        sx={modalInputStyle}
        value={inputs.jobTitle}
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
