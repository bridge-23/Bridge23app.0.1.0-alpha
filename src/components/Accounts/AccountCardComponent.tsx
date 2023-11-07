//..src/components/Accounts/AccountCardComponent.tsx
import React from 'react';
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface AccountCardProps {
    accountName: string;
    financialInstitution: string;
    currentBalance: number;
    accountCurrency: string;
    onEdit: () => void;
}

const AccountCard: React.FC<AccountCardProps> = ({
                                                     accountName,
                                                     financialInstitution,
                                                     currentBalance,
                                                     accountCurrency,
                                                     onEdit,
                                                 }) => {
    // A helper function to format the balance text
    const formattedBalance = currentBalance !== undefined
        ? `${accountCurrency} ${currentBalance.toLocaleString()}`
        : `${accountCurrency} `;

    return (
        <Card sx={{perspective: '1000px', width: '100%', cursor: 'pointer', borderRadius: '24px', boxShadow: 3}}>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Account Name</TableCell>
                            <TableCell align="right">Financial Institution</TableCell>
                            <TableCell align="right">Currency</TableCell>
                            <TableCell align="right">Current Balance</TableCell>
                            <TableCell align="right">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{accountName}</TableCell>
                            <TableCell align="right">{financialInstitution}</TableCell>
                            <TableCell align="right">{accountCurrency}</TableCell>
                            <TableCell align="right">{formattedBalance}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={onEdit} size="small">
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
            <Button size="small">See More</Button>
            </Box>
        </Card>
    );
};
export default AccountCard;



