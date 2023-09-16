//..src/components/shared/ErrorComponent.tsx
import Alert from '@mui/lab/Alert';
import Box from '@mui/material/Box';

function ErrorComponent({ message }: { message: string }) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Alert severity="error">{message}</Alert>
        </Box>
    );
}

export default ErrorComponent;
