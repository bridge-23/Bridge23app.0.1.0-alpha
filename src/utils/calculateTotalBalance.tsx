type Account = {
    currency: string;
    currentBalance: number;
};

type ExchangeRates = {
    [key: string]: number;
};

export const calculateTotalBalance = (accounts: Account[], exchangeRates: ExchangeRates, currency: string): number => {
    const totalInUSD = accounts.reduce((sum, account) => {
        const rateToUSD = exchangeRates[account.currency] || 1;
        const usdBalance = rateToUSD !== 0 ? account.currentBalance / rateToUSD : 0;
        return sum + usdBalance;
    }, 0);

    const targetRate = exchangeRates[currency] || 1;
    return currency === 'USD' ? totalInUSD : totalInUSD * targetRate;
};
