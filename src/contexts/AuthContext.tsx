//..src/contexts/AuthContext.tsx
import React, { createContext, useEffect, useState } from "react";
import { authSubscribe, User } from "@junobuild/core-peer";
import ICPSignInButton from "../components/Buttons/ICPSignInButton";
import LoginComponentJuno from "../components/LoginComponentJuno";
import LoadingComponent from "../components/shared/LoadingComponent";
// Define the context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: ExtendedError | null; // Change this to your custom error type
}
// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
});
// Define the error props interface
interface ErrorProps {
  message: string;
  code?: number;
  // ... other properties
}
// Define the custom error class
class ExtendedError extends Error {
  code?: number;
  constructor({ message, code }: ErrorProps) {
    super(message);
    this.code = code;
  }
}
// Define the provider props
interface AuthProps {
  children: React.ReactNode;
}
// Define the provider component
export const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ExtendedError | null>(null);

  useEffect(() => {
    setLoading(true);
    let unsubscribe: () => void = () => {};

    try {
      unsubscribe = authSubscribe((newUser: User | null) => {
        setUser(newUser);
        setLoading(false);
        if (!newUser) {
          console.log("User is signed out or session has expired");
        }
      });
    } catch (error: any) {
      // Use 'any' or perform type checking
      console.error(error.message);
      setError(
        new ExtendedError({ message: "An error occurred", code: error.code })
      );
      setLoading(false);
    }

    // Clean-up function
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : user ? (
        // If the user is authenticated, render the children components
        <>{children}</> // This is a correct use of fragments since you might be wrapping multiple children
      ) : (
        // If not loading, no error, and no user, render the login component
        <LoginComponentJuno />
      )}
    </AuthContext.Provider>
  );
};
