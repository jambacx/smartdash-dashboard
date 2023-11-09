import { useEffect, useState } from 'react';
import { useFetch } from './useFetch';
import HTTP from '../http';
import { type Post } from '@src/interfaces/post.interface';

interface DashboardRequestBody {
  type: string;
  page_id: string;
  date_range: [string, string];
}

export const usePost = (bodyData: any) => {
  const fetchOptions: any = {
    method: 'post',
    bodyData,
  };

  const {
    response,
    status: listStatus,
    isLoading: listLoading,
    error: listError,
  } = useFetch('/post', fetchOptions);

  return {
    response,
    listStatus,
    listLoading,
    listError,
  };
};

export const usePostDetail = (bodyData: any) => {
  const fetchOptions: any = {
    method: 'post',
    bodyData,
  };

  const {
    response,
    status: listStatus,
    isLoading: listLoading,
    error: listError,
  } = useFetch('/post/detail', fetchOptions);

  return {
    response,
    listStatus,
    listLoading,
    listError,
  };
};

export const usePostCategory = (bodyData: any) => {
  const fetchOptions: any = {
    method: 'put',
    bodyData,
  };

  const {
    response,
    status: listStatus,
    isLoading: listLoading,
    error: listError,
  } = useFetch('/post', fetchOptions);

  return {
    response,
    listStatus,
    listLoading,
    listError,
  };
};

export const useGraph = (bodyData: DashboardRequestBody) => {
  const fetchOptions: any = {
    method: 'post',
    bodyData,
  };

  const {
    response: graphResponse,
    status: graphStatus,
    isLoading: graphLoading,
    error: graphError,
  } = useFetch('/dashboard/graph', fetchOptions);

  return {
    graphResponse,
    graphStatus,
    graphLoading,
    graphError,
  };
};

export const useUpdatePost = () => {
  const [loading, setLoading] = useState(false);

  const onUpdate = async (
    pageId: string,
    postId: string,
    categoryId: string,
  ) => {
    setLoading(true);

    await HTTP.put(`/post`, {
      body: {
        page_id: pageId,
        postId,
        category: categoryId,
      },
    });

    setLoading(false);
  };

  return { loading, onUpdate };
};

export const useGetPost = (body: any) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ posts: Post[] }>({ posts: [] });
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    if (body) {
      const fetch = async () => {
        setLoading(true);
        const response: any = await HTTP.post('/post', { body });

        setLoading(false);
        setResponse(response);
      };
      fetch();
    }
  }, [body, shouldRefetch]);

  const refetch = () => {
    setShouldRefetch(!shouldRefetch);
  };

  return { loading, response, refetch };
};

export const useGetPostByCategory = (params: {
  page_id: string;
  ids: string[];
}) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ posts: Post[] }>({ posts: [] });
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    if (params?.page_id && params?.ids.length > 0) {
      const fetch = async () => {
        setLoading(true);

        const uniqueIdsSet = new Set(params.ids);
        const uniqueIds = Array.from(uniqueIdsSet);
        const ids = uniqueIds.join(',');

        const response: any = await HTTP.get(
          `/post?page_id=${params.page_id}&ids=${ids}`,
        );

        setLoading(false);
        setResponse(response);
      };
      fetch();
    }
  }, [params.page_id, params.ids, shouldRefetch]);

  const refetch = () => {
    setShouldRefetch(!shouldRefetch);
  };

  return { loading, response, refetch };
};
