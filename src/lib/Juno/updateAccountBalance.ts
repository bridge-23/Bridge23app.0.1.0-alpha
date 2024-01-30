// ..src/lib/Juno/updateAccountBalance.ts
import { getDoc, setDoc } from "@junobuild/core-peer";
//import { AccountData } from "../../types";
interface AccountData {
    key: string;
    data: {
        accountName: string;
        financialInstitution: string;
        currentBalance: number;
        currency: string;
        owner?: string;
        userId: string;
    };
}
export const updateAccountBalance = async (accountKey: string, transactionAmount: number, transactionType: string): Promise<void> => {
    try {
        // Fetch the current account document
        const accountDocResponse = await getDoc({ collection: "Accounts", key: accountKey });

        if (!accountDocResponse || !accountDocResponse.data) {
            throw new Error('Account not found.');
        }

        // Extracting data from the account document response
        const accountData = accountDocResponse.data as AccountData['data'];
        let updatedBalance;

        // Calculate the updated balance based on the transaction type
        switch (transactionType) {
            case 'Income':
                updatedBalance = accountData.currentBalance + transactionAmount;
                break;
            case 'Expense':
            case 'Transfer': // Assuming Transfer also subtracts from the balance
                updatedBalance = accountData.currentBalance - transactionAmount;
                break;
            default:
                throw new Error(`Unsupported transaction type: ${transactionType}`);
        }

        // Update the account with the new balance
        await setDoc({
            collection: 'Accounts',
            doc: {
                key: accountKey,
                data: {
                    ...accountData,
                    currentBalance: updatedBalance,
                },
            },
        });
    } catch (error) {
        console.error("Error updating account balance:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};
