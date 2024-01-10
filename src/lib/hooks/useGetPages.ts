import { useState } from 'react';
import HTTP from '../http';

export const useGetPages = () => {
  const [loading, setLoading] = useState(false);

  const onFetch = async (email: string) => {
    setLoading(true);

    const response: any = await HTTP.post('/v1/pages', {
      body: { email },
    });

    setLoading(false);

    return response?.pages || [];
  };

  return { loading, onFetch };
};
