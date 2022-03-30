import type { SxProps } from "@mui/system";
import type { ReactNode } from "react";

export type ReactChildrenProps = {
  children?: ReactNode | ReactNode[];
};

export type SelectIndexSignature = {
  [key: string]: (selected: string | string[]) => void;
};

export type SelectProps = {
  fields: string[];
  handler: (name: string, selected: string[] | string) => void;
  label: string;
  name: string;
  sx?: SxProps;
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
