import { useQuery } from "@apollo/client";
import { Button, Typography, TextField, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GET_USERS } from "api";
import { BasicSelect, MultiSelect } from "components/common";
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

type SearchProps = {
  [key: number]: { item: UserProps };
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

  const handleSelectChange = (name: string, selection: string[]) => {
    const index: SelectIndexSignature = {
      traits: () => {
        setTraits(selection);
      },
      skills: () => {
        setSkills(selection);
      }
    };
    index[name]();
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
    ].join(" ");

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
        fields={searchSeniorityOptions}
        label="Seniority"
        state={seniority}
        setState={setSeniority}
        sx={{ ...inputStyles, minWidth: 120 }}
      />

      <Button variant="contained" size="large" sx={buttonStyles}>
        ANDi Search
      </Button>
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

const buttonStyles = {
  marginLeft: "auto",
  marginRight: "auto",
  my: 1
};

const inputStyles = {
  width: "100%",
  mb: 2,
  "&:first-of-type": {
    mt: 2
  }
};
