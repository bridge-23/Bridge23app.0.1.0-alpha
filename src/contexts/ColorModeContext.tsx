//..src/context/ColorModeContext.tsx
import React, { useState, useMemo, ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ColorModeContext = React.createContext({
    theme: createTheme(), // default value, you can adjust as needed
    toggleColorMode: () => {}
});

interface ColorModeProviderProps {
    children: ReactNode;
}

export const ColorModeProvider: React.FC<ColorModeProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
    const colorMode = useMemo(
        () => ({
            theme,
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [theme]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

