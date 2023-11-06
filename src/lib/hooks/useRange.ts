export const calculateDateRange = (type: string, selectedDate: Date | null, endDate: Date | null): string[] => {
  switch (type) {
    case 'daily':
      return [
        new Date().toISOString().split("T")[0],
        new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split("T")[0]
      ];
    case 'weekly':
      return [
        new Date().toISOString().split("T")[0],
        new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split("T")[0]
      ];
    case 'monthly':
      return [
        new Date().toISOString().split("T")[0],
        new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split("T")[0]
      ];
    case 'custom':
      return [
        selectedDate?.toISOString().split("T")[0] ?? '',
        endDate?.toISOString().split("T")[0] ?? ''
      ];
    default:
      return []; // Or return a default range if needed
  }
};
