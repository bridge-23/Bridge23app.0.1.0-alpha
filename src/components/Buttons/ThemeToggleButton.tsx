//..src/components/Buttons/ThemeToggleButton.tsx
import { useContext } from 'react';
import { ColorModeContext } from '../../contexts/ColorModeContext';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

function ThemeToggleButton() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
}
export default ThemeToggleButton;
