//../src/components/TransactionsList.tsx
import React from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

interface ErrorType {
    message: string;
}

const TransactionsList: React.FC = () => {
/*    const { data, isLoading, error } = useContractEvents(contract);

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {(error as ErrorType).message}</Typography>;*/

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Transactions
            </Typography>
            {/*{data && data.map((event, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Event: {event.eventName}
                        </Typography>
                        <Typography color="textSecondary">
                            Block Number: {event.transaction.blockNumber}
                        </Typography>
                        <Typography color="textSecondary">
                            Transaction Hash: {event.transaction.transactionHash}
                        </Typography>
                         ... any other data you want to display
                    </CardContent>
                </Card>
            ))}*/}
        </div>
    );
}

export default TransactionsList;
