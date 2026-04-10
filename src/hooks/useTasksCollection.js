import { useEffect, useState } from 'react';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    serverTimestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { db, firebaseReady } from '../firebase/config';

const CONFIG_MESSAGE =
    'Conecta Firebase para sincronizar tareas en tiempo real desde Firestore.';

const emptyResult = {
    success: false,
    message: CONFIG_MESSAGE
};

const sortByCreatedAt = (tasks) =>
    [...tasks].sort((left, right) => {
        const leftTime = left.createdAt?.seconds || 0;
        const rightTime = right.createdAt?.seconds || 0;
        return rightTime - leftTime;
    });

export function useTasksCollection(user) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(Boolean(user?.uid && firebaseReady));
    const [syncMessage, setSyncMessage] = useState('Esperando autenticacion.');

    useEffect(() => {
        if (!firebaseReady || !db || !user?.uid) {
            setTasks([]);
            setLoading(false);
            setSyncMessage(user?.uid ? CONFIG_MESSAGE : 'Inicia sesion para consultar tus tareas.');
            return undefined;
        }

        setLoading(true);

        const tasksQuery = query(collection(db, 'tasks'), where('ownerId', '==', user.uid));
        const unsubscribe = onSnapshot(
            tasksQuery,
            (snapshot) => {
                const taskList = snapshot.docs.map((document) => ({
                    id: document.id,
                    ...document.data()
                }));

                setTasks(sortByCreatedAt(taskList));
                setLoading(false);
                setSyncMessage('Tareas actualizadas en tiempo real.');
            },
            () => {
                setLoading(false);
                setSyncMessage('No fue posible escuchar cambios en Firestore.');
            }
        );

        return unsubscribe;
    }, [user?.uid]);

    const addTask = async ({ title, description }) => {
        if (!firebaseReady || !db || !user?.uid) {
            return emptyResult;
        }

        await addDoc(collection(db, 'tasks'), {
            title: title.trim(),
            description: description.trim(),
            done: false,
            ownerId: user.uid,
            ownerEmail: user.email,
            createdAt: serverTimestamp()
        });

        return { success: true, message: 'Tarea creada correctamente.' };
    };

    const updateTask = async (id, { title, description }) => {
        if (!firebaseReady || !db || !user?.uid) {
            return emptyResult;
        }

        await updateDoc(doc(db, 'tasks', id), {
            title: title.trim(),
            description: description.trim()
        });

        return { success: true, message: 'Tarea actualizada.' };
    };

    const toggleTask = async (id, done) => {
        if (!firebaseReady || !db || !user?.uid) {
            return emptyResult;
        }

        await updateDoc(doc(db, 'tasks', id), { done: !done });
        return { success: true, message: 'Estado actualizado.' };
    };

    const removeTask = async (id) => {
        if (!firebaseReady || !db || !user?.uid) {
            return emptyResult;
        }

        await deleteDoc(doc(db, 'tasks', id));
        return { success: true, message: 'Tarea eliminada.' };
    };

    return {
        tasks,
        loading,
        syncMessage,
        addTask,
        updateTask,
        toggleTask,
        removeTask
    };
}
