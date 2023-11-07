import { MenuItem, Select } from "@mui/material";
import { type SelectChangeEvent } from '@mui/material/Select';
import { useGetConfig } from "@src/lib/hooks/useConfig";

type Props = {
  companyId: string;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

function CategoryPicker({ companyId, selectedCategory, setSelectedCategory }: Props) {
  const { configs } = useGetConfig(companyId);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Select
      sx={{ marginLeft: 2 }}
      size="small"
      labelId="category-label"
      value={selectedCategory}
      displayEmpty
      onChange={handleChange}>
      <MenuItem value="" sx={{ color: "grey" }}>
        Ангилал
      </MenuItem>
      {configs.map((config: any) => (
        <MenuItem key={config.id} value={config.category_name}>
          {config.category_name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default CategoryPicker;
