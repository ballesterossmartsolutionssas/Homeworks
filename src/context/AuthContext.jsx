import { createContext } from 'react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const value = useFirebaseAuth();

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
