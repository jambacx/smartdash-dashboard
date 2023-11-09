import { useTheme } from "@mui/material/styles";
import DashboardCard from "@components/shared/DashboardCard";
import dynamic from "next/dynamic";
import { formatDates } from "./lastMonths";
const Chart = dynamic(async () => await import("react-apexcharts"), {
  ssr: false,
});

const SalesOverview = ({ chartData }: { chartData: any }) => {
  const theme = useTheme();

  const seriescolumnchart: any = [
    {
      name: "Эерэг",
      data: [],
    },
    {
      name: "Ерөнхий",
      data: [],
    },
    {
      name: "Сөрөг",
      data: [],
    },
  ];

  chartData?.forEach((data: any) => {
    data?.items?.forEach((item: number, index: number) => {
      seriescolumnchart[index]?.data?.push(item);
    });
  });

  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: ["#15D9B1", "#4F78F8", "#DA6E54"],
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top'
        },
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },

    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toString();
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#CCCCCC"]
      },
      position: 'top'
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: chartData.map((data: any) => formatDates(data.date)),
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };

  return (
    <DashboardCard title="Сэтгэгдэл ангилал" subtitle="Тоогоор">
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="bar"
        height="370px"
      />
    </DashboardCard>
  );
};

export default SalesOverview;
