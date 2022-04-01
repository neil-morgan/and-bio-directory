import type { UserType, UserTypeErrors } from "types";

export const defaultUser: UserType = {
  name: "",
  surname: "",
  role: "",
  seniority: "",
  skills: [],
  traits: []
};

export const defaultUserErrors: UserTypeErrors = {
  name: "",
  surname: "",
  role: "",
  seniority: "",
  skills: "",
  traits: ""
};

export const searchKeys = [
  "name",
  "role",
  "seniority",
  "skills",
  "surname",
  "traits"
];

export const searchRolesOptions = [
  "Product Developer",
  "Product Analyst",
  "Squad Lead"
];

export const searchTraitsOptions = [
  "Ambitious",
  "Approachable",
  "Friendly",
  "Progressive",
  "Thoughtful"
];

export const searchSkillsOptions = [
  "GraphQL",
  "Javascript",
  "Typescript",
  "Scrum",
  "Agile",
  "UI/UX",
  "Figma",
  "Jira"
];

export const searchRoleOptions = [
  "Product Developer",
  "Product Analyst",
  "Squad Lead"
];

export const searchSeniorityOptions = [
  "Associate",
  "Middle",
  "Principle",
  "Senior"
];
