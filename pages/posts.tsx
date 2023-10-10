import { ReactElement } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  makeStyles,
} from "@mui/material";
import DashboardCard from "@components/shared/DashboardCard";
import { usePost } from "@src/lib/hooks/usePost";
import PageContainer from "@src/components/container/PageContainer";
import FullLayout from "@src/layouts/full/FullLayout";
import moment from "moment";
import { IconExternalLink } from "@tabler/icons-react";
import { CustomTable } from "@src/components/table/CustomTable";

function Posts() {
  const body: any = {
    page: 2,
    page_id: "105701022801307",
    limit: 15,
    category: "default",
    date_range: ["2023-03-1", "2023-03-21"],
  };

  const { response, listLoading, listError, listStatus } = usePost(body);
  const posts = response?.posts || [];

  const rowsTitles = ["#", "Post", "Category", "Date", "Action"];

  if (listLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PageContainer title="Smartdash" description="this is Dashboard">
      <DashboardCard title="Нийтлэлүүд">
        <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
          <CustomTable headers={rowsTitles}>
            <TableBody>
              {posts.map((post: any, index: number) => (
                <TableRow
                  key={post.id}
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <TableCell>
                    <Typography
                      sx={{ fontSize: "15px", fontWeight: "500" }}
                      onClick={() => {
                        window.open(
                          "https://facebook.com/" + post.id,
                          "_blank"
                        );
                      }}
                      color="#5D87FF"
                      style={{ cursor: "pointer" }}
                    >
                      {index}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={400}
                          sx={{
                            fontSize: "14px",
                          }}
                        >
                          {post.message.length > 80
                            ? post.message.slice(0, 80) + "..."
                            : post.message}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "7px",
                          }}
                        >
                          {post?.post}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: post.pbg,
                        color: "#black",
                      }}
                      size="small"
                      label={post.category}
                    ></Chip>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      {moment.unix(post.created_time).format("MM/DD/YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconExternalLink
                      onClick={() => {
                        window.open(
                          "https://facebook.com/" + post.id,
                          "_blank"
                        );
                      }}
                      color="#5D87FF"
                      style={{ cursor: "pointer" }}
                      type="button"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </CustomTable>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
}

Posts.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Posts;
