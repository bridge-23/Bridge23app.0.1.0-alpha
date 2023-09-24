//..src/components/Dashboard/AccountBalanceCardComponent.tsx
import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";

const AccountBalanceCardComponent: React.FC = () => {
    return (
        <Card
            sx={{
                perspective: '1000px',
                width: '300px',
                height: '200px',
                cursor: 'pointer',
                borderRadius: '18px'
            }}
        >
            <CardContent>
                <Typography variant="subtitle1" align="center">Accounts balance</Typography>
                <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}> $111,000.00 </Typography>

                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                        <ArrowCircleUpOutlinedIcon style={{ color: 'green', marginRight: '8px' }} fontSize="large" />
                        <div>
                            <Typography variant="subtitle1" color="textSecondary">Income</Typography>
                            <Typography variant="h6" style={{ color: 'green' }}>$97,000.00</Typography>
                        </div>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <ArrowCircleDownOutlinedIcon style={{ color: 'red', marginRight: '8px' }} fontSize="large" />
                        <div>
                            <Typography variant="subtitle1" color="textSecondary">Expenses</Typography>
                            <Typography variant="h6" style={{ color: 'red' }}>$100</Typography>
                        </div>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default AccountBalanceCardComponent;
