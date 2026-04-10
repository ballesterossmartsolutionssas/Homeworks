import SetupAlert from '../components/SetupAlert';
import TaskComposer from '../components/TaskComposer';
import TaskList from '../components/TaskList';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';

function TasksPage() {
    const { firebaseReady } = useAuth();
    const { tasks, loading, syncMessage, addTask, updateTask, removeTask, toggleTask } =
        useTasks();

    return (
        <section className="tasks-layout">
            <div className="tasks-sidebar">
                <SetupAlert ready={firebaseReady} />

                <article className="glass-card">
                    <p className="section-tag">Context</p>
                    <h2 className="h4 mb-1">Estado compartido</h2>
                    <p className="text-secondary mb-0">
                        El contexto `TasksContext` mantiene la lista disponible en todas las
                        paginas privadas.
                    </p>
                </article>

                <article className="glass-card">
                    <p className="section-tag">Sync status</p>
                    <h2 className="h4 mb-1">{loading ? 'Sincronizando...' : 'Escucha activa'}</h2>
                    <p className="text-secondary mb-0">{syncMessage}</p>
                </article>
            </div>

            <div className="tasks-main">
                <TaskComposer onCreate={addTask} />
                <TaskList
                    tasks={tasks}
                    onToggle={toggleTask}
                    onDelete={removeTask}
                    onUpdate={updateTask}
                />
            </div>
        </section>
    );
}

export default TasksPage;
