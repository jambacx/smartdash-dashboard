import { useState } from 'react';
import HTTP from '../http';
import { useFetch } from './useFetch';

export const useConfig = () => {
  const fetchOptions: any = {
    method: 'get',
    page_id: process.env.NEXT_PUBLIC_PAGE_ID,
  };

  const {
    response,
    status: listStatus,
    isLoading: listLoading,
    error: listError,
  } = useFetch('/post/category', fetchOptions);

  return {
    response,
    listStatus,
    listLoading,
    listError,
  };
};

export const useConfigDelete = () => {
  const [loading, setLoading] = useState(false);

  const onDelete = async (categoryId: string) => {
    setLoading(true);

    await HTTP.remove(`/post/category/delete/${categoryId}`, {
      method: 'delete',
    });

    setLoading(false);
  };

  return { loading, onDelete };
};
