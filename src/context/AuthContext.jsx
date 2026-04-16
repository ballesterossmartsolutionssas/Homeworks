import { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

const STORAGE_KEY = 'parcial-2-auth';
const REGISTERED_USERS = [
    {
        email: 'juan_cam.ballesteros@uao.edu.co',
        password: '123456',
        username: 'Juan Camilo'
    },
    {
        email: 'admin@parcial.com',
        password: 'admin123',
        username: 'Administrador'
    }
];

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

    const login = ({ email, password }) => {
        const sanitizedEmail = email.trim().toLowerCase();
        const matchedUser = REGISTERED_USERS.find(
            (candidate) =>
                candidate.email === sanitizedEmail && candidate.password === password
        );

        if (!matchedUser) {
            return {
                success: false,
                message: 'Credenciales invalidas. Usa uno de los usuarios registrados.'
            };
        }

        const authenticatedUser = {
            email: matchedUser.email,
            username: matchedUser.username
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
        setUser(authenticatedUser);

        return {
            success: true,
            message: 'Inicio de sesion exitoso.'
        };
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
    };

    const isRegisteredUser = (email) =>
        REGISTERED_USERS.some((candidate) => candidate.email === email.trim().toLowerCase());

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            registeredUsers: REGISTERED_USERS,
            isRegisteredUser,
            login,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
