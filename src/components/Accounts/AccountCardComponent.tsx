//..src/components/Accounts/AccountCardComponent.tsx
import React from 'react';
import {useMediaQuery, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {Theme} from "@mui/material/styles";
import {AccountCardState} from '../../state/atoms';
import {useRecoilState, useRecoilValue} from "recoil";
interface AccountCardProps {
    accountName: string;
    financialInstitution: string;
    currentBalance: number;
    accountCurrency: string;
    onEdit: () => void;
}
const AccountCard: React.FC<AccountCardProps> = ({accountName, financialInstitution, currentBalance, accountCurrency, onEdit }) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    // A helper function to format the balance text
    const formattedBalance = currentBalance !== undefined ? `${accountCurrency} ${currentBalance.toLocaleString()}`:`${accountCurrency} `;

    return (
        <Card
            sx={{
                perspective: '1000px',
                width: {
                    xs: '300px', // Width on extra-small screens (mobile)
                    sm: '100%',  // Width on small screens (tablet)
                    md: '600px'  // Width on medium screens (desktop) and above
                },
                height: {
                    xs: '150px',
                    sm: '200px',
                    md: '200px'
                },
                margin: 0,
                p: 0,
                borderRadius: '24px',
                //boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200, height: 100 }} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            {isMobile ? (
                                <>
                                    <TableCell component="th" scope="row">Account Name</TableCell>
                                    <TableCell align="right">Current Balance</TableCell>
                                    <TableCell align="right">Edit</TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>Account Name</TableCell>
                                    <TableCell align="right">Financial Institution</TableCell>
                                    <TableCell align="right">Currency</TableCell>
                                    <TableCell align="right">Current Balance</TableCell>
                                    <TableCell align="right">Edit</TableCell>
                                </>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {isMobile ? (
                                <>
                                    <TableCell component="th" scope="row">{accountName}</TableCell>
                                    <TableCell align="right">{formattedBalance}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={onEdit} size="small">
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell component="th" scope="row">{accountName}</TableCell>
                                    <TableCell align="right">{financialInstitution}</TableCell>
                                    <TableCell align="right">{accountCurrency}</TableCell>
                                    <TableCell align="right">{formattedBalance}</TableCell>
                                    <TableCell align="right">
                                    <IconButton onClick={onEdit} size="small">
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                </>
                            )}
                        </TableRow>
                        {/* Add additional rows for the table body if needed */}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
);
};
export default AccountCard;



