import type { ReactNode } from "react";

export type ReactChildrenProps = {
  children?: ReactNode | ReactNode[];
};

export type UserProps = {
  id?: string;
  name: string;
  surname: string;
  role: string;
};
