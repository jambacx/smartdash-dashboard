import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ACCEPTABLE_MONTH_LIMIT } from "@src/utilities/constants";
import { getMonthDifference, toast } from "@src/utilities";
import { Box } from "@mui/material";
import { start } from "nprogress";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (value: Date) => void;
  setEndDate: (value: Date) => void;
};

const isLessThanStartDate = (startDate: Date, endDate: Date): boolean => {
  return new Date(startDate) > new Date(endDate);
};

const isMoreThanEndDate = (startDate: Date, endDate: Date): boolean => {
  return new Date(startDate) > new Date(endDate);
};

const isSameDay = (startDate: Date, endDate: Date): boolean => {
  return (
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate()
  )
};

function ControlledDatePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: Props) {
  const onChangeStartDate = (value: Date | null) => {
    if (!value || !endDate) return;

    if (isMoreThanEndDate(value, endDate)) {
      const date = new Date(endDate);
      date.setDate(date.getDate() - 1)
      setStartDate(date)
      return toast('error', 'Уучлаарай эхлэх хугацаа дуусах хугацаанаас их байж болохгүй');
    }

    if (isSameDay(value, endDate)) {
      const date = new Date(value);
      date.setDate(date.getDate() - 1)
      setStartDate(date)
      return toast('error', 'Уучлаарай ижилхэн өдөр сонгож болохгүй');
    }

    if (ACCEPTABLE_MONTH_LIMIT < getMonthDifference(value, endDate)) {
      // Set start date to yesterday
      const date = new Date();
      date.setDate(date.getDate() - 1)
      setStartDate(date)

      return toast('error', 'Уучлаарай 3 сараас хэтэрч болохгүй');
    }


    setStartDate(value);
  };

  const onChangeEndDate = (value: Date | null) => {
    if (!value || !startDate) return;

    if (isSameDay(startDate, value)) {
      setEndDate(new Date())
      return toast('error', 'Уучлаарай ижилхэн өдөр сонгож болохгүй');
    }

    if (isLessThanStartDate(startDate, value)) {
      setEndDate(new Date())
      return toast('error', 'Уучлаарай дуусах хугацаа эхлэх хугацаанаас бага байж болохгүй');
    }

    if (ACCEPTABLE_MONTH_LIMIT < getMonthDifference(value, startDate)) {
      setEndDate(new Date())
      return toast('error', 'Уучлаарай 3 сараас хэтэрч болохгүй');
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
