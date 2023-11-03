import { Typography, Box, Modal, Avatar, Grid, Stack } from "@mui/material";
import { DashboardCard, FallbackSpinner } from "@src/components";
import { useGetPage } from "@src/lib/hooks/useGetPage";
import { usePost } from "@src/lib/hooks/usePost";
import { detailBar } from "@src/utilities/dummy/dummy";

import {
  IconMessage2,
  IconFileLike,
  IconShare,
  IconExternalLink,
} from "@tabler/icons-react";
import React from "react";

const ICONS = [IconMessage2, IconFileLike, IconShare];

function Component({
  open,
  handleClose,
  post,
}: {
  open: any;
  handleClose: any;
  post: any;
}) {
  const { selectedPage } = useGetPage();

  const { listLoading } = usePost({ page_id: selectedPage } as any);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 850,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  if (listLoading) {
    return <FallbackSpinner />;
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {post && (
          <>
            <IconExternalLink
              onClick={() => {
                window.open("https://facebook.com/" + post.id, "_blank");
              }}
              color="#5D87FF"
              size={20}
              style={{ cursor: "pointer", marginRight: "8px", fontSize: "18px" }}
              type="button"
            />
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "13px", fontWeight: 700 }}>
              Нийтлэл:
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "12px", fontWeight: 400, textAlign: "justify" }}>
              {post?.message}
            </Typography>
          </>
        )}
        <Grid container spacing={3} sx={{ marginTop: 1 }}>
          {detailBar.map((item: any, index: number) => (
            <Grid key={index} item xs={4}>
              <DashboardCard title={item.title}>
                <Grid container spacing={3}>
                  <Grid item xs={7} sm={7}>
                    <Stack
                      direction="row"
                      spacing={1}
                      mt={1}
                      alignItems="center">
                      <Avatar
                        sx={{ bgcolor: item.bgColor, width: 27, height: 27 }}>
                        {/* <ICONS[index] width={20} color={item.color} /> */}
                        {React.createElement(ICONS[index % ICONS.length], {
                          width: 20,
                          color: item.color,
                        })}
                      </Avatar>
                      <Typography variant="h3" fontWeight="700">
                        20
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </DashboardCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
}

export default Component;