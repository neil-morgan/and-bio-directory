import { Box, Button, Typography, Modal } from "@mui/material";
import { grey } from "@mui/material/colors";
import { UserCreate } from "components/views";
import type { FC } from "react";
import { useState } from "react";
import { modalBoxStyle } from "theme";
import type { UsersProps } from "types";

export const Users: FC<UsersProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={usersBox}>
        <Typography sx={usersTitle} variant="h5">
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
      </Box>

      <Modal open={open} onClose={handleModalClose}>
        <Box sx={modalBoxStyle}>
          <UserCreate handleModalClose={handleModalClose} />
        </Box>
      </Modal>
    </>
  );
};

const usersBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  p: 2,
  bgcolor: grey[50],
  my: 2,
  borderRadius: 2
};

const usersTitle = {
  mb: 2,
  width: "100%",
  textAlign: "center"
};

const newUserButton = {
  mt: 2
};
