import { useState, type ReactElement, useMemo, useEffect } from "react";
import nookies from 'nookies'
import { Grid, Box, Alert, AlertTitle } from "@mui/material";
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
import { type GetServerSideProps } from "next";
import { calculateDateRange } from "@src/lib/hooks/useRange";
import Filter from "@src/modules/home/filter.view";
import NoResult from "@src/components/common/no-result/NoResult";

type Props = {
  page_id: string;
  company_id: string;
};

function Home({ page_id, company_id }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() - 14)),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterType, setType] = useState("custom");

  const body: any = useMemo(() => {
    const dateRange = calculateDateRange(filterType, selectedDate, endDate);
    const bodyObject: any = {
      page_id,
      type: filterType,
      category: selectedCategory,
      date_range: dateRange
    };

    return bodyObject;
  }, [selectedDate, filterType, endDate, selectedCategory]);

  useEffect(() => {
    if (!selectedDate) return;
    let newEndDate;

    switch (filterType) {
      case 'daily':
        newEndDate = new Date(selectedDate);
        break;
      case 'weekly':
        newEndDate = new Date(selectedDate);
        newEndDate.setDate(newEndDate.getDate() + 6);
        break;
      case 'monthly':
        newEndDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        break;
      default:
        return;
    }
    setEndDate(newEndDate);
  }, [selectedDate, filterType]);

  const { response, listLoading, listError } = useDashboard(body);
  const { graphResponse, graphLoading } = useGraph(body);

  const data = response?.data || {};
  const chartData = graphResponse?.data || [];
  const noResult = useMemo(() => {
    if (chartData.length > 0) {
      const emptyDashboardData = Object.keys(data).length === 0;
      const hasGraphData = chartData[0].items.some((i: number) => i > 0);
      return emptyDashboardData && !hasGraphData;
    }
  }, [data, chartData]);


  return (
    <PageContainer title="Smartdash" description="this is Dashboard">
      <Box>
        {noResult && !listLoading && !graphLoading && <NoResult />}
        <Filter
          companyId={company_id}
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
              {
                !listError &&
                <Grid item xs={12} lg={6}>
                  <ApexDonutChart chartData={chartData} />
                </Grid>
              }
              <Grid item xs={12} lg={12}>
                <ReactionsOverview chartData={data} />
              </Grid>
            </Grid>
          )}
      </Box>
    </PageContainer >
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const page_id = cookies.pageId ? cookies.pageId : null;
  const company_id = cookies.companyId ? cookies.companyId : null;

  return { props: { page_id, company_id } };
};
