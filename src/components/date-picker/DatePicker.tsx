import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useConfig } from "@src/lib/hooks/useConfig";

function ControlledDatePicker({
  selectedDate,
  endDate,
  setSelectedDate,
  setEndDate,
  selectedCategory,
  setSelectedCategory,
}: any) {
  const { response: confResponse } = useConfig();
  const categories = confResponse?.categories || [];

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
      {/* <FormControl sx={{ flex: 1, minWidth: 120 }}> */}
      <Select
        sx={{ marginLeft: 2 }}
        size="small"
        value={selectedCategory}
        displayEmpty
        onChange={e => setSelectedCategory(e.target.value)}>
        <MenuItem value="" sx={{ color: "grey" }}>
          Ангилал
        </MenuItem>
        {categories.map((category: any) => (
          <MenuItem key={category.id} value={category.category_name}>
            {category.category_name}
          </MenuItem>
        ))}
      </Select>
      {/* </FormControl> */}
    </Box>
  );
}

export default ControlledDatePicker;
