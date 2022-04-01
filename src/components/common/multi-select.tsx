import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  FormHelperText
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import type { FC } from "react";
import type { SelectType } from "types";
import { v4 as uuid } from "uuid";

type MultiSelectType = {
  selected: string[];
} & SelectType;

export const MultiSelect: FC<MultiSelectType> = ({
  error,
  fields,
  handler,
  helperText,
  label,
  name,
  selected,
  sx
}) => {
  const handleChange = ({ target }: SelectChangeEvent<typeof selected>) => {
    const { value } = target;
    handler(name, typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={sx} error={error}>
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
              Array.isArray(selected) &&
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
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

const ChipBox = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap"
}));
