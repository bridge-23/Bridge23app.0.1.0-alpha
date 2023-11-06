//..src/pages/accounts/index.tsx
import React, {useState, useEffect, useContext} from 'react';
import NewAccountComponent from "../../components/Accounts/NewAccountComponent";
import AccountsList from "../../components/Dashboard/AccountsList";
import { Container, Grid, Typography } from "@mui/material";
import {listDocs} from "@junobuild/core";
import {AuthContext} from "../../contexts/AuthContext";
interface AccountData {
    accountName: string;
    currentBalance: number;
    currency: string;
    type: string;
    id: string;
}
const Accounts: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [currentMonth, setCurrentMonth] = useState('');
    const [accounts, setAccounts] = useState<AccountData[]>([]);

    useEffect(() => {
        setCurrentMonth(new Date().toLocaleString('default', { month: 'long' }));
        fetchAccounts(); // Call the fetch function on component mount
    }, []);
    /*const handleEdit = (accountId: string) => {
        // Implement your edit logic here
        console.log('Editing account with ID:', accountId);
    };*/
    const fetchAccounts = async () => {
        try {
            const accountsData = await listDocs({
                collection: "Accounts"
            });

            if (accountsData && accountsData.items) {
                const fetchedAccounts = accountsData.items.map(doc => {
                    const data = doc.data as AccountData;
                    return {
                        accountName: data.accountName,
                        currentBalance: data.currentBalance,
                        currency: data.currency,
                        type: data.type, // Make sure that this value exists in your fetched data
                        id: doc.key
                    };
                });
                setAccounts(fetchedAccounts); // Update the component's state with the fetched accounts
            } else {
                console.error("Accounts data is undefined or items are missing");
                alert('Failed to fetch accounts. Please try again.');
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
            alert('Failed to fetch accounts. Please try again.');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {currentMonth ? `Accounts for ${currentMonth}` : 'Loading...'}
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <NewAccountComponent />
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    <AccountsList accounts={accounts} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Accounts;


