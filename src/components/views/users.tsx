import { Box, Button, Typography, Modal } from "@mui/material";
import { styled } from "@mui/material/styles";
import { UserCreate } from "components/views";
import type { FC } from "react";
import { useState } from "react";
import { modalBoxStyle } from "theme";
import type { ReactChildrenProps } from "types";

export const Users: FC<ReactChildrenProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <UsersBox>
        <Typography sx={usersTitle} variant="h4">
          All users
        </Typography>
        {children}
        <Button
          onClick={handleModalOpen}
          variant="contained"
          size="small"
          sx={newUserButton}
        >
          Add new user
        </Button>
      </UsersBox>

      <Modal open={open} onClose={handleModalClose}>
        <Box sx={modalBoxStyle}>
          <UserCreate handleModalClose={handleModalClose} />
        </Box>
      </Modal>
    </>
  );
};

const UsersBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  borderRadius: 5,
  backgroundColor: theme.palette.grey[50],
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

const usersTitle = {
  mb: 2,
  width: "100%",
  textAlign: "center"
};

const newUserButton = {
  mt: 2
};
