import React, { ReactElement } from "react";
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
  IconButton,
} from "@mui/material";
import DashboardCard from "@components/shared/DashboardCard";
import { useComment } from "@src/lib/hooks/useComment";
import PageContainer from "@src/components/container/PageContainer";
import FullLayout from "@src/layouts/full/FullLayout";
import moment from "moment";
import { IconBrandFacebook, IconExternalLink } from "@tabler/icons-react";
import { CustomTable } from "@src/components/table/CustomTable";

function Comments() {
  const body: any = {
    page: 2,
    page_id: "105701022801307",
    limit: 15,
    category: "default",
    date_range: ["2023-03-1", "2023-03-21"],
  };

  const { response, listLoading, listError, listStatus } = useComment(body);
  const rowsTitles = ["#", "Comment", "Confidence", "Label", "Date", "Action"];

  console.log("response: ", response);

  const comments = response?.comments || [];

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

  const getCategoryColor = (category: any) => {
    switch (category) {
      case "neutral":
        return "#5D87FF";
      case "question":
        return "#EBEBEB";
      case "positive":
        return "#02C34E";
      case "negative":
        return "#E8013F";
      default:
        return "#000";
    }
  };

  return (
    <PageContainer title="Smartdash" description="this is Dashboard">
      <DashboardCard title="Сэтгэгдэл">
        <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
          <CustomTable headers={rowsTitles}>
            <TableBody>
              {comments.map((comment: any, index: number) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <Typography
                      sx={{ fontSize: "15px", fontWeight: "500" }}
                      onClick={() => {
                        window.open(
                          "https://facebook.com/" + comment.post_id,
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
                          {comment?.comment?.length > 60
                            ? comment?.comment?.slice(0, 80) + "..."
                            : comment?.comment}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: comment.pbg,
                        color: "#black",
                      }}
                      size="small"
                      label={comment.confidence}
                    ></Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: "2px",
                        color: "white",
                        width: "80px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        backgroundColor: getCategoryColor(comment.label),
                      }}
                      size="small"
                      label={comment.label}
                    ></Chip>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      {moment.unix(comment.created_time).format("MM/DD/YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconExternalLink
                      onClick={() => {
                        window.open(
                          "https://facebook.com/" + comment.post_id,
                          "_blank"
                        );
                      }}
                      color="#1A73ED"
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

Comments.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Comments;
