// src/contexts/LoadingContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import LoadingComponent from '../components/shared/LoadingComponent';

interface LoadingContextProps {
    setLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps>({
    setLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ setLoading }}>
            {children}
            {isLoading && <LoadingComponent />} {/* Your full-page loading component */}
        </LoadingContext.Provider>
    );
};
