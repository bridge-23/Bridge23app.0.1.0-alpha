//..src/components/shared/LoadingComponent.tsx
import Image from 'next/image';
import React from "react";
import { CircularProgress } from '@mui/material';

function LoadingComponent() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#2d62eb',
        }}>
            <Image src="/iconWhiteNew.png" alt="BridgeLogo" width={70} height={40}/>
            <CircularProgress />
        </div>
    );
}
export default LoadingComponent;
