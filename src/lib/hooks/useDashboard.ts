import { useFetch } from "./useFetch";

interface DashboardRequestBody {
  type: string;
  page_id: string;
  date_range: [string, string];
}

export const useDashboard = (bodyData: DashboardRequestBody) => {
  const fetchOptions: any = {
    method: "post",
    bodyData,
  };

  const {
    response,
    status: listStatus,
    isLoading: listLoading,
    error: listError,
  } = useFetch("/dashboard", fetchOptions);
  return {
    response,
    listStatus,
    listLoading,
    listError,
  };
};

export const useGraph = (bodyData: DashboardRequestBody) => {
  const fetchOptions: any = {
    method: "post",
    bodyData,
  };

  const {
    response: graphResponse,
    status: graphStatus,
    isLoading: graphLoading,
    error: graphError,
  } = useFetch("/dashboard/graph", fetchOptions);

  return {
    graphResponse,
    graphStatus,
    graphLoading,
    graphError,
  };
};
