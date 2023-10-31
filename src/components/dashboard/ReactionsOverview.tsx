import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const Chart = dynamic(async () => await import("react-apexcharts"), {
  ssr: false,
});

interface SalesOverviewProps {
  chartData: Record<string, number>;
}

const ReactionsOverview: React.FC<SalesOverviewProps> = ({ chartData }) => {
  const theme = useTheme();

  const reactionEmojiMap: Record<string, string> = {
    CARE: "🤗",
    HAHA: "😆",
    LOVE: "❤️",
    LIKE: "👍",
    SAD: "😢",
    ANGRY: "😡",
    WOW: "😮",
  };

  const reactionColorMap: Record<string, string> = {
    CARE: "#FFD700",
    HAHA: "#FF6347",
    LOVE: "#E3002D",
    LIKE: "#2883FE",
    SAD: "#1E90FF",
    ANGRY: "#FF4500",
    WOW: "#9400D3",
  };

  const seriescolumnchart = chartData?.reactions
    ? Object.entries(chartData.reactions).map(([reaction, count]) => ({
      name: reactionEmojiMap[reaction],
      data: [count],
    }))
    : [];

  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      height: 370,
    },
    colors: Object.values(reactionColorMap),
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    yaxis: {
      tickAmount: 4,
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
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [6],
      },
    },
    xaxis: {
      categories: ["🤗", "😆", "❤️", "👍", "😢", "😡", "😮"],
      axisBorder: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };

  return (
    <Card>
      <CardHeader
        title="Нийтлэл дээрх хандалт"
        subheader="Хандалт харьцуулалт"
        subheaderTypographyProps={{
          sx: { color: theme => `${theme.palette.text.disabled} !important` },
        }}
      />
      <CardContent>
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          height="370px"
        />
      </CardContent>
    </Card>
  );
};

export default ReactionsOverview;
