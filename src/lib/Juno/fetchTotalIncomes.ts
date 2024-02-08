import { listDocs } from "@junobuild/core-peer";

interface IncomeItem {
    amount_cents_usd: number;
}

export const fetchTotalIncomes = async () => {
    try {
        const incomesData = await listDocs({ collection: "Incomes" });
        if (incomesData && incomesData.items) {
            const totalInCents = incomesData.items.reduce((acc, item) => {
                const income = item.data as IncomeItem;
                return acc + income.amount_cents_usd;
            }, 0);
            return totalInCents / 100;
        } else {
            console.error("No income records found.");
            return 0;
        }
    } catch (error) {
        console.error("Error fetching incomes:", error);
        return 0;
    }
};
