//..src/components/BridgeIdCardComponent.tsx
import React, {useState} from "react";
import QRCode from "qrcode.react";
import { Card, Avatar, CardContent, Typography, Box } from '@mui/material';
import LoadingComponent from "../shared/LoadingComponent";
import ErrorComponent from "../shared/ErrorComponent";
import {REWARD_CONTRACT} from "../../consts/parameters";

type BridgeIdCardProps = {
    uid: string | null;
    address: string | null;
    totalNFTs: number;
    truncateUid: (uid: string) => string;
};

const BridgeIdCard: React.FC<BridgeIdCardProps> = ({ uid,address, truncateUid }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <Card
            sx={{
                perspective: '1000px',
                width: '300px',
                height: '200px',
                cursor: 'pointer',
                borderRadius: '18px'
            }}
            onClick={() => setFlipped(!flipped)}
        >
            <CardContent
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* Front side of the card */}
                <Box
                    component="div"
                    sx={{
                        backfaceVisibility: 'hidden',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '18px',
                    }}
                >
                    <Avatar src="/icon-256x256.png" alt="Bridge 23 Logo" sx={{ position: 'absolute', top: '10px', left: '10px' }} />
                    <Typography variant="h6"> Bridge23 </Typography>
                    <Typography variant="body2"> {truncateUid(uid || '')}</Typography>
                    <Typography variant="subtitle2" sx={{ position: 'absolute', top: '10px', right: '10px' }}>
                        Balance
                    </Typography>
                    <Typography variant="body2" sx={{ position: 'absolute', top: '30px', right: '25px' }}>
                       1000
                    </Typography>
                    <Typography variant="subtitle2" sx={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                        Infinity Membership
                    </Typography>
                </Box>
                {/* Back side of the card */}
                <Box
                    component="div"
                    sx={{
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '8px',
                    }}
                >
                    <QRCode value={uid || ''} />
                </Box>
            </CardContent>
        </Card>
    );
};
export default BridgeIdCard;