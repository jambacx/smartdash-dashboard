import { Alert, AlertTitle } from "@mui/material";

function NoResult() {
  return (
    <Alert severity="error">
      <AlertTitle>Мэдээлэл олдсонгүй</AlertTitle>
      Та хайлтаа өөрчлөөд дахин оролдоод үзнэ үү
    </Alert>
  );
}

export default NoResult;
