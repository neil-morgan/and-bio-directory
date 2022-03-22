import type { ReactNode } from "react";

export type UserProps = {
  id?: number;
  name: string;
  jobTitle: string;
};

export type UsersProps = {
  children?: ReactNode | ReactNode[];
};
