import type { UserType } from "types";
import isAlpha from "validator/lib/isAlpha";

import { defaultUserErrors } from "./constants";

const alphaIgnore = "/^[-sa-zA-Z]+$/u";
const requiredText = "This field is required.";
const lettersAndSpaces = "Only accepts letters and spaces. Please try again.";

export const validateUserForm = (
  inputs: UserType,
  checkRequired?: boolean
): {
  [key: string]: string;
} => {
  const errors = { ...defaultUserErrors };

  Object.keys(inputs).forEach(input => {
    switch (input) {
      case "name":
        if (checkRequired && inputs.name === "") {
          return (errors.name = requiredText);
        }
        if (!isAlpha(inputs.name, "en-GB", { ignore: alphaIgnore })) {
          errors.name = lettersAndSpaces;
        }
        break;

      case "surname":
        if (checkRequired && inputs.surname === "") {
          return (errors.surname = requiredText);
        }
        if (!isAlpha(inputs.surname, "en-GB", { ignore: alphaIgnore })) {
          errors.surname = lettersAndSpaces;
        }
        break;

      case "role":
        if (checkRequired && inputs.role === "") {
          return (errors.role = requiredText);
        }
        if (!isAlpha(inputs.role, "en-GB", { ignore: alphaIgnore })) {
          errors.role = "You have entered an invalid role. Please try again.";
        }
        break;

      case "traits":
        if (checkRequired && inputs.traits.length === 0) {
          return (errors.traits = requiredText);
        }
        break;

      case "skills":
        if (checkRequired && inputs.skills.length === 0) {
          return (errors.skills = requiredText);
        }
        break;

      case "seniority":
        if (checkRequired && inputs.seniority === "") {
          return (errors.seniority = requiredText);
        }
        break;
    }
  });

  return errors;
};
