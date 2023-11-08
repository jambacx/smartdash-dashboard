import { useEffect, useState } from 'react';
import { useFetch } from './useFetch';
import HTTP from '../http';

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
      body: bodyData
    });
    setLoading(false);
  };

  return { loading, onExport };
};

export const useGetComment = (body: DashboardRequestBody) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>();
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    if (body) {
      const fetch = async () => {
        setLoading(true);
        const response: any = await HTTP.post('/comment', {
          body,
        });

        setLoading(false);
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
    const filteredComments = comments.filter(
      (comment: any) => comment.post_id === postId,
    );

    setResponse((currentValue: any) => ({
      ...currentValue,
      comments: filteredComments,
    }));
  };

  return { loading, response, refetch, filterByPostId };
};
