import { useFetch } from "./useFetch";

interface DashboardRequestBody {
  type: string;
  page_id: string;
  date_range: [string, string];
}

export const useConfig = () => {
  const fetchOptions: any = {
    method: "get",
    page_id: process.env.NEXT_PUBLIC_PAGE_ID,
  };

  const {
    response,
    status: listStatus,
    isLoading: listLoading,
    error: listError,
  } = useFetch("/post/category", fetchOptions);

  return {
    response,
    listStatus,
    listLoading,
    listError,
  };
};
