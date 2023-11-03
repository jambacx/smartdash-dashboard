import { useState, type ReactElement } from "react";
import {
  Typography,
  Box,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
  Button,
} from "@mui/material";
import DashboardCard from "@components/shared/DashboardCard";
import { useConfig } from "@src/lib/hooks/useConfig";
import PageContainer from "@src/components/container/PageContainer";
import FullLayout from "@src/layouts/full/FullLayout";
import { IconTrash } from "@tabler/icons-react";
import { CustomTable } from "@src/components/table/CustomTable";
import { fetchFromAPI } from "@src/lib/hooks/useFetch";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import AddCategoryDialog from '@components/dilog/index';

function Config() {
  const { response, listLoading } = useConfig();
  const categories = response?.categories || [];

  const rowsTitles = ["#", "Ангилал", "Үйлдэл"];
  const [addDialogOpen, setAddDialogOpen] = useState(false);


  const deleteCategory = async (categoryId: any) => {

    const result = await fetchFromAPI(`/post/category/${categoryId}`, {
      method: 'delete',
    });
  }


  const handleAddCategory = async (categoryName: string) => {
    // Call the API to add a new category
    const result = await fetchFromAPI('https://de5hzqxd15.execute-api.ap-northeast-1.amazonaws.com/dev/post/category', {
      method: 'post',
      bodyData: { category_name: categoryName },
    });

  };

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
      <DashboardCard>
        <Box sx={{ position: 'relative', display: "flex", flexDirection: "column", overflow: "auto", width: { xs: "280px", sm: "auto" } }}>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <Typography variant="h5" component="div">
              Тохиргоо
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setAddDialogOpen(true)}
              sx={{
                borderColor: 'success.main',
                color: 'success.main',
                background: 'success.main',
                ':hover': {
                  borderColor: 'success.dark',
                  background: 'success.light',
                },
              }}
            >
              Ангилал нэмэх
            </Button>
          </Box>
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
                      onClick={() => deleteCategory(category.id)}
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
      <AddCategoryDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={handleAddCategory}
      />
    </PageContainer>
  );
}

Config.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Config;
