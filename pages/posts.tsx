import { type ReactElement, useMemo, useState } from "react";
import {
  Typography,
  Box,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  Pagination,
  MenuItem,
  Select,
} from "@mui/material";
import nookies from 'nookies'
import {
  DashboardCard,
  PageContainer,
  CustomTable,
  ControlledDatePicker,
  FallbackSpinner,
} from "@src/components";
import { usePost, usePostCategory } from "@src/lib/hooks/usePost";
import FullLayout from "@src/layouts/full/FullLayout";
import moment from "moment";
import { IconDotsVertical, IconExternalLink } from "@tabler/icons-react";
import CustomModal from "@components/modal";
import { GetServerSideProps } from "next";
import { useConfig } from "@src/lib/hooks/useConfig";

function Posts({ page_id }: any) {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(15);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedCategory, setSelectedCategory] = useState("");

  const body: any = useMemo(
    () => ({
      page: page + 1,
      page_id: page_id,
      limit: rowsPerPage,
      category: selectedCategory,
      date_range: [
        selectedDate ? selectedDate.toISOString().split("T")[0] : undefined,
        endDate ? endDate.toISOString().split("T")[0] : undefined,
      ],
    }),
    [page, rowsPerPage, selectedDate, endDate, selectedCategory],
  );


  const { response, listLoading } = usePost(body);
  const { response: confResponse } = useConfig();

  const posts = response?.posts || [];
  const pagination = response?.pagination || {};

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (post: any) => {
    setSelectedPost(post);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const rowsTitles = ["#", "Post", "Category", "Date", "Action"];
  const categories = confResponse?.categories || [];

  const updatePostCategory = async (postId: any, newCategory: any) => {
    try {
      const { response, listLoading } = usePostCategory({
        page_id,
        postId,
        category: newCategory,
      });
    } catch (error) {
    }
  };

  return (
    <PageContainer title="Smartdash" description="this is Dashboard">
      <Typography
        variant="h6"
        color="textSecondary"
        gutterBottom
        component="div"
        sx={{ fontSize: "13px" }}>
        Нийтэлсэн нийтлэлийн жагсаалт
      </Typography>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ marginBottom: 4 }}>
        Нийтлэл
      </Typography>
      <DashboardCard>
        <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
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
              <>
                <CustomTable headers={rowsTitles}>
                  <TableBody>
                    {posts.map((post: any, index: number) => (
                      <TableRow
                        key={post.id}
                        style={{
                          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        }}>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: "15px", fontWeight: "500" }}
                            onClick={() => {
                              window.open(
                                "https://facebook.com/" + post.id,
                                "_blank",
                              );
                            }}
                            color="#5D87FF"
                            style={{ cursor: "pointer" }}>
                            {index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell onClick={() => handleOpen(post)}>
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
                                {post?.message?.length > 80
                                  ? post.message.slice(0, 80) + "..."
                                  : post.message}
                              </Typography>
                              <Typography
                                color="textSecondary"
                                sx={{
                                  fontSize: "7px",
                                }}>
                                {post?.post}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Select
                            size="small"
                            value={post.category}
                            displayEmpty
                            onChange={(e) => updatePostCategory(post.id, e.target.value)}
                            sx={{ minWidth: 120 }}
                          >
                            <MenuItem value="" disabled>
                              Ангилалаа сонгоно уу
                            </MenuItem>
                            {categories.map((category: any) => (
                              <MenuItem key={category.id} value={category.category_name}>
                                {category.category_name}
                              </MenuItem>
                            ))}
                          </Select>

                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                            }}>
                            {moment.unix(post.created_time).format("MM/DD/YYYY")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconExternalLink
                            onClick={() => {
                              window.open(
                                "https://facebook.com/" + post.id,
                                "_blank",
                              );
                            }}
                            color="#5D87FF"
                            size={20}
                            style={{
                              cursor: "pointer",
                              marginRight: "8px",
                              fontSize: "18px",
                            }}
                            type="button"
                          />
                          <IconDotsVertical
                            onClick={() => {
                              handleOpen(post);
                            }}
                            size={20}
                            color="#6b6969"
                            style={{
                              cursor: "pointer",
                              marginRight: "8px",
                              fontSize: "13px",
                            }}
                            type="button"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </CustomTable>
              </>
            )}
          {selectedPost && (
            <CustomModal
              open={open}
              handleClose={handleClose}
              post={selectedPost}
            />
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

Posts.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Posts;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const page_id = cookies.pageId ? cookies.pageId : null;
  return {
    props: {
      page_id,
    },
  };
};
