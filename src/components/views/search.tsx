import { useQuery } from "@apollo/client";
import { Button, Typography, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GET_USERS } from "api";
import { BasicSelect, MultiSelect } from "components/common";
// import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import type { FC } from "react";
import type { UserProps } from "types";
import { v4 as uuid } from "uuid";

export const Search: FC = () => {
  const { data } = useQuery(GET_USERS);
  const [searchResults, setSearchResults] = useState([]);
  const [seniority, setSeniority] = useState<string>("");
  const [traits, setTraits] = useState<string[]>([]);
  const [toolkit, setToolkit] = useState<string[]>([]);

  // run a live search result feed here?
  // or click search and navigate to a new page?

  useEffect(() => {
    if (data) {
      setSearchResults(data.users);
    }
  }, [data]);

  return (
    <SearchWrapper>
      <Typography variant="h4" sx={headingStyles}>
        Explore our ANDi's
      </Typography>
      <TextField
        label="Search term"
        name="searchTerm"
        size="medium"
        sx={inputStyles}
      />
      <MultiSelect
        fields={["React", "Javascript", "Typescript", "GraphQL"]}
        label="Skills"
        setState={setToolkit}
        state={toolkit}
        sx={inputStyles}
      />
      <MultiSelect
        fields={["Approachable", "Progressive", "Ambitious", "Thoughtful"]}
        label="Traits"
        setState={setTraits}
        state={traits}
        sx={inputStyles}
      />
      <BasicSelect
        fields={["Associate", "Middle", "Senior", "Principle"]}
        label="Seniority"
        state={seniority}
        setState={setSeniority}
        sx={{ ...inputStyles, minWidth: 120 }}
      />

      <Button variant="contained" size="large" sx={buttonStyles}>
        ANDi Search
      </Button>

      {searchResults && (
        <div>
          {searchResults.map((user: UserProps) => (
            <div key={uuid()}>{user.name}</div>
          ))}
        </div>
      )}
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
