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
import { useConfigAdd, useConfigDelete, useGetConfig } from "@src/lib/hooks/useConfig";
import PageContainer from "@src/components/container/PageContainer";
import FullLayout from "@src/layouts/full/FullLayout";
import { IconTrash } from "@tabler/icons-react";
import { CustomTable } from "@src/components/table/CustomTable";
import AddIcon from '@mui/icons-material/Add';
import AddCategoryDialog from '@components/dilog/index';
import { type Category } from "@src/interfaces/category.interface";
import { toast } from "@src/utilities";
import { getServerSideProps } from "@src/lib/fetch-page";


type Props = {
  page_id: string;
  company_id: string;
};

function Config({ company_id }: Props) {
  const rowsTitles = ["#", "Ангилал", "Үйлдэл"];
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { configs, loading, refetch } = useGetConfig(company_id);
  const { onAdd } = useConfigAdd();
  const { onDelete } = useConfigDelete();

  const handleAddCategory = async (name: string) => {
    if (!name) {
      return toast('error', 'Ангилал оруулна уу');
    }

    await onAdd(company_id, name);
    toast('success', 'Ангилал амжилттэй нэмэгдлээ')
    refetch();
  }
  const deleteCategory = async (category: Category) => {
    if (confirm(`${category.category_name} устгах уу?`)) {
      await onDelete(category.id);
      toast('success', 'Ангилал амжилттэй устгагдлаа')
      refetch();
    }
  };

  if (loading) {
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
              onClick={() => { setAddDialogOpen(true); }}
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
              {configs.map((category: any, index: number) => (
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
                      onClick={async () => { await deleteCategory(category); }}
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
        onClose={() => { setAddDialogOpen(false); }}
        onAdd={handleAddCategory}
      />
    </PageContainer>
  );
}

Config.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export { getServerSideProps };
export default Config;
