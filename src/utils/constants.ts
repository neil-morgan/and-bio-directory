import type { UserProps } from "types";

export const defaultNewUser: UserProps = {
  name: "",
  surname: "",
  role: "",
  seniority: "",
  skills: [],
  traits: []
};

export const searchKeys = ["name", "surname", "role", "traits"];

export const searchTraitsOptions = [
  "Approachable",
  "Progressive",
  "Ambitious",
  "Thoughtful",
  "Friendly"
];

export const searchSkillsOptions = [
  "React",
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
  "Senior",
  "Principle"
];
