import type { ReactNode } from "react";

export type UserProps = {
  name: string;
  id: number;
  jobTitle: string;
};

export type UsersProps = {
  children?: ReactNode | ReactNode[];
};
