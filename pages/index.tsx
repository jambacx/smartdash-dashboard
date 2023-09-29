import type { ReactElement } from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "@components/container/PageContainer";

// components
import SalesOverview from "@components/dashboard/SalesOverview";
import YearlyBreakup from "@components/dashboard/YearlyBreakup";
import FullLayout from "@src/layouts/full/FullLayout";
import ApexDonutChart from "@components/dashboard/ApexDonutChart";

import withAuth from "@src/context/withAuth";
function Home() {
  const statusBar = [
    {
      title: "Нийтлэл",
      bgColor: "#EFE4FF",
      color: "#8C7AC5",
      count: 10,
    },
    {
      title: "Сэтгэгдэл",
      bgColor: "#CFF3F9",
      color: "#6EC4C8",
      count: 22,
    },
    {
      title: "Реакшион",
      bgColor: "#D9E7FF",
      color: "#5E66BB",
      count: 42,
    },
    {
      title: "Хуваалцах",
      bgColor: "#FFF2E2",
      color: "#E3C98A",
      count: 22,
    },
  ];

  return (
    <PageContainer title="Smartdash" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          {statusBar.map((item, index) => (
            <Grid key={index} item xs={3}>
              <YearlyBreakup item={item} index={index} />
            </Grid>
          ))}

          <Grid item xs={12} lg={6}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ApexDonutChart />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Home;
