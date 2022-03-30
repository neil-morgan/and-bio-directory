/* eslint object-shorthand: 0 */
import { useMutation } from "@apollo/client";
import { Button, Typography, TextField } from "@mui/material";
import { CREATE_USER } from "api";
import { BasicSelect, MultiSelect } from "components/common";
import type { FC } from "react";
import { useState } from "react";
import {
  defaultUser,
  defaultUserErrors,
  objectHasStrings,
  refetchUsers,
  searchRolesOptions,
  searchSeniorityOptions,
  searchSkillsOptions,
  searchTraitsOptions,
  validateUserForm
} from "utils";

type UserCreateProps = {
  handleModalClose: () => void;
};

export const UserCreate: FC<UserCreateProps> = ({ handleModalClose }) => {
  const [inputs, setInputs] = useState(defaultUser);
  const [errors, setErrors] = useState(defaultUserErrors);
  const [createUser] = useMutation(CREATE_USER, refetchUsers());

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
    const validations = validateUserForm(inputs, true);

    setErrors(validations);

    if (objectHasStrings(validations)) {
      return;
    }

    createUser({
      variables: {
        input: {
          name: inputs.name.trim(),
          surname: inputs.surname.trim(),
          role: inputs.role,
          seniority: inputs.seniority,
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
        Create a new user
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
        error={Boolean(errors.seniority)}
        fields={searchSeniorityOptions}
        handler={handleSelectChange}
        helperText={errors.seniority}
        label="Seniority"
        name="seniority"
        selected={inputs.seniority}
        sx={modalInputStyle}
      />

      <MultiSelect
        error={Boolean(errors.skills)}
        fields={searchSkillsOptions}
        handler={handleSelectChange}
        helperText={errors.skills}
        label="Skills"
        name="skills"
        selected={inputs.skills}
        sx={modalInputStyle}
      />

      <MultiSelect
        error={Boolean(errors.traits)}
        fields={searchTraitsOptions}
        handler={handleSelectChange}
        helperText={errors.traits}
        label="Traits"
        name="traits"
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
