import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import {
  IconArrowUpLeft,
  IconMailFast,
  IconMessage2,
  IconFileLike,
  IconShare,
} from "@tabler/icons-react";

import DashboardCard from "@components/shared/DashboardCard";

const YearlyBreakup = ({ item, index }: { item: any; index: number }) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = "#ecf2ff";

  const chartItem = item;

  const optionscolumnchart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 370,
    },
    colors: [primary, primarylight, "#F9F9FD"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart: any = [38, 40, 25];

  return (
    <DashboardCard title={chartItem?.title}>
      <Grid container spacing={3}>
        <Grid item xs={7} sm={7}>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: chartItem.bgColor, width: 27, height: 27 }}>
              {index == 0 && (
                <IconMailFast width={20} color={chartItem.color} />
              )}
              {index == 1 && (
                <IconMessage2 width={20} color={chartItem.color} />
              )}
              {index == 2 && (
                <IconFileLike width={20} color={chartItem.color} />
              )}
              {index == 3 && <IconShare width={20} color={chartItem.color} />}
            </Avatar>
            <Typography variant="h3" fontWeight="700">
              {chartItem?.count}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
