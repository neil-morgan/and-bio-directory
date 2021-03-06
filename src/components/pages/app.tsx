import { Layout } from "components/global";
import { HomePage, UserPage, UsersPage } from "components/pages";
import type { FC } from "react";
import { Routes, Route } from "react-router-dom";

export const App: FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/:userId" element={<UserPage />} />
    </Routes>
  </Layout>
);
