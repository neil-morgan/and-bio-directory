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
import { ProductDeveloper, ProductAnalyst, UxUiDesigner } from "components/templates";
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

  const getProfile = (role: string) => {
    switch (true) {
      case role === "Product Developer":
        return <ProductDeveloper
          id={data.user.id}
          name={data.user.name}
          surname={data.user.surname}
          role={data.user.role}
          seniority={data.user.seniority}
          skills={data.user.skills}
          traits={data.user.traits}
        />
      case role === "Product Analyst":
        return <ProductAnalyst
          id={data.user.id}
          name={data.user.name}
          surname={data.user.surname}
          role={data.user.role}
          seniority={data.user.seniority}
          skills={data.user.skills}
          traits={data.user.traits}
        />
      // case role === "designer":
      //   return <UxUiDesigner
      //     id={data.user.id}
      //     name={data.user.name}
      //     surname={data.user.surname}
      //     role={data.user.role}
      //   />
    }
  }

  return loading ? (
    <CircularProgress />
  ) : (
    <>
      <Link to="/users">
        <Typography>back</Typography>
      </Link>

      {getProfile(data.user.role)}

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
            <UserUpdate handleModalClose={handleModalClose} {...data.user} />
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
