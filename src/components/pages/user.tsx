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
import { UserUpdate } from "components/views";
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
  const [deleteUser] = useMutation(DELETE_USER, updateUsers());
  const { data, loading } = useQuery(GET_USER, {
    variables: { id: userId }
  });

  const deleteRef = useRef(null);
  const popoverOpen = Boolean(anchorEl);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

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
      <Link to="/">
        <Typography>back</Typography>
      </Link>
      <Typography variant="h6">ID: {data.user.id}</Typography>
      <Typography variant="h4">{data.user.name}'s page</Typography>
      <Typography variant="subtitle2">{data.user.jobTitle}</Typography>

      <Button
        variant="contained"
        color="secondary"
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

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={modalBoxStyle}>
          <UserUpdate
            handleModalClose={handleModalClose}
            id={Number(userId)}
            name={data.user.name}
            jobTitle={data.user.jobTitle}
          />
        </Box>
      </Modal>
    </>
  );
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
