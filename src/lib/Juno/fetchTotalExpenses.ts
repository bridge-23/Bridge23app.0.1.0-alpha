//..src/lib/Juno/fetchTotalIncomes.ts
import {listDocs} from "@junobuild/core-peer";
interface totalExpenses{
    amount: number;
}
export const fetchTotalExpenses = async () => {
    try {
        const expensesData = await listDocs({ collection: "Expenses" });
        if (expensesData && expensesData.items) {
            // Directly return the total
            return expensesData.items.reduce((acc, item) => {
                const expense = item.data as totalExpenses;
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