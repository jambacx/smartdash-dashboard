import { useEffect, useState } from 'react';
import { useFetch } from './useFetch';
import HTTP from '../http';
import { type Comment } from '@src/interfaces/comment.interface';

interface DashboardRequestBody {
  type?: string;
  page_id: string;
  date_range: [string, string];
}

export const useComment = (bodyData: DashboardRequestBody) => {
  const fetchOptions: any = {
    method: 'post',
    bodyData,
  };

  const {
    response,
    status: listStatus,
    isLoading: listLoading,
    error: listError,
  } = useFetch('/comment', fetchOptions);

  return {
    response,
    listStatus,
    listLoading,
    listError,
  };
};

export const useCommentExport = () => {
  const [loading, setLoading] = useState(false);

  const onExport = async (bodyData: any) => {
    const { page, limit, ...data } = bodyData;

    setLoading(true);

    const response = await HTTP.post(`/comment`, {
      method: 'post',
      body: bodyData,
    });

    setLoading(false);
  };

  return { loading, onExport };
};

export const useGetComment = (body: DashboardRequestBody) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    if (body) {
      const fetch = async () => {
        setLoading(true);

        const response: any = await HTTP.post('/comment', { body });

        setLoading(false);
        setComments(response?.comments);
        setResponse(response);
      };
      fetch();
    }
  }, [body, shouldRefetch]);

  const refetch = () => {
    setShouldRefetch(!shouldRefetch);
  };

  const filterByPostId = (postId: string) => {
    const comments = response?.comments || [];

    if (!postId) {
      return setComments([...response.comments]);
    }

    const filteredComments = comments.filter(
      (comment: Comment) => comment.post_id === postId,
    );

    return setComments([...filteredComments]);
  };

  return { loading, comments, response, refetch, filterByPostId };
};
