import { useEffect, useState } from 'react';
import HTTP from '../http';
import { useFetch } from './useFetch';
import { type Configs } from '@src/interfaces/category';

export const useGetConfig = (companyId: string) => {
  const [loading, setLoading] = useState(false);
  const [configs, setConfigs] = useState<Configs[]>([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    if (companyId) {
      const fetch = async () => {
        setLoading(true);
        const response: any = await HTTP.get('/post/category', {
          params: { company_id: companyId },
        });

        setLoading(false);
        setConfigs(response?.categories || []);
      };
      fetch();
    }
  }, [companyId, shouldRefetch]);

  const refetch = () => {
    setShouldRefetch(!shouldRefetch);
  };

  return { loading, configs, refetch };
};

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

    await HTTP.remove(`/post/category/${categoryId}`, { method: 'delete' });

    setLoading(false);
  };

  return { loading, onDelete };
};

export const useConfigAdd = () => {
  const [loading, setLoading] = useState(false);

  const onAdd = async (companyId: string, name: string) => {
    setLoading(true);

    await HTTP.post(`/post/category`, {
      method: 'post',
      body: {
        company_id: companyId,
        category_name: name,
      },
    });

    setLoading(false);
  };

  return { loading, onAdd };
};
