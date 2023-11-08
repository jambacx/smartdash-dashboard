import { MenuItem, Select } from "@mui/material";
import { type SelectChangeEvent } from '@mui/material/Select';
import { type Config } from "@src/interfaces/category";
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
      size="small"
      labelId="category-label"
      value={selectedCategory}
      displayEmpty
      onChange={handleChange}>
      <MenuItem value="" sx={{ color: "grey" }}>
        Ангилал
      </MenuItem>
      {configs.map((config: Config) => (
        <MenuItem key={config.id} value={config.category_name}>
          {config.category_name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default CategoryPicker;
