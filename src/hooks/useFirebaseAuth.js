import { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { auth, firebaseReady } from '../firebase/config';

const CONFIG_MESSAGE =
    'Falta configurar Firebase. Completa el archivo .env con las credenciales del proyecto.';

const getFirebaseError = (error) => {
    const code = error?.code || '';

    if (code.includes('invalid-credential') || code.includes('wrong-password')) {
        return 'Credenciales invalidas. Revisa email y password.';
    }

    if (code.includes('email-already-in-use')) {
        return 'Ese correo ya esta registrado.';
    }

    if (code.includes('weak-password')) {
        return 'La password debe tener minimo 6 caracteres.';
    }

    if (code.includes('invalid-email')) {
        return 'El correo ingresado no es valido.';
    }

    return 'No fue posible completar la operacion con Firebase.';
};

export function useFirebaseAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(firebaseReady);

    useEffect(() => {
        if (!firebaseReady || !auth) {
            setLoading(false);
            return undefined;
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async ({ email, password }) => {
        if (!firebaseReady || !auth) {
            return { success: false, message: CONFIG_MESSAGE };
        }

        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
            return { success: true, message: 'Inicio de sesion exitoso.' };
        } catch (error) {
            return { success: false, message: getFirebaseError(error) };
        }
    };

    const register = async ({ name, email, password }) => {
        if (!firebaseReady || !auth) {
            return { success: false, message: CONFIG_MESSAGE };
        }

        try {
            const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);

            if (name.trim()) {
                await updateProfile(credential.user, { displayName: name.trim() });
            }

            return { success: true, message: 'Cuenta creada correctamente.' };
        } catch (error) {
            return { success: false, message: getFirebaseError(error) };
        }
    };

    const logout = async () => {
        if (!firebaseReady || !auth) {
            return;
        }

        await signOut(auth);
    };

    return {
        user,
        loading,
        isAuthenticated: Boolean(user),
        firebaseReady,
        login,
        register,
        logout
    };
}
