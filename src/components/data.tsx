import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import type { FC } from "react";
import { v4 as uuid } from "uuid";

import {
  CREATE_USER_MUTATION,
  GET_USER_BY_NAME,
  QUERY_ALL_USERS,
} from "../api";

type User = {
  name: string;
  id: number;
};

export const Data: FC = () => {
  const [bioSearched, setBioSearched] = useState("");

  const [name, setName] = useState("");

  // useQuery gets data on load
  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);

  // useLazyQuery only fetch data on request
  const [fetchBio, { data: fetchedBio, error: fetchBioError }] =
    useLazyQuery(GET_USER_BY_NAME);

  // useMutation returns a function
  const [createUser] = useMutation(CREATE_USER_MUTATION);

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

        <button
          type="button"
          onClick={() => {
            createUser({
              variables: {
                input: { name },
              },
            });

            refetch();
          }}
        >
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

        <button
          type="button"
          onClick={() => {
            fetchBio({
              variables: {
                name: bioSearched,
              },
            });
          }}
        >
          Search
        </button>
        <div>
          {fetchedBio && <div>Result found: {fetchedBio.userByName.name}</div>}
          {fetchBioError && <h1> There was an error fetching the data</h1>}
        </div>
      </div>

      {data?.users.map((user: User) => (
        <div key={uuid()}>name: {user.name}</div>
      ))}
    </div>
  );
};
