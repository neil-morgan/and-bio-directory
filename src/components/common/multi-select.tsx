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
import type { FC } from "react";
import type { SelectProps } from "types";
import { v4 as uuid } from "uuid";

type MultiSelectProps = {
  selected: string[];
} & SelectProps;

export const MultiSelect: FC<MultiSelectProps> = ({
  fields,
  handler,
  label,
  name,
  selected,
  sx
}) => {
  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value }
    } = event;

    handler(name, typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        multiple
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={selected => (
          <ChipBox>
            {selected.length > 0 &&
              selected.map(value => (
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
