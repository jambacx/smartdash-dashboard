import {type ReactElement, useMemo, useState} from "react";
import {
  Typography,
  Box,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  Pagination,
} from "@mui/material";
import {useComment} from "@src/lib/hooks/useComment";
import FullLayout from "@src/layouts/full/FullLayout";
import moment from "moment";
import {IconExternalLink} from "@tabler/icons-react";
import {
  PageContainer,
  DashboardCard,
  CustomTable,
  FallbackSpinner,
  ControlledDatePicker,
} from "@src/components";

function Comments() {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(15);

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const [selectedCategory, setSelectedCategory] = useState("");

  const body: any = useMemo(
    () => ({
      page: page + 1,
      page_id: process.env.NEXT_PUBLIC_PAGE_ID,
      limit: 15,
      category: selectedCategory,
      date_range: [
        selectedDate ? selectedDate.toISOString().split("T")[0] : undefined,
        endDate ? endDate.toISOString().split("T")[0] : undefined,
      ],
    }),
    [page, rowsPerPage, selectedDate, selectedCategory, endDate],
  );

  const {response, listLoading} = useComment(body);
  const rowsTitles = [
    "#",
    "Comment",
    "Confidence",
    "Label",
    "Date",
    "Replied",
    "Action",
  ];

  const comments = response?.comments || [];

  const pagination = response?.pagination || {};
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const getCategoryColor = (category: any) => {
    switch (category) {
      case "neutral":
        return "#5D87FF";
      case "question":
        return "#EBEBEB";
      case "positive":
        return "#15D9B1";
      case "negative":
        return "#DA6E54";
      default:
        return "#000";
    }
  };

  return (
    <PageContainer title="Smartdash" description="this is Dashboard">
      <Typography
        variant="h6"
        color="textSecondary"
        gutterBottom
        component="div"
        sx={{fontSize: "13px"}}>
        Нийтлэл дээрх сэтгэгдлийн жагсаалт
      </Typography>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{marginBottom: 4}}>
        Сэтгэгдэл
      </Typography>
      <DashboardCard>
        <Box sx={{overflow: "auto", width: {xs: "280px", sm: "auto"}}}>
          <ControlledDatePicker
            selectedDate={selectedDate}
            endDate={endDate}
            setSelectedDate={setSelectedDate}
            setEndDate={setEndDate}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {listLoading
            ? (
            <FallbackSpinner />
              )
            : (
            <CustomTable headers={rowsTitles}>
              <TableBody>
                {comments.map((comment: any, index: number) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <Typography
                        sx={{fontSize: "15px", fontWeight: "500"}}
                        onClick={() => {
                          window.open(
                            "https://facebook.com/" + comment.post_id,
                            "_blank",
                          );
                        }}
                        color="#5D87FF"
                        style={{cursor: "pointer"}}>
                        {index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            fontWeight={400}
                            sx={{
                              fontSize: "14px",
                            }}>
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
                        label={comment.confidence}></Chip>
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
                        label={comment.label}></Chip>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "14px",
                        }}>
                        {moment.unix(comment.created_time).format("MM/DD/YYYY")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {comment?.reply === "No Reply Need" && comment?.reply}
                    </TableCell>
                    <TableCell>
                      <IconExternalLink
                        onClick={() => {
                          window.open(
                            "https://facebook.com/" + comment.post_id,
                            "_blank",
                          );
                        }}
                        color="#1A73ED"
                        style={{cursor: "pointer"}}
                        type="button"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </CustomTable>
              )}
          <Pagination
            count={pagination?.page_count || 1}
            page={page + 1}
            onChange={handleChangePage}
            shape="rounded"
            sx={{
              marginTop: 3,
              display: "flex",
              justifyContent: "center",
            }}
          />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
}

Comments.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Comments;
