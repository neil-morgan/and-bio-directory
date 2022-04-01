import type { SxProps } from "@mui/system";
import type { ReactNode } from "react";

type ErrorsObject<T> = Partial<Record<keyof T, string>>;

export type ReactChildrenType = {
  children?: ReactNode | ReactNode[];
};

export type SelectIndexSignature = {
  [key: string]: (selected: string | string[]) => void;
};

export type SelectType = {
  fields: string[];
  handler: (name: string, selected: string[] | string) => void;
  label: string;
  name: string;
  helperText?: string;
  sx?: SxProps;
  error?: boolean;
};

export type UserType = {
  id?: string;
  name: string;
  surname: string;
  role: string;
  seniority: string;
  skills: string[] | never[];
  traits: string[] | never[];
};

export type UserTypeErrors = ErrorsObject<UserType>;
