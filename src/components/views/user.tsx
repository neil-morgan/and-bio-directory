import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { FC } from "react";
import { Link } from "react-router-dom";
import type { UserProps } from "types";

export const User: FC<UserProps> = ({ name, role, id }) => (
  <Wrapper to={`/${id}`}>
    <Box>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="subtitle2">{role}</Typography>{" "}
    </Box>
    <ArrowForwardIcon fontSize="small" />
  </Wrapper>
);

const Wrapper = styled(Link)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  paddingTop: theme.spacing(1 / 2),
  paddingBottom: theme.spacing(1 / 2),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  color: theme.palette.grey[700],
  backgroundColor: theme.palette.grey[100],
  borderRadius: 1,
  textDecoration: "none",
  transition: "ease 250ms",

  "&:hover": {
    color: theme.palette.secondary.main
  }
}));
