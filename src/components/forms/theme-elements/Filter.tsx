import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, MenuItem, Select, FormControl } from "@mui/material";
import { useConfig } from "@src/lib/hooks/useConfig";

function Filter({
  selectedDate,
  endDate,
  setSelectedDate,
  setEndDate,
  selectedCategory,
  setSelectedCategory,
  filterType,
  setType,
}: any) {
  const { response: confResponse } = useConfig();
  const categories = confResponse?.categories || [];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 1,
        marginBottom: 4,
      }}>
      <FormControl sx={{ flex: 1, minWidth: 120 }}>
        <Select
          size="small"
          labelId="category-label"
          displayEmpty
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}>
          <MenuItem value="" sx={{ color: "grey" }}>
            Ангилалаа сонгоно уу
          </MenuItem>
          {categories.map((category: any) => (
            <MenuItem key={category.id} value={category.category_name}>
              {category.category_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{
          marginLeft: 2,
          flex: 1,
          minWidth: 120,
          marginRight: 2,
        }}>
        <Select
          size="small"
          labelId="option1-label"
          value={filterType}
          onChange={e => setType(e.target.value)}>
          <MenuItem value="custom">Хугацаа сонгох</MenuItem>
          <MenuItem value="daily">Өдрөөр</MenuItem>
          <MenuItem value="weekly">Долоо хоног</MenuItem>
          <MenuItem value="monthly">Сараар</MenuItem>
        </Select>
      </FormControl>
      {
        filterType === "custom" ?
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
                flex: 1,
              }}
              label="Эхлэх хугацаа"
              value={selectedDate}
              onChange={(newValue: any) => setSelectedDate(newValue)}
              format="yyyy-MM-dd"
            />
            <DatePicker
              slotProps={{ textField: { size: "small", error: false } }}
              sx={{
                flex: 1,
              }}
              label="Дуусах хугацаа"
              value={endDate}
              onChange={(newValue: any) => setEndDate(newValue)}
              format="yyyy-MM-dd"
            />
          </LocalizationProvider>
          : <> <Box sx={{
            flex: 1,
          }} />
            <Box sx={{
              flex: 1,
            }} />
          </>
      }
    </Box >
  );
}

export default Filter;
