//..src/lib/Juno/fetchTotalIncomes.ts
import {listDocs} from "@junobuild/core-peer";

interface totalIncomes {
    amount: number;
}
export const fetchTotalIncomes = async () => {
    try {
        const incomesData = await listDocs({ collection: "Incomes" });
        if (incomesData && incomesData.items) {
            // Directly return the total
            return incomesData.items.reduce((acc, item) => {
                const income = item.data as totalIncomes;
                return acc + income.amount;
            }, 0);
        } else {
            console.error("No income records found.");
            return 0;
        }
    } catch (error) {
        console.error("Error fetching incomes:", error);
        return 0;
    }
};