import { type GetServerSideProps } from 'next/types';
import nookies from 'nookies';

export const getServerSideProps: GetServerSideProps = async context => {
  const cookies = nookies.get(context);
  const isExpired = cookies.expire === 'expired';

  if (isExpired) {
    return {
      redirect: {
        destination: '/pricing',
        permanent: false,
      },
    };
  }

  const page_id = cookies.pageId ? cookies.pageId : null;
  const company_id = cookies.companyId ? cookies.companyId : null;

  return { props: { page_id, company_id } };
};
