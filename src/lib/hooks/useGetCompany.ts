import { useState } from 'react';
import HTTP from '../http';

export const useGetCompany = () => {
  const [loading, setLoading] = useState(false);

  const onFetch = async (id: string) => {
    setLoading(true);

    const response: any = await HTTP.post('/v1/company', {
      body: { id },
    });

    setLoading(false);

    return response?.company || [];
  };

  return { loading, onFetch };
};
