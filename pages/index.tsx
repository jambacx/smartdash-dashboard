import {useState, type ReactElement, useMemo} from "react";
import {Grid, Box} from "@mui/material";
import {
  PageContainer,
  SalesOverview,
  YearlyBreakup,
  FallbackSpinner,
  ApexDonutChart,
} from "@src/components";
import FullLayout from "@src/layouts/full/FullLayout";
import {useGraph, useDashboard} from "@src/lib/hooks/useDashboard";
import {statusBar} from "./utilities/dummy/dummy";
import ReactionsOverview from "@src/components/dashboard/ReactionsOverview";
import Filter from "@src/components/forms/theme-elements/Filter";
function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() - 14)),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterType, setType] = useState("weekly");

  const body: any = useMemo(
    () => ({
      page_id: process.env.NEXT_PUBLIC_PAGE_ID,
      type: filterType,
      category: selectedCategory,
      date_range: [
        selectedDate ? selectedDate.toISOString().split("T")[0] : undefined,
        endDate ? endDate.toISOString().split("T")[0] : undefined,
      ],
    }),
    [selectedDate, filterType, endDate, selectedCategory],
  );

  const {response, listLoading, listError, listStatus} = useDashboard(body);
  const {graphResponse, graphLoading, graphError, graphStatus} = useGraph(body);

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

        {listLoading || graphLoading ? (
          <FallbackSpinner />
        ) : (
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
