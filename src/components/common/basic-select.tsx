import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import type { SxProps } from "@mui/system";
import { useState } from "react";
import type { FC } from "react";

type BasicSelectProps = {
  sx?: SxProps;
};

export const BasicSelect: FC<BasicSelectProps> = ({ sx }) => {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={sx}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Seniority</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="associate">Associate</MenuItem>
          <MenuItem value="middle">Middle</MenuItem>
          <MenuItem value="senior">Senior</MenuItem>
          <MenuItem value="principle">Principle</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
