import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Nunito } from "@next/font/google";

export const nunito = Nunito({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme = createTheme({
  typography: {
    fontFamily: nunito.style.fontFamily,
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid black",
        },
      },
    },
  },
});

interface CustomTableProps {
  headers: string[];
  children?: React.ReactNode;
}

export const CustomTable: React.FC<CustomTableProps> = ({
  headers,
  children,
}: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header: any) => (
              <TableCell key={header}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {header}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {children}
      </Table>
    </ThemeProvider>
  );
};
