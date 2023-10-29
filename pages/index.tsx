import { useState, type ReactElement } from "react";
import { Grid, Box } from "@mui/material";
import { PageContainer, SalesOverview, YearlyBreakup, FallbackSpinner, ApexDonutChart } from "@src/components";
import FullLayout from "@src/layouts/full/FullLayout";
import { useGraph, useDashboard } from "@src/lib/hooks/useDashboard";
import { statusBar } from "./utilities/dummy/dummy";
import ReactionsOverview from "@src/components/dashboard/ReactionsOverview";
function Home() {
  const body: any = {
    type: "weekly",
    page_id: process.env.NEXT_PUBLIC_PAGE_ID,
    date_range: ["2023-05-01", "2023-05-31"],
  };

  const [month, setMonth] = useState("1");

  const { response, listLoading, listError, listStatus } = useDashboard(body);
  const { graphResponse, graphLoading, graphError, graphStatus } =
    useGraph(body);

  const data = response?.data || {};
  const chartData = graphResponse?.data || [];

  if (listLoading || graphLoading) {
    return <FallbackSpinner />;
  }

  return (
    <PageContainer title="Smartdash" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          {statusBar.map((item, index) => (
            <Grid key={index} item xs={3}>
              <YearlyBreakup data={data} item={item} index={index} />
            </Grid>
          ))}
          <Grid item xs={12} lg={6}>
            <SalesOverview chartData={chartData} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ApexDonutChart chartData={chartData} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ReactionsOverview chartData={data} />
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
