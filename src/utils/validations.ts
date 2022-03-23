import type { UserProps } from "types";
import isAlpha from "validator/lib/isAlpha";

import { defaultNewUser } from "./constants";

const alphaIgnore = "/^[-sa-zA-Z]+$/u";

export const validateCreateUser = (inputs: UserProps): UserProps => {
  const errors = { ...defaultNewUser };
  const requiredText = "This field is required.";

  Object.keys(inputs).forEach(input => {
    switch (input) {
      case "name":
        if (inputs.name === "") {
          return (errors.name = requiredText);
        }
        if (!isAlpha(inputs.name, "en-GB", { ignore: alphaIgnore })) {
          errors.name = "Only accepts letters and spaces. Please try again.";
        }
        break;

      case "role":
        if (inputs.role === "") {
          return (errors.role = requiredText);
        }
        if (!isAlpha(inputs.role, "en-GB", { ignore: alphaIgnore })) {
          errors.role =
            "You have entered an invalid job title. Please try again.";
        }
        break;
    }
  });

  return errors;
};

export const validateUpdateUser = (inputs: UserProps): UserProps => {
  const errors = { ...defaultNewUser };

  Object.keys(inputs).forEach(input => {
    switch (input) {
      case "name":
        if (!isAlpha(inputs.name, "en-GB", { ignore: alphaIgnore })) {
          errors.name = "Only accepts letters and spaces. Please try again.";
        }
        break;

      case "role":
        if (!isAlpha(inputs.role, "en-GB", { ignore: alphaIgnore })) {
          errors.role =
            "You have entered an invalid job title. Please try again.";
        }
        break;
    }
  });

  return errors;
};
