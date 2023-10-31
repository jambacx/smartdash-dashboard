// ** MUI Imports
import Card from "@mui/material/Card";
import {useTheme} from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import {type ApexOptions} from "apexcharts";
import ReactApexcharts from "../charts/react-apexcharts";

const donutColors = {
  series1: "#4F78F8",
  series3: "#15D9B1",
  series2: "#DA6E54",
};

const ApexDonutChart = ({chartData}: {chartData: any}) => {
  const theme = useTheme();

  let percentages = []; // Assigning a default value

  if (chartData[0]?.items?.[0] != null) {
    percentages = chartData[0].percentages;

    if (percentages?.length > 0) {
      percentages.pop();
    }
  }

  const options: ApexOptions = {
    stroke: {width: 0},
    labels: ["Эерэг", "Ерөнхий", "Сөрөг"],
    colors: [donutColors.series3, donutColors.series1, donutColors.series2],
    chart: {
      fontFamily: "Nunito, sans-serif",
    },
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`,
    },
    legend: {
      position: "bottom",
      markers: {offsetX: -3},
      labels: {colors: theme.palette.text.secondary},
      itemMargin: {
        vertical: 3,
        horizontal: 10,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: "1.2rem",
            },
            value: {
              fontSize: "1.2rem",
              color: theme.palette.text.secondary,
              formatter: (val: string) => `${parseInt(val, 10)}`,
            },
            total: {
              show: true,
              fontSize: "1.2rem",
              label: "Нийт",
              formatter: () => "31%",
              color: theme.palette.text.primary,
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: theme.typography.body1.fontSize,
                  },
                  value: {
                    fontSize: theme.typography.body1.fontSize,
                  },
                  total: {
                    fontSize: theme.typography.body1.fontSize,
                  },
                },
              },
            },
          },
        },
      },
    ],
  };

  return (
    <Card>
      <CardHeader
        title="Сэтгэгдлийн харьцаа"
        subheader="Сэтгэгдлийн харьцуулалт"
        subheaderTypographyProps={{
          sx: {color: theme => `${theme.palette.text.disabled} !important`},
        }}
      />
      <CardContent>
        <ReactApexcharts
          type="donut"
          height={400}
          options={options}
          series={percentages}
        />
      </CardContent>
    </Card>
  );
};

export default ApexDonutChart;
