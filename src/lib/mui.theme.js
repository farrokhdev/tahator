import { createTheme } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';

const MUIThemeProvider = createTheme({
  direction: 'rtl',
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '11.1px 14px',
          fontSize: '.875rem',
          height: 'auto',
        },
        notchedOutline: {
          top: '-3px',
          legend: {
            height: '0',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: '-6px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#6076E2',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#6076E2',
          },
          fontWeight: '700',
        },
      },
    },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#343B71',
      dark: '#281A52',
      contrastText: '#FFF',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    info: {
      main: '#3815a4',
      dark: '#32354F',
      light: '#6438E5',
    },
    secondary: {
      main: '#F6C121',
      dark: '#F6AE2D',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#FFF',
    },
    action: {
      main: '#626262',
    },
    purple: {
      main: '#221D50',
    },
    warning: {
      main: '#F6C121',
    },
    grey: {
      A100: '#f5f5f5',
    },
    error: {
      main: '#F44336',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
}, faIR);

export default MUIThemeProvider;
