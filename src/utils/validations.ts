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

      case "jobTitle":
        if (inputs.jobTitle === "") {
          return (errors.jobTitle = requiredText);
        }
        if (!isAlpha(inputs.jobTitle, "en-GB", { ignore: alphaIgnore })) {
          errors.jobTitle =
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

      case "jobTitle":
        if (!isAlpha(inputs.jobTitle, "en-GB", { ignore: alphaIgnore })) {
          errors.jobTitle =
            "You have entered an invalid job title. Please try again.";
        }
        break;
    }
  });

  return errors;
};
