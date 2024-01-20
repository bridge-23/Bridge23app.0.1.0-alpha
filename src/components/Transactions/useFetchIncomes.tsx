// Файл: useFetchIncomes.ts
import { useState, useEffect } from 'react';
import { listDocs } from "@junobuild/core-peer";

type Income = {
    id: string;
    name: string;
    amount: number;
    // Другие поля...
};

export const useFetchIncomes = () => {
    const [incomes, setIncomes] = useState<Income[]>([]);

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const incomesData = await listDocs({
                    collection: "Incomes"
                });

                if (incomesData && incomesData.items) {
                    const fetchedIncomes = incomesData.items.map(doc => {
                        const data = doc.data as Income;
                        return {
                            id: doc.key,
                            name: data.name,
                            amount: data.amount,
                        };
                    });
                    setIncomes(fetchedIncomes);
                } else {
                    console.error("Incomes data is undefined or items are missing");
                }
            } catch (error) {
                console.error("Error fetching incomes:", error);
            }
        };

        fetchIncomes();
    }, []);

    return incomes;
};
