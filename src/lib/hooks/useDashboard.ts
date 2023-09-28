import { useState } from "react";
import { useFetch } from "./useFetch"; // Adjust the import path as needed

export const useDashboard = () => {

    const [selectedItem, setSelectedItem] = useState<any>(null);
    const { data: list, status: listStatus, isLoading: listLoading, error: listError } = useFetch("/dashboard/list");


    const fetchDetail = (itemId: string) => {
        const { data, status, isLoading, error } = useFetch(`/dashboard/detail/${itemId}`);
        if (status === "success") {
            setSelectedItem(data);
        }
        return { data, status, isLoading, error };
    };

    // const updateItem = async (itemId: string, updateData: any) => {
    //     try {
    //         const updatedItem = await HTTP.post(`/dashboard/update/${itemId}`, { body: updateData });
    //         if (list) {
    //             const updatedList = list.map((item: any) => (item.id === itemId ? updatedItem : item));
    //             setSelectedItem(updatedItem);
    //         }
    //         return updatedItem;
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    return {
        list,
        listStatus,
        listLoading,
        listError,
        selectedItem,
        fetchDetail,
    };
};
