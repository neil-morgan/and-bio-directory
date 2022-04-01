import { Box, Typography, styled, Grid } from "@mui/material";
import { fontWeight } from "@mui/system";
import type { FC } from "react";
import type { UserType } from "types";

export const ProductDeveloper: FC<UserType> = ({
  id,
  name,
  surname,
  role,
  seniority,
  skills,
  traits
}) => (
  <>
    {/* <Typography variant="h6">ID: {id}</Typography>
    <Typography variant="h4">
      {name} {surname}'s page
    </Typography>
    <Typography variant="subtitle2">{role}</Typography>
 */}
    <Box>
      <Box sx={{
        fontSize: "48px",
        fontWeight: "bold",
      }}>{name} {surname}</Box>
      <StyledRole>{role} AND "Title"</StyledRole>
    </Box>
    <Grid container spacing={2}>
      <Grid background-color="#1f73c2" item xs={4}>
        ANDi Picture

      </Grid>
      <Grid item xs={8}>
        <StyledTitle>Experience</StyledTitle>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <StyledJob>Job</StyledJob>
            <StyledClient>Client</StyledClient>
          </Grid>
          <Grid item xs={6}>
            <StyledJob>Job</StyledJob>
            <StyledClient>Client</StyledClient>
          </Grid>

        </Grid>

      </Grid>
    </Grid>

  </>
);

const StyledName = styled('div')({
  fontSize: "48px",
  fontWeight: "bold",
});
const StyledRole = styled('div')({
  fontSize: "24px"
});

const StyledTitle = styled('div')({
  fontSize: "24px",
  fontWeight: "bold"
});

const StyledJob = styled('div')({
  fontSize: "16px"
});

const StyledClient = styled('div')({
  fontSize: "16px"
});