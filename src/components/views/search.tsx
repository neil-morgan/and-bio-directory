import { useQuery } from "@apollo/client";
import { Typography, TextField, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GET_USERS } from "api";
import { BasicSelect, MultiSelect } from "components/common";
import { UserItem } from "components/views";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import type { FC } from "react";
import type { UserProps, SelectIndexSignature } from "types";
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

// ! Seniority needs a required check

export const Search: FC = () => {
  const { data, loading } = useQuery(GET_USERS);
  const [searchResults, setSearchResults] = useState<SearchProps>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [seniority, setSeniority] = useState<string>("");
  const [traits, setTraits] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  // ? maybe .flat() here?
  const searchIndex = [
    searchQuery,
    seniority,
    traits.join(" "),
    skills.join(" ")
  ]
    .join(" ")
    .trim();

  const selectedIndex: SelectIndexSignature = {
    traits: selected => {
      if (Array.isArray(selected)) {
        setTraits(selected);
      }
    },
    skills: selected => {
      if (Array.isArray(selected)) {
        setSkills(selected);
      }
    },
    seniority: selected => {
      if (typeof selected === "string") {
        setSeniority(selected);
      }
    }
  };

  const handleInputChange = (event: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectChange = (name: string, selected: string[] | string) => {
    selectedIndex[name](selected);
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    const fuse = new Fuse(data.users, {
      threshold: 0.5, // https://fusejs.io/api/options.html#threshold
      keys: searchKeys
    });

    setSearchResults(fuse.search(searchIndex));
  }, [data, searchIndex, searchQuery, seniority, skills, traits]);

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
        name="skills"
        fields={searchSkillsOptions}
        label="Skills"
        handler={handleSelectChange}
        selected={skills}
        sx={inputStyles}
      />

      <MultiSelect
        name="traits"
        fields={searchTraitsOptions}
        label="Traits"
        handler={handleSelectChange}
        selected={traits}
        sx={inputStyles}
      />

      <BasicSelect
        name="seniority"
        fields={searchSeniorityOptions}
        label="Seniority"
        selected={seniority}
        handler={handleSelectChange}
        sx={{ ...inputStyles, minWidth: 120 }}
      />

      {searchIndex.length > 0 && searchResults.length === 0 && (
        <Typography>Sorry, no results found</Typography>
      )}

      {searchResults.length > 0 &&
        Array.isArray(searchResults) &&
        searchResults
          .slice(0, 4)
          .map(props => <UserItem key={uuid()} {...props.item} />)}
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
