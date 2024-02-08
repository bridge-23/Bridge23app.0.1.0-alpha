import { useState, useEffect } from 'react';

type ExchangeRates = {
    [key: string]: number;
};

export const useExchangeRates = (): { exchangeRates: ExchangeRates; loading: boolean; error: Error | null } => {
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch('https://v6.exchangerate-api.com/v6/9548ea81b15e52da78700ceb/latest/USD');
                const data = await response.json();
                setExchangeRates(data.conversion_rates);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchExchangeRates();
    }, []);

    return { exchangeRates, loading, error };
};
