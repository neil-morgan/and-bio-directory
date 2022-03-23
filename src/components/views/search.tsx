import { Button, Typography, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BasicSelect, MultiSelect } from "components/common";
import { useState } from "react";
import type { FC } from "react";

export const Search: FC = () => {
  const [seniority, setSeniority] = useState<string>("");
  const [traits, setTraits] = useState<string[]>([]);
  const [toolkit, setToolkit] = useState<string[]>([]);

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
  backgroundColor: theme.palette.grey[100],
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
