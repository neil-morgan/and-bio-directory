import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { FC } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SideDrawer: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DrawerInternal>
          <Button
            component={Link}
            to="/users"
            onClick={() => {
              setOpen(false);
            }}
            color="inherit"
            size="large"
          >
            Users
          </Button>
        </DrawerInternal>
      </Drawer>
    </>
  );
};

const DrawerInternal = styled(Box)(({ theme }) => ({
  width: 300,
  padding: theme.spacing(2)
}));
