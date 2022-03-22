import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Search } from "components/views";
import type { FC } from "react";

export const Header: FC = () => (
  <AppBar position="static" sx={{ mb: 4 }}>
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        ANDi Bio Directory
      </Typography>
      <Search />
    </Toolbar>
  </AppBar>
);
