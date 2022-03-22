import { Box, Container } from "@mui/material";
import type { FC } from "react";

export const Footer: FC = () => (
  <Box component="footer" sx={footerStyle}>
    <Container>FOOTER</Container>
  </Box>
);

const footerStyle = {
  width: "100%",
  p: 1
};
