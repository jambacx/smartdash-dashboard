import { useFetch } from "./useFetch";

interface DashboardRequestBody {
    type: string;
    page_id: string;
    date_range: [string, string];
}

export const useComment = (bodyData: DashboardRequestBody) => {
    const fetchOptions: any = {
        method: 'post',
        bodyData
    };

    const { response: response, status: listStatus, isLoading: listLoading, error: listError } = useFetch("/comment", fetchOptions);

    return {
        response,
        listStatus,
        listLoading,
        listError,
    };
};


