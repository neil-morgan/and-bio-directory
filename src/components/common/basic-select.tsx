import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { SxProps } from "@mui/system";
import type { FC } from "react";
import { v4 as uuid } from "uuid";

type BasicSelectProps = {
  fields: string[];
  label: string;
  setState: (selection: string) => void;
  state: string;
  sx?: SxProps;
};

export const BasicSelect: FC<BasicSelectProps> = ({
  fields,
  label,
  setState,
  state,
  sx
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  return (
    <FormControl sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        input={<OutlinedInput label={label} />}
        value={state}
        label={label}
        onChange={handleChange}
      >
        {fields.map(item => (
          <MenuItem key={uuid()} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
