import { useQuery } from "@apollo/client";
import { Typography, Button, TextField, CircularProgress } from "@mui/material";
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
  searchRoleOptions,
  searchSeniorityOptions
} from "utils";
import { v4 as uuid } from "uuid";

type SearchType = {
  [key: number]: { item: UserProps };
  length: number;
};

export const Search: FC = () => {
  const { data, loading } = useQuery(GET_USERS);
  const [searchResults, setSearchResults] = useState<SearchType>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [seniority, setSeniority] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [traits, setTraits] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  // ? maybe .flat() here?
  const searchIndex = [
    searchQuery,
    seniority,
    role,
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
    },
    role: selected => {
      if (typeof selected === "string") {
        setRole(selected);
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

  const handleFormReset = () => {
    setSearchQuery("");
    setSeniority("");
    setRole("");
    setTraits([]);
    setSkills([]);
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    const fuse = new Fuse(data.users, {
      threshold: 0.3, // https://fusejs.io/api/options.html#threshold
      keys: searchKeys
    });

    setSearchResults(fuse.search(searchIndex));
  }, [data, searchIndex, searchQuery, seniority, skills, traits]);

  const numOfResults = searchResults.length;

  return (
    <Wrapper>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Form>
            <Typography variant="h4" sx={headingStyles}>
              Explore our ANDi's
            </Typography>
            <TextField
              label="Query"
              onChange={handleInputChange}
              value={searchQuery}
              size="medium"
              sx={inputStyles}
            />

            <BasicSelect
              name="role"
              fields={searchRoleOptions}
              label="Role"
              selected={role}
              handler={handleSelectChange}
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
              sx={inputStyles}
            />
            {searchIndex.length > 0 && (
              <Button onClick={handleFormReset}>Reset all</Button>
            )}
          </Form>

          {searchIndex.length > 0 && numOfResults === 0 && (
            <Typography align="center">Sorry, no results found...</Typography>
          )}

          {numOfResults > 0 && Array.isArray(searchResults) && (
            <>
              <Typography sx={{ mb: 2 }}>
                Showing top {numOfResults >= 4 ? 4 : numOfResults} result
                {numOfResults > 1 && "s"}
              </Typography>
              {searchResults.slice(0, 4).map(props => (
                <UserItem key={uuid()} {...props.item} />
              ))}
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  maxWidth: 500,
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: theme.spacing(4),
  flexDirection: "column"
}));

const Form = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  width: "100%",
  marginBottom: theme.spacing(4)
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
