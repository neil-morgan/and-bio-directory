import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import type { FC } from "react";
import { Link } from "react-router-dom";
import type { UserProps } from "types";

export const User: FC<UserProps> = ({ name, jobTitle, id }) => {
  return (
    <MuiLink component={Link} sx={wrapper} to={`/${id}`}>
      <Box>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle2">{jobTitle}</Typography>{" "}
      </Box>
      <ArrowForwardIcon fontSize="small" />
    </MuiLink>
  );
};

const wrapper = {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 1,
  py: 1 / 2,
  px: 1,
  color: grey[700],
  bgcolor: grey[100],
  borderRadius: 1,
  textDecoration: "none",
  transition: "ease 250ms",
  "&:hover": {
    color: blue[500]
  }
};
