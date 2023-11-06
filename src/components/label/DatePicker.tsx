import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, MenuItem, Select } from "@mui/material";
import { useConfig } from "@src/lib/hooks/useConfig";

function ControlledDatePicker({
  selectedDate,
  endDate,
  setSelectedDate,
  setEndDate,
  selectedCategory,
  setSelectedCategory,
}: any) {

  const categories = [
    { id: 'positive', name: 'Эерэг' },
    { id: 'negative', name: 'Сөрөг' },
    { id: 'neutral', name: 'Ерөнхий' },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: 1,
        marginBottom: 4,
      }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          slotProps={{
            textField: {
              size: "small",
              error: false,
            },
          }}
          sx={{
            marginRight: 2,
          }}
          label="Дуусах хугацаа"
          value={selectedDate}
          onChange={(newValue: any) => setSelectedDate(newValue)}
          format="yyyy-MM-dd"
        />
        <DatePicker
          slotProps={{ textField: { size: "small", error: false } }}
          label="Эхлэх хугацаа"
          value={endDate}
          onChange={(newValue: any) => setEndDate(newValue)}
          format="yyyy-MM-dd"
        />
      </LocalizationProvider>
      <Select
        sx={{ marginLeft: 2 }}
        size="small"
        labelId="category-label"
        value={selectedCategory}
        displayEmpty
        onChange={e => setSelectedCategory(e.target.value)}>
        <MenuItem value="" sx={{ color: "grey" }}>
          Төрөл
        </MenuItem>
        {categories.map((category: any) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default ControlledDatePicker;
