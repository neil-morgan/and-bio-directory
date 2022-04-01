import { styled } from "@mui/material/styles";
import type { FC } from "react";
import type { ReactChildrenType } from "types";

import { Header, Main } from ".";

export const Layout: FC<ReactChildrenType> = ({ children }) => (
  <Wrapper>
    <Header />
    <Main>{children}</Main>
    {/* <Footer /> */}
  </Wrapper>
);

const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh"
}));
