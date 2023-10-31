import moment from "moment";

export const getLastThreeMonths = () => {
  const months = [];
  for (let i = 0; i < 3; i++) {
    const month = moment().subtract(i, "months").format("MMMM YYYY");
    months.push({label: month, value: i + 1});
  }
  return months.reverse();
};

export const formatDates = (dateStr: string) => {
  const dates = dateStr.split("~");
  return dates
    .map(date => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [year, month, day] = date.split("-");
      return `${month}-${day}`;
    })
    .join(" - ");
};
