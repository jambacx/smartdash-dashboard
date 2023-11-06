import { Typography, Box, Modal, Avatar, Grid, Stack } from "@mui/material";
import nookies from 'nookies'
import { DashboardCard, FallbackSpinner } from "@src/components";
import { usePostDetail } from "@src/lib/hooks/usePost";
import { detailBar } from "@src/utilities/dummy/dummy";

import {
  IconMessage2,
  IconFileLike,
  IconShare,
  IconExternalLink,
} from "@tabler/icons-react";
import { parseCookies } from 'nookies';
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
  const cookies = parseCookies()
  console.log(post,'--');

  const { response, listLoading, listError } = usePostDetail({ page_id: cookies?.pageId, post_id: post?.id });

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

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {
          response?.message && response?.message !== 'success' &&
          <Typography variant="h6">There is no details yet on this post.</Typography>
        }
        {listLoading ? <FallbackSpinner /> :
          <>
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
              <Grid item xs={4}>
                <DashboardCard title="Хуваалцах">
                  <Grid container spacing={3}>
                    <Grid item xs={7} sm={7}>
                      <Stack
                        direction="row"
                        spacing={1}
                        mt={1}
                        alignItems="center">
                        <Avatar
                          sx={{ bgcolor: '#EFE4FF', width: 27, height: 27 }}>
                          {React.createElement(ICONS[1 % ICONS.length], {
                            width: 20,
                            color: "#8C7AC5",
                          })}
                        </Avatar>
                        <Typography variant="h3" fontWeight="700">
                          {response?.data?.total_reactions}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </DashboardCard>
              </Grid>
              <Grid item xs={4}>
                <DashboardCard title="Хуваалцах">
                  <Grid container spacing={3}>
                    <Grid item xs={7} sm={7}>
                      <Stack
                        direction="row"
                        spacing={1}
                        mt={1}
                        alignItems="center">
                        <Avatar
                          sx={{ bgcolor: '#CFF3F9', width: 27, height: 27 }}>
                          {/* <ICONS[index] width={20} color={item.color} /> */}
                          {React.createElement(ICONS[2 % ICONS.length], {
                            width: 20,
                            color: '#6EC4C8',
                          })}
                        </Avatar>
                        <Typography variant="h3" fontWeight="700">
                          {post?.share_count}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </DashboardCard>
              </Grid>
              <Grid item xs={4}>
                <DashboardCard title="Сэтгэгдэл">
                  <Grid container spacing={3}>
                    <Grid item xs={7} sm={7}>
                      <Stack
                        direction="row"
                        spacing={1}
                        mt={1}
                        alignItems="center">
                        <Avatar
                          sx={{ bgcolor: '#D9E7FF', width: 27, height: 27 }}>
                          {React.createElement(ICONS[3 % ICONS.length], {
                            width: 20,
                            color: '#5E66BB',
                          })}
                        </Avatar>
                        <Typography variant="h3" fontWeight="700">
                          {response?.data?.total_comments}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </DashboardCard>
              </Grid>
            </Grid>
          </>
        }
      </Box>
    </Modal>
  );
}

export default Component;
