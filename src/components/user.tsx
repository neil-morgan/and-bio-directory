import type { FC } from "react";
import type { UserProps } from "types";

import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Box, Link as MuiLink, Typography } from "@mui/material";

export const User: FC<UserProps> = ({ name, id }) => {
  return (
    <Box key={uuid()} sx={wrapper}>
      <Typography>
        id: {id} - name: {name}
      </Typography>

      <Link to={`/${id}`}>
        <MuiLink sx={link}>See more</MuiLink>
      </Link>
    </Box>
  );
};

const wrapper = {
  display: "flex",
  mb: 2,
};

const link = {
  ml: 1,
};
