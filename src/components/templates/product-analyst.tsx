import { Typography } from "@mui/material";
import type { FC } from "react";
import type { UserType } from "types";

export const ProductAnalyst: FC<UserType> = ({
    id,
    name,
    surname,
    role,
    seniority,
    skills,
    traits
}) => (
    <>
        <Typography variant="h6">ID: {id}</Typography>
        <Typography variant="h4">
            {name} {surname}'s page
        </Typography>
        <Typography variant="subtitle2">{role}</Typography>
    </>
);
