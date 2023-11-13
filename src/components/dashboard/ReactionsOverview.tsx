import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useTheme, type Theme } from '@mui/material/styles';
import { type ApexOptions } from 'apexcharts';

const Chart = dynamic(async () => await import('react-apexcharts'), {
  ssr: false,
});

interface ReactionCounts {
  CARE?: number;
  HAHA?: number;
  LOVE?: number;
  LIKE?: number;
  SAD?: number;
  ANGRY?: number;
  WOW?: number;
}

interface SalesOverviewProps {
  chartData: {
    reactions: ReactionCounts;
  };
}

const reactionEmojiMap: Record<keyof ReactionCounts, string> = {
  CARE: '🤗',
  HAHA: '😆',
  LOVE: '❤️',
  LIKE: '👍',
  SAD: '😢',
  ANGRY: '😡',
  WOW: '😮',
};

const reactionColorMap: Record<keyof ReactionCounts, string> = {
  CARE: '#FFD700',
  HAHA: '#FF6347',
  LOVE: '#E3002D',
  LIKE: '#2883FE',
  SAD: '#1E90FF',
  ANGRY: '#FF4500',
  WOW: '#9400D3',
};

function extractDates(dateRangeString: string) {
  if (!dateRangeString) return;

  const [startDate, endDate] = dateRangeString.split("~");

  const startMonth = new Date(startDate).getMonth() + 1; // Adding 1 because getMonth() returns 0-indexed months
  const startDay = new Date(startDate).getDate();
  const endMonth = new Date(endDate).getMonth() + 1;
  const endDay = new Date(endDate).getDate();

  return `${startMonth.toString().padStart(2, '0')}-${startDay.toString().padStart(2, '0')} ${endMonth.toString().padStart(2, '0')}-${endDay.toString().padStart(2, '0')}`;
}

const ReactionsOverview: React.FC<SalesOverviewProps> = ({ chartData }: any) => {
  const theme = useTheme();
  const date = extractDates(chartData?.date)
  const seriesData = Object.entries(reactionEmojiMap).map(([key, emoji]) => {
    const reactionCounts: ReactionCounts = chartData?.reactions ?? {};
    return {
      name: emoji,
      data: [reactionCounts[key as keyof ReactionCounts] ?? 0],
    };
  });

  const maxYValue = Math.max(...Object.values(chartData.reactions ?? {}).filter(Boolean) as any);
  const reactionsMapWithDate: Partial<Record<keyof ReactionCounts, string>> = {};

  const chartColors = Object.keys(reactionEmojiMap).map(
    (key) => {
      reactionsMapWithDate[key as keyof ReactionCounts] = `${reactionEmojiMap[key as keyof ReactionCounts]} ${date}`;
      const count = chartData?.reactions?.[key as keyof ReactionCounts];
      return count ? reactionColorMap[key as keyof ReactionCounts] : '#D3D3D3';
    }
  );

  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      height: 370,
    },
    colors: chartColors,
    stroke: {
      show: true,
      width: 5,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    yaxis: {
      tickAmount: 4,
      max: maxYValue > 0 ? maxYValue * 1.1 : 10,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top'
        },
        horizontal: false,
        barHeight: '60%',
        columnWidth: '42%',
        borderRadius: 6,
      },
    },
    xaxis: {
      categories: Object.values(reactionsMapWithDate),
      axisBorder: {
        show: true,
      },
      labels: {
        show: false
      }
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
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  return (
    <Card>
      <CardHeader
        title="Нийтлэл дээрх хандалт"
        subheader="Тоогоор"
        subheaderTypographyProps={{
          sx: { color: (theme: Theme) => `${theme.palette.text.disabled} !important` },
        }}
      />
      <CardContent>
        <Chart
          options={optionscolumnchart}
          series={seriesData}
          type="bar"
          height="370px"
        />
      </CardContent>
    </Card>
  );
};

export default ReactionsOverview;
