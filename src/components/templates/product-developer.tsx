import { Typography } from "@mui/material";
import type { FC } from "react";
import type { UserProps } from "types";

export const ProductDeveloper: FC<UserProps> = ({
  id,
  name,
  surname,
  role,
  seniority,
}) => (
  <>
    <Typography variant="h6">ID: {id}</Typography>
    <Typography variant="h4">
      {name} {surname}'s page
    </Typography>
    <Typography variant="subtitle2">{role}</Typography>
    <Typography variant="subtitle2">{seniority}</Typography>
  </>
);
