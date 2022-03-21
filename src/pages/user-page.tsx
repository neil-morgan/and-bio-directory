import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Popover,
  Typography
} from "@mui/material";
import { DELETE_USER, GET_USER } from "api";
import { UserUpdate } from "components";
import type { FC } from "react";
import { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { modalBoxStyle } from "theme";
import { updateUsers } from "utils";

export const UserPage: FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const deleteRef = useRef(null);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? "simple-popover" : undefined;
  const { loading, data } = useQuery(GET_USER, {
    variables: { id: userId }
  });

  const [deleteUser] = useMutation(DELETE_USER, updateUsers());

  const handleDeleteUser = (id: number) => {
    deleteUser({
      variables: {
        id
      }
    });
  };

  return loading ? (
    <CircularProgress />
  ) : (
    <>
      <Box sx={wrapper}>
        <Link to="/">
          <Typography>back</Typography>
        </Link>
        <Typography variant="h6">ID: {data.user.id}</Typography>
        <Typography variant="h4">{data.user.name}'s page</Typography>

        <Button
          variant="contained"
          onClick={() => {
            handleModalOpen();
          }}
        >
          Update User
        </Button>

        <Button
          ref={deleteRef}
          variant="contained"
          color="error"
          onClick={() => {
            setAnchorEl(deleteRef.current);
          }}
        >
          Delete User
        </Button>
        <Popover
          id={id}
          open={popoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
        >
          <Box sx={popover}>
            <Typography sx={popoverTitle} variant="h6">
              Are you sure?
            </Typography>
            <Button variant="outlined" onClick={handlePopoverClose}>
              Cancel
            </Button>
            <Button
              sx={button}
              variant="contained"
              color="error"
              onClick={() => {
                handleDeleteUser(data.user.id);
                navigate("/");
              }}
            >
              Delete
            </Button>
          </Box>
        </Popover>
      </Box>

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={modalBoxStyle}>
          <UserUpdate />
        </Box>
      </Modal>
    </>
  );
};

const wrapper = {
  display: "flex",
  flexDirection: "column"
};

const popover = {
  p: 2
};

const popoverTitle = {
  mb: 2,
  textAlign: "center"
};

const button = {
  ml: 2
};
