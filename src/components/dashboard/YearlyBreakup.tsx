import { Grid, Stack, Typography, Avatar } from "@mui/material";
import {
  IconMailFast,
  IconMessage2,
  IconFileLike,
  IconShare,
} from "@tabler/icons-react";

import DashboardCard from "@components/shared/DashboardCard";

const ICONS = [IconMailFast, IconMessage2, IconFileLike, IconShare];

const YearlyBreakup = ({
  item,
  index,
  data,
}: {
  item: any;
  index: number;
  data: any;
}) => {
  // Error handling: if data is null or not provided
  if (!data) {
    console.error("Data is null or not provided to YearlyBreakup.");
    return null;
  }

  const counts = [
    data?.total_post,
    data?.total_comment,
    data?.total_reaction,
    data?.total_share,
  ];

  const IconComponent = ICONS[index];

  return (
    <DashboardCard title={item?.title}>
      <Grid container spacing={3}>
        <Grid item xs={7} sm={7}>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: item.bgColor, width: 27, height: 27 }}>
              <IconComponent width={20} color={item.color} />
            </Avatar>
            <Typography variant="h3" fontWeight="700">
              {counts[index]}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
