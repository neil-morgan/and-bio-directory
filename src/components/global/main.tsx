import { Container } from "@mui/material";
import type { FC } from "react";
import type { ReactChildrenProps } from "types";

export const Main: FC<ReactChildrenProps> = ({ children }) => (
  <Container component="main" sx={mainStyle}>
    {children}
  </Container>
);

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1
};
