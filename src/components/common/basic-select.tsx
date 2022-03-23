import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { SxProps } from "@mui/system";
import { useState } from "react";
import type { FC } from "react";

type BasicSelectProps = {
  label: string;
  sx?: SxProps;
};

export const BasicSelect: FC<BasicSelectProps> = ({ sx, label }) => {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={sx}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          input={<OutlinedInput label={label} />}
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
