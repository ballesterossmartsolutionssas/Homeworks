import { createContext, useEffect, useMemo, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from '../services/firebase';

export const AuthContext = createContext(null);

const DEMO_USERS = [
    {
        email: 'juan_cam.ballesteros@uao.edu.co',
        password: '123456'
    },
    {
        email: 'admin@parcial.com',
        password: 'admin123'
    }
];

function mapAuthUser(firebaseUser) {
    if (!firebaseUser) return null;

    return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        username: firebaseUser.displayName || firebaseUser.email.split('@')[0]
    };
}

function mapAuthError(error) {
    const errorMessages = {
        'auth/invalid-credential': 'Credenciales invalidas. Verifica correo y password.',
        'auth/invalid-email': 'El correo no tiene un formato valido.',
        'auth/missing-password': 'Debes ingresar la contrasena.',
        'auth/too-many-requests': 'Demasiados intentos. Espera un momento e intenta de nuevo.'
    };

    return errorMessages[error.code] || 'No fue posible iniciar sesion con Firebase.';
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(mapAuthUser(firebaseUser));
            setAuthLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async ({ email, password }) => {
        try {
            const credentials = await signInWithEmailAndPassword(
                auth,
                email.trim().toLowerCase(),
                password
            );

            setUser(mapAuthUser(credentials.user));

            return {
                success: true,
                message: 'Inicio de sesion exitoso con Firebase Authentication.'
            };
        } catch (error) {
            return {
                success: false,
                message: mapAuthError(error)
            };
        }
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    const value = useMemo(
        () => ({
            user,
            authLoading,
            isAuthenticated: Boolean(user),
            registeredUsers: DEMO_USERS,
            login,
            logout
        }),
        [authLoading, user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
