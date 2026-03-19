import { createContext, useEffect, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

const STORAGE_KEY = 'challenge-06-auth';
const VALID_EMAIL = 'user@mail.com';
const VALID_PASSWORD = '123';

const readStoredUser = () => {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) return null;

    try {
        return JSON.parse(storedValue);
    } catch {
        return null;
    }
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => readStoredUser());

    useEffect(() => {
        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            return;
        }

        localStorage.removeItem(STORAGE_KEY);
    }, [user]);

    const login = ({ email, password }) => {
        const sanitizedEmail = email.trim().toLowerCase();

        if (sanitizedEmail !== VALID_EMAIL || password !== VALID_PASSWORD) {
            return {
                success: false,
                message: 'Credenciales invalidas. Usa user@mail.com y 123.'
            };
        }

        setUser({
            email: sanitizedEmail,
            username: sanitizedEmail.split('@')[0]
        });

        return {
            success: true,
            message: 'Inicio de sesion exitoso.'
        };
    };

    const logout = () => {
        setUser(null);
    };

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            login,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
