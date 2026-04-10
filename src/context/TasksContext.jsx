import { createContext } from 'react';
import { useTasksCollection } from '../hooks/useTasksCollection';
import { useAuth } from '../hooks/useAuth';

export const TasksContext = createContext(null);

export function TasksProvider({ children }) {
    const { user } = useAuth();
    const value = useTasksCollection(user);

    return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}
