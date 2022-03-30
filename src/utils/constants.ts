import type { UserProps } from "types";

export const defaultNewUser: UserProps = {
  name: "",
  surname: "",
  role: "",
  seniority: "",
  skills: [],
  traits: []
};

export const searchKeys = [
  "name",
  "role",
  "seniority",
  "skills",
  "surname",
  "traits"
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
  "GraphQL",
  "Scrum",
  "Agile",
  "UI/UX",
  "Figma",
  "Jira"
];

export const searchSeniorityOptions = [
  "Associate",
  "Middle",
  "Principle",
  "Senior"
];
