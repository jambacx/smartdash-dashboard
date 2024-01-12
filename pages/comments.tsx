/* eslint multiline-ternary: ["error", "never"] */

import { type ReactElement, useMemo, useState, useRef } from 'react';
import { getCategoryColor } from '@src/utilities/dummy/dummy';
import {
  Typography,
  Box,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  Pagination,
} from '@mui/material';
import { useGetComment } from '@src/lib/hooks/useComment';
import FullLayout from '@src/layouts/full/FullLayout';
import moment from 'moment';
import { IconExternalLink } from '@tabler/icons-react';
import CustomModal from '@components/comment-modal';

import {
  PageContainer,
  DashboardCard,
  CustomTable,
  FallbackSpinner,
} from '@src/components';
import DatePicker from '@src/components/common/date-picker';
import LabelPicker from '@src/components/common/label-picker';
import CsvDownload from '@src/components/export/ExportDownload';
import PostSelector from '@src/components/posts/post-selector.view';

const rowsTitles = ['#', 'Сэтгэгдэл', 'Үр дүн', 'Label', 'Огноо', 'Үйлдэл'];

function Comments({ page_id }: any) {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(15);
  const [selectedComment, setSelectedComment] = useState<any | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
  );
  const prevLabelRef = useRef<string | undefined>();
  const prevPageRef = useRef<number | undefined>();
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLimit, setSelectedLimit] = useState(15);

  const body: any = useMemo(() => {
    const data = {
      sort: 'created_time',
      page_id,
      limit: selectedLimit,
      label: selectedCategory,
      date_range: [
        selectedDate ? selectedDate.toISOString().split('T')[0] : undefined,
        endDate ? endDate.toISOString().split('T')[0] : undefined,
      ],
    };

    const prevLabel = prevLabelRef?.current;
    const prevPage = prevPageRef?.current;

    if (!prevLabel) {
      prevPageRef.current = page;
      prevLabelRef.current = selectedCategory;
      return { ...data, page: 1 };
    }

    if (selectedCategory !== prevLabel && page === prevPage) {
      return { ...data, page: 1 };
    }

    return { ...data, page: page + 1 };
  }, [
    page,
    rowsPerPage,
    selectedDate,
    selectedCategory,
    selectedLimit,
    endDate,
  ]);

  const { response, comments, loading, filterByPostId } = useGetComment(body);

  const pagination = response?.pagination || {};

  const retrievedCommentsIds: string[] = useMemo(() => {
    if (!loading) {
      return comments.map(comment => comment.post_id);
    } else {
      return [];
    }
  }, [page_id, selectedCategory, selectedDate, endDate, page, loading]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage - 1);
  };
  const handleSelectPost = (postId: string) => {
    filterByPostId(postId);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (comment: any) => {
    setSelectedComment(comment);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PageContainer title="Smartdash" description="this is Dashboard">
      <Typography
        variant="h6"
        color="textSecondary"
        gutterBottom
        component="div"
        sx={{ fontSize: '13px' }}>
        Сэтгэгдлийн жагсаалт
      </Typography>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ marginBottom: 4 }}>
        Сэтгэгдэл
      </Typography>
      <DashboardCard>
        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
          <Box>
            <Box height={12} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Box sx={{ display: 'flex', gap: '4px' }}>
                <DatePicker
                  startDate={selectedDate}
                  endDate={endDate}
                  setStartDate={setSelectedDate}
                  setEndDate={setEndDate}
                />
                <LabelPicker
                  selectedLabel={selectedCategory}
                  setSelectedLabel={setSelectedCategory}
                />
              </Box>
              <CsvDownload
                title={'Сэтгэгдэл'}
                path="/comment"
                body={body}
                type="comments"
                loading={loading}
                disabled={comments?.length === 0}
              />
            </Box>
            <Box height={12} />
            <PostSelector
              params={{ page_id, ids: retrievedCommentsIds }}
              onSelect={handleSelectPost}
            />
          </Box>
          {loading ? (
            <FallbackSpinner />
          ) : (
            <CustomTable headers={rowsTitles}>
              <TableBody>
                {comments.map((comment: any, index: number) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <Typography
                        sx={{ fontSize: '15px', fontWeight: '500' }}
                        onClick={() => {
                          window.open(
                            'https://facebook.com/' + comment.post_id,
                            '_blank',
                          );
                        }}
                        color="#5D87FF"
                        style={{ cursor: 'pointer' }}>
                        {rowsPerPage * page + index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleOpen(comment);
                      }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            fontWeight={400}
                            sx={{
                              fontSize: '14px',
                            }}>
                            {comment?.comment?.length > 60 ? comment?.comment?.slice(0, 80) + '...' : comment?.comment}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        sx={{
                          px: '4px',
                          backgroundColor: comment.pbg,
                          color: '#black',
                        }}
                        size="small"
                        label={comment.confidence}></Chip>
                    </TableCell>
                    <TableCell>
                      <Chip
                        sx={{
                          px: '2px',
                          color: 'white',
                          width: '80px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          backgroundColor: getCategoryColor(comment.label),
                        }}
                        size="small"
                        label={comment.label}></Chip>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '14px',
                        }}>
                        {moment.unix(comment.created_time).format('MM/DD/YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconExternalLink
                        onClick={() => {
                          window.open(
                            'https://facebook.com/' + comment.post_id,
                            '_blank',
                          );
                        }}
                        color="#1A73ED"
                        style={{ cursor: 'pointer' }}
                        type="button"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </CustomTable>
          )}
          {selectedComment && (
            <CustomModal
              open={open}
              handleClose={handleClose}
              comment={selectedComment}
            />
          )}
          <Pagination
            count={pagination?.page_count || 1}
            page={page + 1}
            onChange={handleChangePage}
            shape="rounded"
            sx={{
              marginTop: 3,
              display: 'flex',
              justifyContent: 'center',
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
