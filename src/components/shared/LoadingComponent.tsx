//..src/components/shared/LoadingComponent.tsx
import Image from 'next/image';
import React from "react";
import { CircularProgress } from '@mui/material';

function LoadingComponent() {
    return (
        <div style={{
            position: 'fixed',  // Changed to fixed
            top: 0,             // Align to the top of the viewport
            left: 0,            // Align to the left of the viewport
            width: '100%',      // Full width
            height: '100vh',    // Full viewport height
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2d62eb',
            zIndex: 1000,       // High z-index to ensure it's on top
        }}>
            <Image src="/iconWhiteNew.png" alt="BridgeLogo" width={140} height={80}/>
            <CircularProgress/>
        </div>
    );
}

export default LoadingComponent;
