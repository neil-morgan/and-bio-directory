/* eslint object-shorthand: 0 */

import { useMutation } from "@apollo/client";
import { Button, Typography, TextField } from "@mui/material";
import { UPDATE_USER } from "api";
import { BasicSelect, MultiSelect } from "components/common";
import type { FC } from "react";
import { useState } from "react";
import type { UserType } from "types";
import {
  defaultUser,
  defaultUserErrors,
  refetchUsers,
  searchSeniorityOptions,
  searchRolesOptions,
  searchSkillsOptions,
  searchTraitsOptions,
  objectHasStrings,
  validateUserForm
} from "utils";

type UserUpdateProps = {
  handleModalClose: () => void;
} & UserType;

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
  const [errors, setErrors] = useState(defaultUserErrors);
  const [updateUser] = useMutation(UPDATE_USER, refetchUsers());

  const handleInputChange = (event: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const handleSelectChange = (name: string, selected: string[] | string) => {
    setInputs(inputs => ({
      ...inputs,
      [name]: selected
    }));
  };

  const handleSubmit = () => {
    const validations = validateUserForm(inputs);
    setErrors(validations);

    if (objectHasStrings(validations)) {
      return;
    }

    updateUser({
      variables: {
        input: {
          id,
          name: inputs.name.trim(),
          surname: inputs.surname.trim(),
          role: inputs.role.trim(),
          seniority: inputs.seniority.trim(),
          skills: inputs.skills,
          traits: inputs.traits
        }
      }
    });
    setInputs(defaultUser);
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

      <BasicSelect
        error={Boolean(errors.role)}
        fields={searchRolesOptions}
        handler={handleSelectChange}
        helperText={errors.role}
        label="Role"
        name="role"
        selected={inputs.role}
        sx={modalInputStyle}
      />

      <BasicSelect
        name="seniority"
        fields={searchSeniorityOptions}
        label="Seniority"
        selected={inputs.seniority}
        handler={handleSelectChange}
        sx={modalInputStyle}
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
