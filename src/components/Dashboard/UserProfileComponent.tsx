//..src/components/UserProfileComponent.tsx
import React from 'react';
import {Card, CardContent, Typography, Box, Avatar} from '@mui/material';
import ArrowUpwardSharpIcon from "@mui/icons-material/ArrowUpwardSharp";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";


type UserProfileProps = {

};

const UserProfileComponent: React.FC<UserProfileProps> = ({ }) => {

    return (
        <Card
            sx={{
                perspective: '1000px',
                width: { xs: '100%', sm: '300px' },
                height: '200px',
                cursor: 'pointer',
                borderRadius: '24px',
                display: 'flex', // Use flex to center children
                alignItems: 'center', // Center children vertically
                justifyContent: 'center' // Center children horizontally
            }}>
            <CardContent>

                <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                    <div >
                        <Typography variant="subtitle2" color="textSecondary" align="center">
                            Total Items Tokenized
                        </Typography>
                        <Typography variant="h5" align="center"> {/* h4 for a larger font size. Adjust as needed. */}
                            100
                        </Typography>
                    </div>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">

                    <Box display="flex" alignItems="center">
                        <Avatar style={{ backgroundColor: 'green' }} sx={{ mr: 2 }}>
                            <ArrowUpwardSharpIcon style={{ color: 'white' }} />
                        </Avatar>
                        <div>
                            <Typography variant="caption" color="textSecondary">
                                Claimable
                            </Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }} style={{ color: 'green' }}>
                                1000$
                            </Typography>
                        </div>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Avatar style={{ backgroundColor: 'red' }} sx={{ mr: 2 }}>
                            <ArrowDownwardSharpIcon style={{ color: 'white' }} />
                        </Avatar>
                        <div>
                            <Typography variant="caption" color="textSecondary">
                                Burn
                            </Typography>
                            <Typography variant="subtitle2" style={{ color: 'red' }}>
                                2
                            </Typography>
                        </div>
                    </Box>
                </Box>
                {/* You can add more tokenslist features here */}
            </CardContent>
        </Card>
    );
};

export default UserProfileComponent;
