import type { Reference, StoreObject } from "@apollo/client";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { Box } from "@mui/material";
import { CREATE_USER, DELETE_USER, GET_USER_BY_NAME, GET_USERS } from "api";
import { useState } from "react";
import type { FC } from "react";
import { v4 as uuid } from "uuid";

type User = {
  name: string;
  id: number;
};

export const Data: FC = () => {
  const [bioSearched, setBioSearched] = useState("");

  const [name, setName] = useState("");

  // useQuery gets data on load
  const { data, loading, refetch } = useQuery(GET_USERS);

  // useLazyGET only fetch data on request
  const [fetchBio, { data: fetchedBio, error: fetchBioError }] =
    useLazyQuery(GET_USER_BY_NAME);

  // useMutation returns a function
  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleCreateUser = () => {
    if (name === "") {
      return;
    }
    createUser({
      variables: {
        input: { name },
      },
    });
    refetch();
  };

  const handleDeleteUser = (id: number) => {
    deleteUser({
      variables: {
        deleteUserId: id,
      },
      update(cache) {
        cache.modify({
          fields: {
            users(refs, { readField }) {
              return refs.filter(
                (ref: Reference | StoreObject | undefined) =>
                  id !== readField("id", ref)
              );
            },
          },
        });
      },
    });
  };

  const handleSearch = () => {
    if (bioSearched === "") {
      return;
    }
    fetchBio({
      variables: {
        name: bioSearched,
      },
    });

    refetch();
  };

  if (loading) {
    return <span>loading</span>;
  }

  return (
    <div>
      <div>
        <label htmlFor="name">add user</label>
        <input
          name="name"
          aria-label="Name"
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <button type="button" onClick={handleCreateUser}>
          Create User
        </button>
      </div>

      <div>
        <label htmlFor="search">search user</label>
        <input
          aria-label="Search"
          type="text"
          name="search"
          placeholder="Name..."
          onChange={(event) => {
            setBioSearched(event.target.value);
          }}
        />

        <button type="button" onClick={handleSearch}>
          Search
        </button>
        <div>
          {fetchedBio && <div>Result found: {fetchedBio.userByName.name}</div>}
          {fetchBioError && <div> There was an error fetching the data</div>}
        </div>
      </div>

      {data?.users.map((user: User) => (
        <Box
          key={uuid()}
          sx={{
            display: "flex",
          }}
        >
          <div>
            id: {user.id} - name: {user.name}
          </div>
          <button
            type="button"
            onClick={() => {
              handleDeleteUser(user.id);
            }}
          >
            delete
          </button>
        </Box>
      ))}
    </div>
  );
};
