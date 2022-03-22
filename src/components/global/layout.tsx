import type { FC, ReactNode } from "react";

import { Header } from "./header";

export type LayoutProps = {
  children?: ReactNode | ReactNode[];
};

export const Layout: FC<LayoutProps> = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
    {/* footer */}
  </div>
);
