//..src/lib/Juno/fetchTotalIncomes.ts
import {listDocs} from "@junobuild/core-peer";

interface ExpensesItem {
    amount_cents: number;
}

export const fetchTotalExpenses = async () => {
    try {
        const expensesData = await listDocs({ collection: "Expenses" });
        if (expensesData && expensesData.items) {
            const totalInCents = expensesData.items.reduce((acc, item) => {
                const expense = item.data as ExpensesItem;
                return acc + expense.amount_cents_usd;
            }, 0);
            return totalInCents / 100;
        } else {
            console.error("No expense records found.");
            return 0;
        }
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return 0;
    }
};
