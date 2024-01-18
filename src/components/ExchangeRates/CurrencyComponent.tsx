//src\components\ExchangeRates\CurrencyComponent.tsx
import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";

interface CurrencyContextProps {
    exchangeRates: Record<string, number> | null;
    convertCurrency: (amount: number, fromCurrency: string, toCurrency: string) => number;
    isLoading: boolean; // Add a loading state
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
    const [exchangeRates, setExchangeRates] = useState<Record<string, number> | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Initialize loading state to true

    useEffect(() => {
        const fetchExchangeRates = async () => {
            setIsLoading(true); // Set loading to true before fetching
            try {
                const response = await axios.get('https://v6.exchangerate-api.com/v6/ce6cc71d8e190c15c07255db/latest/USD');
                setExchangeRates(response.data.rates);
            } catch (error) {
                console.error("Failed to fetch exchange rates:", error);
                setExchangeRates({}); // Set to empty object to indicate an error occurred
            } finally {
                setIsLoading(false); // Set loading to false after fetching
            }
        };
        fetchExchangeRates();
    }, []);

    const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string) => {
        if (isLoading) {
            throw new Error("Exchange rates are still loading.");
        }
        if (!exchangeRates || !exchangeRates.hasOwnProperty(fromCurrency) || !exchangeRates.hasOwnProperty(toCurrency)) {
            throw new Error(`Invalid currency code: ${fromCurrency} or ${toCurrency}`);
        }
        const fromRate = exchangeRates[fromCurrency];
        const toRate = exchangeRates[toCurrency];
        return amount * (toRate / fromRate);
     };

    return (
        <CurrencyContext.Provider value={{ exchangeRates, convertCurrency, isLoading }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = (): CurrencyContextProps => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
};