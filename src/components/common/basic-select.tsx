import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { FC } from "react";
import type { SelectProps } from "types";
import { v4 as uuid } from "uuid";

type BasicSelectProps = {
  selected: string;
} & SelectProps;

export const BasicSelect: FC<BasicSelectProps> = ({
  fields,
  handler,
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
    <FormControl sx={sx}>
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
    </FormControl>
  );
};
