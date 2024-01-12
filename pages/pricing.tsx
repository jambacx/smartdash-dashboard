import { useState, type ReactElement } from 'react';
import nookies from 'nookies';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/system';
import FullLayout from '@src/layouts/full/FullLayout';
import { IconCircleCheck } from '@tabler/icons-react';
import { green } from '@material-ui/core/colors';
import { type GetServerSideProps } from 'next/types';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const Pricing = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const pricingTiers = [
    {
      title: 'Сарын сунгалт',
      price: '140,000₮',
      features: ['Коммент анализ', 'Олон пэйж удирдах', 'Дата экспорт хийх'],
    },
    {
      title: 'Улирлын сунгалт',
      price: '420,000₮',
      features: ['Коммент анализ', 'Олон пэйж удирдах', 'Дата экспорт хийх'],
    },
    {
      title: 'Хагас жилийн сунгалт',
      price: '1,680,000₮',
      features: ['Коммент анализ', 'Олон пэйж удирдах', 'Дата экспорт хийх'],
    },
    {
      title: 'Жилийн сунгалт',
      price: '1,680,000₮',
      features: ['Коммент анализ', 'Олон пэйж удирдах', 'Дата экспорт хийх'],
    },
  ];

  const handleContactManager = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h2" color="default" mb={2}>
          Эрх сунгалт
        </Typography>
        <Typography variant="h6" color="error" mb={6}>
          Хэрэглэгч таны хугацаа дууссан тул та эрх сунгалтаа хийнэ үү.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {pricingTiers.map((tier, index) => (
          <Grid item xs={12} md={3} key={index}>
            <StyledPaper elevation={3}>
              <Typography variant="h4" gutterBottom mb={3}>
                {tier.title}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {tier.price}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
                {tier.features.map((feature, i) => (
                  <Box
                    component="li"
                    key={i}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mt: 1,
                      mb: 1,
                    }}>
                    <IconCircleCheck
                      style={{ color: green[500], marginRight: 8 }}
                    />
                    {feature}
                  </Box>
                ))}
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDialog(true)}>
                Холбогдох
              </Button>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle mb={4} mt={2}>
          Харилцагчийн менежертэй холбогдох
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Харилцагч таны үйлчилгээний хугацаа дууссан тул гишүүнчлэлийн эрхээ
            сунгахын тулд тулд манай харилцагч харуицсан менежертэй холбогдоно
            уу <br />
            <Box mt={3} />
            Мэйл хаяг:{' '}
            <a href="mailto:manager@example.com">accountmanagers@mobicom.mn</a>
            <br />
            Холбоо барих утас: 1800-2222, 1900-2222
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

Pricing.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Pricing;

export const getServerSideProps: GetServerSideProps = async context => {
  const cookies = nookies.get(context);
  const isExpired = cookies.expire === 'expired';

  if (!isExpired) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return { props: {} };
};
