//..src/lib/Juno/fetchTotalIncomes.ts
import {listDocs} from "@junobuild/core-peer";

interface ExpensesItem {
    amount: number;
}
export const fetchTotalExpenses = async () => {
    try {
        const expensesData = await listDocs({ collection: "Expenses" });
        const accountsData = await listDocs({ collection: "Accounts" });
        console.log("accountsData", accountsData);
        console.log("expensesData", expensesData);
        if (expensesData && expensesData.items) {
            // Directly return the total
            return expensesData.items.reduce((acc, item) => {
                const expense = item.data as ExpensesItem;
                return acc + expense.amount;
            }, 0);
        } else {
            console.error("No expense records found.");
            return 0;
        }
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return 0;
    }
};
