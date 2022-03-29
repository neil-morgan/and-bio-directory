/* eslint object-shorthand: 0 */
import { useMutation } from "@apollo/client";
import { Button, Typography, TextField } from "@mui/material";
import { CREATE_USER } from "api";
import { MultiSelect } from "components/common";
import type { FC } from "react";
import { useState } from "react";
import { defaultNewUser, refetchUsers, validateUserForm, searchSkillsOptions } from "utils";

type UserCreateProps = {
  handleModalClose: () => void;
};

export const UserCreate: FC<UserCreateProps> = ({ handleModalClose }) => {
  const [inputs, setInputs] = useState(defaultNewUser);
  const [skills, setSkills] = useState<string[]>([]);
  const [errors, setErrors] = useState(defaultNewUser);

  const [createUser] = useMutation(CREATE_USER, refetchUsers());
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
    for (const [value] of Object.entries(validations)) {
      if (value !== "") {
        if (Array.isArray(value)) {
          if (value[0].length > 0) { return }
        }
        else { return }
      }
    }

    const payload = {
      name: inputs.name.trim(),
      surname: inputs.surname.trim(),
      role: inputs.role.trim(),
      seniority: inputs.seniority.trim(),
      skills: skills,
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
        fields={searchSkillsOptions}
        label="Skills"
        setState={setSkills}
        state={skills}
        sx={modalInputStyle} />

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
