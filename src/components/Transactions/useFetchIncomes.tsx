import { useState, useEffect } from 'react';
import { listDocs } from "@junobuild/core-peer";
import { IncomeItem } from "../../types";

export const useFetchIncomes = () => {
    const [incomes, setIncomes] = useState<IncomeItem[]>([]);

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const incomesData = await listDocs({
                    collection: "Incomes"
                });

                if (incomesData && incomesData.items) {
                    const fetchedIncomes = incomesData.items.map(doc => {
                        const data = doc.data as IncomeItem;
                        return {
                            ...data,
                            id: doc.key,
                            created_at: doc.created_at,
                            updated_at: doc.updated_at
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
