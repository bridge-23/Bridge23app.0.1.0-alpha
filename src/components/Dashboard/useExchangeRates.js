import { useEffect, useState } from 'react';

const useExchangeRates = () => {
    const [exchangeRates, setExchangeRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch('https://v6.exchangerate-api.com/v6/9548ea81b15e52da78700ceb/latest/USD');
                const data = await response.json();
                setExchangeRates(data.conversion_rates);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchExchangeRates();
    }, []);

    return { exchangeRates, loading, error };
};
