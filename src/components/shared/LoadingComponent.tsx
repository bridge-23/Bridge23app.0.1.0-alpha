//..src/components/shared/LoadingComponent.tsx
import Image from 'next/image';
import React from "react";
import { CircularProgress } from '@mui/material';
import useSafeAreaInsets from '../../hooks/useSafeAreaInsets';
function LoadingComponent() {
    const { top } = useSafeAreaInsets();

    return (
        <div style={{
            position: 'fixed',   // Changed to fixed
            top: 0,              // Align to the top of the viewport
            left: 0,            // Align to the left of the viewport
            width: '100%',      // Full width
            height: '100%',     // Full viewport height
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2d62eb',
            paddingTop: `${top}px`, // Ensures top padding includes safe area
            zIndex: 1000,       // Sets z-index to be above the AppBar
        }}>
            <Image src="/iconWhiteNew.png" alt="BridgeLogo" width={280} height={180}/>
            <CircularProgress/>
        </div>
    );
}

export default LoadingComponent;
