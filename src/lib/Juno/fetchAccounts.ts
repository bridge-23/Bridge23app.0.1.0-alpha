//..src/lib/Juno/fetchAccounts.ts
import { useState, useEffect } from 'react';
import { listDocs } from "@junobuild/core-peer";
import {accountDataState } from '../../state/atoms';
import {AccountData} from "../../types";
import {useSetRecoilState} from "recoil";
export const useFetchAccounts = () => {
    const setAccounts = useSetRecoilState(accountDataState);
    //const [accounts, setAccounts] = useState<AccountData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // Change the type of error state
    const fetchAccounts = async () => {
        setLoading(true);
        setError(null);
        try {
            const accountsData = await listDocs({
                collection: "Accounts",
            });

            if (accountsData && accountsData.items) {
                const fetchedAccounts = accountsData.items.map((doc) => ({
                    accountName: (doc.data as AccountData).accountName,
                    financialInstitution: (doc.data as AccountData).financialInstitution,
                    currentBalance: (doc.data as AccountData).currentBalance,
                    currency: (doc.data as AccountData).currency,
                    id: doc.key,
                }));
                setAccounts(fetchedAccounts);
            } else {
                console.error("Accounts data is undefined or items are missing");
                setError("Failed to fetch accounts.");
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
            setError("Failed to fetch accounts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                await fetchAccounts();
            } catch (error) {
                console.error('Error fetching accounts in useEffect:', error);
            }
        })();
    }, []);

    return { loading, error };
};

