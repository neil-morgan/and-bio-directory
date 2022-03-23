import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import type { SxProps } from "@mui/system";
import type { FC } from "react";
import { v4 as uuid } from "uuid";

type MultiSelectProps = {
  fields: string[];
  label: string;
  setState: (selection: string[]) => void;
  state: string[];
  sx?: SxProps;
};

export const MultiSelect: FC<MultiSelectProps> = ({
  fields,
  label,
  setState,
  state,
  sx
}) => {
  const handleChange = (event: SelectChangeEvent<typeof state>) => {
    const {
      target: { value }
    } = event;
    setState(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={state}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={selected => (
          <ChipBox>
            {selected.map(value => (
              <Chip key={value} label={value} sx={{ mr: 0.5, my: 0.5 }} />
            ))}
          </ChipBox>
        )}
      >
        {fields.map(name => (
          <MenuItem key={uuid()} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const ChipBox = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap"
}));
