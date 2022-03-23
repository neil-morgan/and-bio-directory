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
    <Wrapper sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={state}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={selected => (
          <ChipBox>
            {selected.map(value => (
              <Chip key={value} label={value} />
            ))}
          </ChipBox>
        )}
      >
        {fields.map(name => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </Wrapper>
  );
};

const Wrapper = styled(FormControl)(() => ({
  width: 300
}));

const ChipBox = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 0.5
}));
