import { Box, Button, Typography, Modal } from "@mui/material";
import { styled } from "@mui/material/styles";
import { UserCreate } from "components/views";
import type { FC } from "react";
import { useState } from "react";
import { modalBoxStyle } from "theme";
import type { ReactChildrenProps } from "types";

export const UsersList: FC<ReactChildrenProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Wrapper>
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
      </Wrapper>

      <Modal open={open} onClose={handleModalClose}>
        <Box sx={modalBoxStyle}>
          <UserCreate handleModalClose={handleModalClose} />
        </Box>
      </Modal>
    </>
  );
};

const Wrapper = styled("div")(({ theme }) => ({
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
