import { useFetch } from "./useFetch";

interface DashboardRequestBody {
  type: string;
  page_id: string;
  date_range: [string, string];
}

export const useReport = (bodyData: DashboardRequestBody) => {
  const fetchOptions: any = {
    method: "post",
    bodyData,
  };

  const {
    response,
    status: listStatus,
    isLoading: listLoading,
    error: listError,
  } = useFetch("/post/report", fetchOptions);

  return {
    response,
    listStatus,
    listLoading,
    listError,
  };
};
