import { Toolbar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SideDrawer } from "components/global";
import type { FC } from "react";
import { Link } from "react-router-dom";

export const Header: FC = () => (
  <AppBar>
    <Toolbar sx={{ width: "100%", justifyContent: "space-between" }}>
      <Button component={Link} to="/" color="inherit" size="large">
        ANDi Bio Directory
      </Button>
      <SideDrawer />
    </Toolbar>
  </AppBar>
);

const AppBar = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(4)
}));
