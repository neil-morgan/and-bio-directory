import { Button, Typography, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MultiSelect } from "components/common";
import { useState } from "react";
import type { FC } from "react";

export const Search: FC = () => {
  const [traits, setTraits] = useState<string[]>([]);
  const [toolkit, setToolkit] = useState<string[]>([]);

  return (
    <SearchWrapper>
      <Typography variant="h5">Explore our ANDi's</Typography>
      <TextField
        label="Search term"
        name="searchTerm"
        size="medium"
        sx={inputProps}
      />
      <MultiSelect
        fields={["React", "Javascript", "Typescript", "GraphQL"]}
        label="Skills"
        setState={setToolkit}
        state={toolkit}
        sx={inputProps}
      />
      <MultiSelect
        fields={["Approachable", "Progressive", "Ambitious", "Thoughtful"]}
        label="Traits"
        setState={setTraits}
        state={traits}
        sx={inputProps}
      />

      <Button variant="contained" size="large" sx={inputProps}>
        ANDi Search
      </Button>
    </SearchWrapper>
  );
};

const SearchWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  borderRadius: 5,
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2)
}));

const inputProps = {
  mt: 2
};
