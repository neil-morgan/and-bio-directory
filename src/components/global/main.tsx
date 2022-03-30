import { Container } from "@mui/material";
import type { FC } from "react";
import type { ReactChildrenType } from "types";

export const Main: FC<ReactChildrenType> = ({ children }) => (
  <Container component="main" sx={mainStyle}>
    {children}
  </Container>
);

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1
};
