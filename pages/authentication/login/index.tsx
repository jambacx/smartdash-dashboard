import type { ReactElement } from "react";
import { Grid, Box, Card, Typography } from "@mui/material";
import Image from "next/image";

import PageContainer from "@components/container/PageContainer";
import Logo from "@src/layouts/full/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import BlankLayout from "@src/layouts/blank/BlankLayout";
import {
  backgroundStyles,
  gridContainerStyles,
  cardStyles,
  gridItemStyles,
} from "../../../src/styles/login/styles";

const Login2 = () => {
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box sx={backgroundStyles}>
        <Grid
          container
          spacing={0}
          justifyContent="center"
          alignItems="center"
          sx={gridContainerStyles}>
          <Card sx={{ ...cardStyles, bgcolor: "white" }}>
            <Grid
              item
              xs={12}
              sm={5}
              lg={5}
              xl={5}
              display="flex"
              justifyContent="center">
              <Box sx={{ p: 4, width: "100%" }}>
                <Box display="flex">
                  <Logo />
                </Box>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Тавтай морил!
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ mt: 2, fontWeight: 500, color: "#8a90a2", mb: 3 }}>
                  Админ самбарт нэвтрэхийн тулд имэйл хаяг, нууц үгээ оруулна
                  уу.
                </Typography>
                <AuthLogin />
              </Box>
            </Grid>
            <Grid item xs={12} sm={7} lg={7} xl={7} sx={gridItemStyles}>
              <Box
                sx={{ width: "70%", marginTop: 15 }}
                flexDirection="column"
                justifyContent="center"
                alignItems="center">
                <Image
                  src="/images/products/dashboard.svg"
                  alt="logo"
                  height={200}
                  width={380}
                />
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ textAlign: "center", marginTop: 5 }}>
                  Хэрэглэгчийн удирдах самбар
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    fontWeight: 500,
                    color: "#8a90a2",
                    mb: 3,
                    textAlign: "center",
                  }}>
                  Хэрэглэгчдийн сэтгэл ханамжинд бодитоор дүгнэлт хийж, таны
                  маркетингад үр дүн авчран хэрэглэгчдэд нөлөөлөх
                </Typography>
              </Box>
            </Grid>
          </Card>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;

Login2.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};
