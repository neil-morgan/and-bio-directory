import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_NAME } from "api";
import type { FC } from "react";
import { useState } from "react";

export const Search: FC = () => {
  const [bioSearched, setBioSearched] = useState("");
  const [fetchBio, { data: fetchedBio, error: fetchBioError }] =
    useLazyQuery(GET_USER_BY_NAME);

  const handleSearch = () => {
    if (bioSearched === "") {
      return;
    }

    fetchBio({
      variables: {
        name: bioSearched,
      },
    });
  };

  return (
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
  );
};
