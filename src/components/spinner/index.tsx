// ** MUI Imports
import { useTheme } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const FallbackSpinner = ({ sx }: { sx?: BoxProps["sx"] }) => {
  // ** Hook
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        ...sx,
      }}
    >
      <CircularProgress disableShrink />
    </Box>
  );
};

export default FallbackSpinner;
