import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, MenuItem, Select } from "@mui/material";
import { ACCEPTABLE_MONTH_LIMIT } from "@src/utilities/constants";
import { getMonthDifference, toast } from "@src/utilities";

const categories = [
  { id: 'positive', name: 'Эерэг' },
  { id: 'negative', name: 'Сөрөг' },
  { id: 'neutral', name: 'Ерөнхий' },
];

function ControlledDatePicker({
  selectedDate,
  endDate,
  setSelectedDate,
  setEndDate,
  selectedCategory,
  setSelectedCategory,
}: any) {
  const onChangeSelectedDate = (value: Date | null) => {
    if (!value) return;

    if (ACCEPTABLE_MONTH_LIMIT < getMonthDifference(value, endDate)) {
      setSelectedDate(new Date())
      return toast('error', '3 сараас хэтэрч болохгүй');
    }


    setSelectedDate(value);
  };

  const onChangeEndDate = (value: Date | null) => {
    if (!value) return;

    if (ACCEPTABLE_MONTH_LIMIT < getMonthDifference(value, selectedDate)) {
      setEndDate(new Date())
      return toast('error', '3 сараас хэтэрч болохгүй');
    }

    setEndDate(value);
  };

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
          label="Эхлэх хугацаа"
          value={selectedDate}
          onChange={onChangeSelectedDate}
          format="yyyy-MM-dd"
        />
        <DatePicker
          slotProps={{ textField: { size: "small", error: false } }}
          label="Дуусах хугацаа"
          value={endDate}
          onChange={onChangeEndDate}
          format="yyyy-MM-dd"
          disableFuture={true}
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
