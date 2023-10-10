import { Nunito } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const nunito = Nunito({  // Use Nunito configuration
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});


const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red[700],
    },
  },
  typography: {
    fontFamily: nunito.style.fontFamily,
  },

  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid black',
          borderTop: '1px solid black',
        }
      }
    },
  }
});

export default theme;
