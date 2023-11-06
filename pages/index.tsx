import { useState, type ReactElement, useMemo } from "react";
import nookies from 'nookies'
import { Grid, Box } from "@mui/material";
import {
  PageContainer,
  SalesOverview,
  YearlyBreakup,
  FallbackSpinner,
  ApexDonutChart,
} from "@src/components";
import FullLayout from "@src/layouts/full/FullLayout";
import { useGraph, useDashboard } from "@src/lib/hooks/useDashboard";
import { statusBar } from "../src/utilities/dummy/dummy";
import ReactionsOverview from "@src/components/dashboard/ReactionsOverview";
import Filter from "@src/components/forms/theme-elements/Filter";
import { GetServerSideProps } from "next";
function Home({ page_id }: any) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() - 14)),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterType, setType] = useState("custom");

  console.log("page_id: ", page_id);


  const body: any = useMemo(
    () => ({
      page_id: page_id,
      type: filterType,
      category: selectedCategory,
      date_range: [
        selectedDate ? selectedDate.toISOString().split("T")[0] : undefined,
        endDate ? endDate.toISOString().split("T")[0] : undefined,
      ],
    }),
    [selectedDate, filterType, endDate, selectedCategory],
  );

  const { response, listLoading } = useDashboard(body);
  const { graphResponse, graphLoading } = useGraph(body);

  const data = response?.data || {};
  const chartData = graphResponse?.data || [];

  return (
    <PageContainer title="Smartdash" description="this is Dashboard">
      <Box>
        <Filter
          selectedDate={selectedDate}
          endDate={endDate}
          setSelectedDate={setSelectedDate}
          setEndDate={setEndDate}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filterType={filterType}
          setType={setType}
        />

        {listLoading || graphLoading
          ? (
            <FallbackSpinner />
          )
          : (
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
          )}
      </Box>
    </PageContainer>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const page_id = cookies.pageId ? cookies.pageId : null;
  return {
    props: {
      page_id,
    },
  };
};
