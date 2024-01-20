// Файл: useFetchExpenses.ts
import { useState, useEffect } from 'react';
import { listDocs } from "@junobuild/core-peer";

type Expense = {
    id: string;
    name: string;
    amount: number;
    // Другие поля...
};

export const useFetchExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const expensesData = await listDocs({
                    collection: "Expenses"
                });

                if (expensesData && expensesData.items) {
                    const fetchedExpenses = expensesData.items.map(doc => {
                        const data = doc.data as Expense;
                        return {
                            id: doc.key,
                            name: data.name,
                            amount: data.amount,
                        };
                    });
                    setExpenses(fetchedExpenses);
                } else {
                    console.error("Expenses data is undefined or items are missing");
                }
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchExpenses();
    }, []);

    return expenses;
};
