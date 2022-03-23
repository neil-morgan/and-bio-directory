import { styled } from "@mui/material/styles";
import type { FC } from "react";
import type { ReactChildrenProps } from "types";

import { Header, Footer, Main } from ".";

export const Layout: FC<ReactChildrenProps> = ({ children }) => (
  <Wrapper>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </Wrapper>
);

const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh"
}));
