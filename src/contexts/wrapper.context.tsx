import { useGetCompany } from '@src/lib/hooks/useGetCompany';
import nookies from 'nookies';
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

const WrapperContext = createContext({ company: {}, loading: false });

export const useWrapperContext = () => {
  const context = useContext(WrapperContext);
  if (!context) {
    throw new Error('useWrapperContext must be used within a WrapperProvider');
  }
  return context;
};

export const WrapperProvider = ({ children }: PropsWithChildren) => {
  const [company, setCompany] = useState({});
  const { loading, onFetch } = useGetCompany();

  useEffect(() => {
    const cookies = nookies.get();
    const companyId = cookies?.companyId;

    if (companyId) {
      const fetch = async () => {
        const company = await onFetch(companyId);
        nookies.set(null, 'expire', company.status);
        setCompany(company);
      };

      fetch();
    }
  }, []);

  return (
    <WrapperContext.Provider value={{ company, loading }}>
      {children}
    </WrapperContext.Provider>
  );
};
