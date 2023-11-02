import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light', // or 'dark'
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h2',
                    h2: 'h2',
                    h3: 'h2',
                    h4: 'h2',
                    h5: 'h2',
                    h6: 'h2',
                    subtitle1: 'h2',
                    subtitle2: 'h2',
                    body1: 'span',
                    body2: 'span',
                },
            },
        },
        palette: {
            primary: {
                main: '#2D62EB',
            },
            secondary: {
                main: '#FFFFFF'
            },
            tertiary: {
                main: '#000000',
            },
        },
    },
    // other theme properties
});



export default theme;