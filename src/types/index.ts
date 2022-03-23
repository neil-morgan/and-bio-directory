import type { ReactNode } from "react";

export type ReactChildrenProps = {
  children?: ReactNode | ReactNode[];
};

export type UserProps = {
  id?: number;
  name: string;
  role: string;
};
