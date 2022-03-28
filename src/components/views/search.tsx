import { useQuery } from "@apollo/client";
import { Typography, TextField, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GET_USERS } from "api";
import { BasicSelect, MultiSelect } from "components/common";
import { UserItem } from "components/views";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import type { FC } from "react";
import type { UserProps } from "types";
import {
  searchKeys,
  searchTraitsOptions,
  searchSkillsOptions,
  searchSeniorityOptions
} from "utils";
import { v4 as uuid } from "uuid";

type SearchProps = {
  [key: number]: { item: UserProps };
  length: number;
};

export const Search: FC = () => {
  const { data, loading } = useQuery(GET_USERS);
  const [searchResults, setSearchResults] = useState<SearchProps>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [seniority, setSeniority] = useState<string>("");
  const [traits, setTraits] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const handleInputChange = (event: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    const searchIndex = new Fuse(data.users, {
      includeScore: true, // https://fusejs.io/api/options.html#includescore
      keys: searchKeys
    });

    const searchMap = [
      searchQuery,
      seniority,
      traits.join(" "),
      skills.join(" ")
    ]
      .join(" ")
      .trim();

    setSearchResults(searchIndex.search(searchMap));
  }, [data, searchQuery, traits, seniority, skills]);

  return loading ? (
    <CircularProgress />
  ) : (
    <SearchWrapper>
      <Typography variant="h4" sx={headingStyles}>
        Explore our ANDi's
      </Typography>
      <TextField
        label="Query"
        onChange={handleInputChange}
        size="medium"
        sx={inputStyles}
      />
      <MultiSelect
        fields={searchSkillsOptions}
        label="Skills"
        setState={setSkills}
        state={skills}
        sx={inputStyles}
      />
      <MultiSelect
        fields={searchTraitsOptions}
        label="Traits"
        setState={setTraits}
        state={traits}
        sx={inputStyles}
      />
      <BasicSelect
        fields={searchSeniorityOptions}
        label="Seniority"
        state={seniority}
        setState={setSeniority}
        sx={{ ...inputStyles, minWidth: 120 }}
      />

      {searchResults.length > 0 &&
        Array.isArray(searchResults) &&
        searchResults.map(({ item }) => {
          const { id, name, surname, role } = item;
          return (
            <UserItem
              key={uuid()}
              name={name}
              surname={surname}
              role={role}
              id={id}
            />
          );
        })}
    </SearchWrapper>
  );
};

const SearchWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  width: 500,
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: theme.spacing(6),
  flexDirection: "column",
  alignItems: "flex-start",
  borderRadius: 5,
  padding: theme.spacing(2)
}));

const headingStyles = {
  width: "100%",
  textAlign: "center",
  py: 1
};

const inputStyles = {
  width: "100%",
  mb: 2,
  "&:first-of-type": {
    mt: 2
  }
};
