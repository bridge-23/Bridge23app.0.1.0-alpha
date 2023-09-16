//..src/components/shared/LoadingComponent.tsx
import { CircularProgress, Box } from '@mui/material';

function LoadingComponent() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
    );
}

export default LoadingComponent;
