import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), {
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

const ReactionsOverview: React.FC<SalesOverviewProps> = ({ chartData }) => {
  const theme = useTheme();

  const seriesData = Object.entries(reactionEmojiMap).map(([key, emoji]) => {

    const reactionCounts: ReactionCounts = chartData?.reactions ?? {};
    return {
      name: emoji,
      data: [reactionCounts[key as keyof ReactionCounts] ?? 0],
    };
  });

  const maxYValue = Math.max(...Object.values(chartData.reactions ?? {}).filter(Boolean));

  const chartColors = Object.keys(reactionEmojiMap).map(
    (key) => {

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
        horizontal: false,
        barHeight: '60%',
        columnWidth: '42%',
        borderRadius: 6,
      },
    },
    xaxis: {
      categories: Object.values(reactionEmojiMap),
      axisBorder: {
        show: true,
      },
      labels: {
        show: false
      }
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  return (
    <Card>
      <CardHeader
        title="Нийтлэл дээрх хандалт"
        subheader="Хандалт харьцуулалт"
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
