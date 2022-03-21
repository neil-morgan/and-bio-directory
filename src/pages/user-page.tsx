import type { FC, MouseEvent } from "react";
import { useState } from "react";

import { useMutation } from "@apollo/client";
import { DELETE_USER, GET_USER } from "api";
import { updateUsers } from "utils";
import { useQuery } from "@apollo/client";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Popover,
  CircularProgress,
} from "@mui/material";

export const UserPage: FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const { loading, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  const [deleteUser] = useMutation(DELETE_USER, updateUsers());

  const handleDeleteUser = (id: number) => {
    deleteUser({
      variables: {
        id,
      },
    });
  };

  return loading ? (
    <CircularProgress />
  ) : (
    <Box sx={wrapper}>
      <Link to={"/"}>
        <Typography>back</Typography>
      </Link>
      <Typography variant="h6">ID: {data.user.id}</Typography>
      <Typography variant="h4">{data.user.name}'s page</Typography>

      <Button variant="contained" onClick={handleClick}>
        Delete User
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Box sx={popover}>
          <Typography sx={popoverTitle} variant="h6">
            Are you sure?
          </Typography>
          <Button variant="outlined" onClick={handleClose}>
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
  );
};

const wrapper = {
  display: "flex",
  flexDirection: "column",
};

const popover = {
  p: 2,
};

const popoverTitle = {
  mb: 2,
  textAlign: "center",
};

const button = {
  ml: 2,
};
