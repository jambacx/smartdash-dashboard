import { useGetPages } from '@src/lib/hooks/useGetPages';
import nookies from 'nookies';
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

const PageContext = createContext({ pages: [], loading: false });

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePageContext must be used within a PageProvider');
  }
  return context;
};

export const PageProvider = ({ children }: PropsWithChildren) => {
  const [pages, setPages] = useState([]);
  const { loading, onFetch } = useGetPages();

  useEffect(() => {
    const cookies = nookies.get();
    const email = cookies?.email;

    if (email) {
      const fetch = async () => {
        const pages = await onFetch(email);
        setPages(pages);
      };

      fetch();
    }
  }, []);

  return (
    <PageContext.Provider value={{ pages, loading }}>
      {children}
    </PageContext.Provider>
  );
};
