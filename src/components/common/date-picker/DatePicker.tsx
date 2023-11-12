import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ACCEPTABLE_MONTH_LIMIT } from "@src/utilities/constants";
import { getMonthDifference, toast } from "@src/utilities";
import { Box } from "@mui/material";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (value: Date) => void;
  setEndDate: (value: Date) => void;
};

function ControlledDatePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: Props) {
  const onChangeStartDate = (value: Date | null) => {
    if (!value || !endDate) return;

    if (ACCEPTABLE_MONTH_LIMIT < getMonthDifference(value, endDate)) {
      // Set start date to yesterday
      const date = new Date();
      date.setDate(date.getDate() - 1)
      setStartDate(date)

      return toast('error', '3 сараас хэтэрч болохгүй');
    }


    setStartDate(value);
  };

  const onChangeEndDate = (value: Date | null) => {
    if (!value || !startDate) return;

    if (ACCEPTABLE_MONTH_LIMIT < getMonthDifference(value, startDate)) {
      setEndDate(new Date())
      return toast('error', '3 сараас хэтэрч болохгүй');
    }

    setEndDate(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        slotProps={{
          textField: {
            size: "small",
            error: false,
          },
        }}
        label="Эхлэх хугацаа"
        value={startDate}
        onChange={onChangeStartDate}
        format="yyyy-MM-dd"
        disableFuture={true}
      />
      <Box width={12} />
      <DatePicker
        slotProps={{ textField: { size: "small", error: false } }}
        label="Дуусах хугацаа"
        value={endDate}
        onChange={onChangeEndDate}
        format="yyyy-MM-dd"
        disableFuture={true}
      />
    </LocalizationProvider>
  );
}

export default ControlledDatePicker;
