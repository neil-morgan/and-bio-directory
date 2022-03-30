/* eslint object-shorthand: 0 */

import { useMutation } from "@apollo/client";
import { Button, Typography, TextField } from "@mui/material";
import { UPDATE_USER } from "api";
import { MultiSelect } from "components/common";
import type { FC } from "react";
import { useState } from "react";
import type { UserProps } from "types";
import {
  defaultNewUser,
  refetchUsers,
  searchSkillsOptions,
  searchTraitsOptions,
  validateUserForm
} from "utils";

type UserUpdateProps = {
  handleModalClose: () => void;
} & UserProps;

export const UserUpdate: FC<UserUpdateProps> = ({
  handleModalClose,
  id,
  name,
  surname,
  role,
  seniority,
  skills,
  traits
}) => {
  const [inputs, setInputs] = useState({
    name,
    surname,
    role,
    seniority,
    skills,
    traits
  });
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

  const handleSelectChange = (name: string, selection: string[]) => {
    setInputs(inputs => ({
      ...inputs,
      [name]: selection
    }));
  };

  const handleSubmit = () => {
    const validations = validateUserForm(inputs);
    setErrors(validations);

    // // checks for validation errors
    for (const [key, value] of Object.entries(validations)) {
      if (value !== "") {
        if (Array.isArray(value)) {
          if (value[0].length > 0) {
            console.log(key, value);
            return;
          }
        } else {
          console.log(key, value);
          return;
        }
      }
    }

    const payload = {
      id,
      name: inputs.name.trim(),
      surname: inputs.surname.trim(),
      role: inputs.role.trim(),
      seniority: inputs.seniority.trim(),
      skills: inputs.skills,
      traits: inputs.traits
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

      <TextField
        {...(errors.seniority && { helperText: errors.seniority })}
        error={Boolean(errors.seniority)}
        label="Seniority"
        name="seniority"
        onChange={handleInputChange}
        size="small"
        sx={modalInputStyle}
        value={inputs.seniority}
      />

      <MultiSelect
        name="skills"
        fields={searchSkillsOptions}
        label="Skills"
        handler={handleSelectChange}
        selected={inputs.skills}
        sx={modalInputStyle}
      />

      <MultiSelect
        name="traits"
        fields={searchTraitsOptions}
        label="Traits"
        handler={handleSelectChange}
        selected={inputs.traits}
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
