import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { FC } from "react";
import type { SelectType } from "types";
import { v4 as uuid } from "uuid";

type BasicSelectType = {
  selected: string;
} & SelectType;

export const BasicSelect: FC<BasicSelectType> = ({
  error,
  fields,
  handler,
  helperText,
  label,
  name,
  selected,
  sx
}) => {
  const handleChange = ({ target }: SelectChangeEvent) => {
    const { value } = target;
    handler(name, value);
  };

  return (
    <FormControl sx={sx} error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        input={<OutlinedInput label={label} />}
        label={label}
        name={name}
        onChange={handleChange}
        value={selected}
      >
        {fields.map(item => (
          <MenuItem key={uuid()} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
