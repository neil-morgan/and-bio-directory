import isAlpha from "validator/lib/isAlpha";

import { defaultNewUser } from "./constants";

type CreateUserProps = {
  name: string;
  jobTitle: string;
};

export const validateCreateUser = (
  inputs: CreateUserProps
): CreateUserProps => {
  const errors = { ...defaultNewUser };
  const requiredText = "This field is required.";

  Object.keys(inputs).forEach(input => {
    switch (input) {
      case "name":
        if (inputs.name === "") {
          return (errors.name = requiredText);
        }
        if (!isAlpha(inputs.name, "en-GB", { ignore: "/^[-sa-zA-Z]+$/u" })) {
          errors.name = "You have entered an invalid name. Please try again.";
        }
        break;

      case "jobTitle":
        if (inputs.jobTitle === "") {
          return (errors.jobTitle = requiredText);
        }
        if (
          !isAlpha(inputs.jobTitle, "en-GB", { ignore: "/^[-sa-zA-Z]+$/u" })
        ) {
          errors.jobTitle =
            "You have entered an invalid job title. Please try again.";
        }
        break;
    }
  });

  return errors;
};
