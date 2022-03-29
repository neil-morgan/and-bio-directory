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
import { ProductDeveloper } from "components/templates";
import { UserUpdate } from "components/views";
import type { FC } from "react";
import { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { modalBoxStyle } from "theme";
import { refetchUsers } from "utils";

export const UserPage: FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteUser] = useMutation(DELETE_USER, refetchUsers());
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

      <ProductDeveloper
        id={data.user.id}
        name={data.user.name}
        surname={data.user.surname}
        role={data.user.role}
        seniority={data.user.seniority}
        skills={data.user.skills}
      />
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
              navigate("/users");
            }}
          >
            Delete
          </Button>
        </Box>
      </Popover>

      {userId && (
        <Modal open={modalOpen} onClose={handleModalClose}>
          <Box sx={modalBoxStyle}>
            <UserUpdate
              handleModalClose={handleModalClose}
              id={userId}
              name={data.user.name}
              surname={data.user.surname}
              role={data.user.role}
              seniority={data.user.seniority}
              skills={data.user.skills}
            />
          </Box>
        </Modal>
      )}
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
