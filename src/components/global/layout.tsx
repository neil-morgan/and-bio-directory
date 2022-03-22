import type { FC } from "react";
import type { ReactChildrenProps } from "types";

import { Header, Footer, Main } from ".";

export const Layout: FC<ReactChildrenProps> = ({ children }) => (
  <>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </>
);
