import type { ReactNode } from "react";

export type ReactChildrenProps = {
  children?: ReactNode | ReactNode[];
};

export type SelectIndexSignature = {
  [key: string]: () => void;
};

export type UserProps = {
  id?: string;
  name: string;
  surname: string;
  role: string;
  seniority: string;
  skills: string[] | never[];
  traits: string[] | never[];
};
