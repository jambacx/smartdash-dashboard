import { Box, MenuItem, Select } from "@mui/material";
import { type SelectChangeEvent } from '@mui/material/Select';
import CategoryPicker from "@src/components/common/category-picker";
import DatePicker from "@src/components/common/date-picker";

function Filter({
  companyId,
  selectedDate,
  endDate,
  setSelectedDate,
  setEndDate,
  selectedCategory,
  setSelectedCategory,
  filterType,
  setType,
}: any) {
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: 1,
        marginBottom: 4,
      }}>
      <CategoryPicker
        companyId={companyId}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Box width={12} />
      <Select
        size="small"
        labelId="option1-label"
        value={filterType}
        onChange={handleChange}>
        <MenuItem value="custom">Custom</MenuItem>
        <MenuItem value="daily">Өдрөөр</MenuItem>
        <MenuItem value="weekly">Долоо хоног</MenuItem>
        <MenuItem value="monthly">Сараар</MenuItem>
      </Select>
      <Box width={12} />
      {filterType === 'custom' && (
        <DatePicker
          startDate={selectedDate}
          endDate={endDate}
          setStartDate={setSelectedDate}
          setEndDate={setEndDate}
        />
      )}
    </Box >
  );
}

export default Filter;
