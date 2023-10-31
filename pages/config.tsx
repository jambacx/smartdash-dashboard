import { type ReactElement } from "react";
import {
  Typography,
  Box,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
} from "@mui/material";
import DashboardCard from "@components/shared/DashboardCard";
import { useConfig } from "@src/lib/hooks/useConfig";
import PageContainer from "@src/components/container/PageContainer";
import FullLayout from "@src/layouts/full/FullLayout";
import { IconTrash } from "@tabler/icons-react";
import { CustomTable } from "@src/components/table/CustomTable";

function Config() {
  const { response, listLoading } = useConfig();
  const categories = response?.categories || [];

  const rowsTitles = ["#", "Ангилал", "Үйлдэл"];

  if (listLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PageContainer title="Smartdash" description="this is Dashboard">
      <DashboardCard title="Тохиргоо">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            width: { xs: "280px", sm: "auto" },
          }}>
          <CustomTable headers={rowsTitles}>
            <TableBody>
              {categories.map((category: any, index: number) => (
                <TableRow
                  key={category.id}
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                  }}>
                  <TableCell>
                    <Typography sx={{ fontSize: "14px", fontWeight: 300 }}>
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 500,
                          }}>
                          {category?.category_name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconTrash
                      onClick={() => {
                        window.open(
                          "https://facebook.com/" + category.id,
                          "_blank",
                        );
                      }}
                      color="#E8013F"
                      size={20}
                      style={{
                        cursor: "pointer",
                        marginRight: "8px",
                        fontSize: "18px",
                      }}
                      type="button"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </CustomTable>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
}

Config.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Config;
