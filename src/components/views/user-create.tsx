import { useMutation } from "@apollo/client";
import { Button, Typography, TextField } from "@mui/material";
import { CREATE_USER } from "api";
import type { FC } from "react";
import { useState } from "react";
import { defaultNewUser, updateUsers, validateCreateUser } from "utils";

type Props = {
  handleModalClose: () => void;
};

export const UserCreate: FC<Props> = ({ handleModalClose }) => {
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
    const validations = validateCreateUser(inputs);
    setErrors(validations);

    // // checks for validation errors
    if (Object.values(validations).some(i => i !== "")) {
      return;
    }

    createUser({
      variables: {
        input: { name: inputs.name, jobTitle: inputs.jobTitle }
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
