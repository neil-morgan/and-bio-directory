import type { ReactNode } from "react";

export type UserProps = {
  name: string;
  id: number;
};

export type UsersProps = {
  children?: ReactNode | ReactNode[];
};
