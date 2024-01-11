import { GetServerSideProps } from "next/types";
import nookies from 'nookies'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const page_id = cookies.pageId ? cookies.pageId : null;
  const expire = cookies.expire ? cookies.expire : 'expired';

  const company_id = cookies.companyId ? cookies.companyId : null;

  if (expire) {
    return {
      redirect: {
        destination: '/pricing',
        permanent: false,
      },
    };
  }

  return { props: { page_id, company_id } };
};
