import { listDocs } from "@junobuild/core-peer";
import { IncomeItem, ExpenseItem } from "../../types";

export async function fetchIncomesFromAPI(): Promise<IncomeItem[]> {
    try {
        const response = await listDocs({
            collection: "Incomes"
        });

        return response.items.map(doc => ({
            ...(doc.data as IncomeItem),
            id: doc.key,
            created_at: doc.created_at,
            updated_at: doc.updated_at,
        }));
    } catch (error) {
        console.error("Error fetching incomes:", error);
        throw error;
    }
}

export async function fetchExpensesFromAPI(): Promise<ExpenseItem[]> {
    try {
        const response = await listDocs({
            collection: "Expenses"
        });

        return response.items.map(doc => ({
            ...(doc.data as ExpenseItem),
            id: doc.key,
            created_at: doc.created_at,
            updated_at: doc.updated_at
        }));
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
    }
}
