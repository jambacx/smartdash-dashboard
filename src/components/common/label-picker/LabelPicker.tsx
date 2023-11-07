import { Box, MenuItem, Select } from "@mui/material";
import { LABELS } from "@src/utilities/constants";
import { type SelectChangeEvent } from '@mui/material/Select';

type Props = {
  selectedLabel: string;
  setSelectedLabel: (value: string) => void;
};

function LabelPicker({ selectedLabel, setSelectedLabel }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedLabel(event.target.value);
  };

  return (
    <Select
      sx={{ marginLeft: 2 }}
      size="small"
      labelId="category-label"
      value={selectedLabel}
      displayEmpty
      onChange={handleChange}>
      <MenuItem value="" sx={{ color: "grey" }}>
        Төрөл
      </MenuItem>
      {LABELS.map((label: any) => (
        <MenuItem key={label.id} value={label.id}>
          {label.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default LabelPicker;
