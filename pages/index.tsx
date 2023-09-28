import type { ReactElement } from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "@components/container/PageContainer";

// components
import SalesOverview from "@components/dashboard/SalesOverview";
import YearlyBreakup from "@components/dashboard/YearlyBreakup";
import FullLayout from "@src/layouts/full/FullLayout";
import ApexDonutChart from "@components/dashboard/ApexDonutChart";

export default function Home() {
  const statusBar = [
    {
      title: "Нийтлэл",
      color: "#fFFFFF",
      count: 22,
    },
  ];
  return (
    <PageContainer title="Smartdash" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <YearlyBreakup />
          </Grid>
          <Grid item xs={3}>
            <YearlyBreakup />
          </Grid>
          <Grid item xs={3}>
            <YearlyBreakup />
          </Grid>
          <Grid item xs={3}>
            <YearlyBreakup />
          </Grid>
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
