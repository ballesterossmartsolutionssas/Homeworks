import { useTasks } from '../hooks/useTasks';

function DashboardPage() {
    const { tasks, loading, syncMessage } = useTasks();
    const completedTasks = tasks.filter((task) => task.done).length;
    const pendingTasks = tasks.length - completedTasks;

    return (
        <section className="dashboard-grid">
            <article className="glass-card metric-card">
                <span className="metric-label">Total tasks</span>
                <strong>{tasks.length}</strong>
                <p className="mb-0">Tareas sincronizadas desde Firestore para la sesion actual.</p>
            </article>

            <article className="glass-card metric-card">
                <span className="metric-label">Pending</span>
                <strong>{pendingTasks}</strong>
                <p className="mb-0">Pendientes por completar o revisar.</p>
            </article>

            <article className="glass-card metric-card">
                <span className="metric-label">Done</span>
                <strong>{completedTasks}</strong>
                <p className="mb-0">Marcadas como terminadas.</p>
            </article>

            <article className="glass-card metric-card">
                <span className="metric-label">Realtime state</span>
                <strong>{loading ? 'Syncing...' : 'Connected'}</strong>
                <p className="mb-0">{syncMessage}</p>
            </article>

            <article className="glass-card dashboard-story">
                <p className="section-tag">Resumen</p>
                <h2>Panel general del proyecto</h2>
                <p>
                    La aplicacion usa un contexto exclusivo para autenticacion y otro para
                    datos de tareas. Cada uno delega la logica de Firebase a su propio custom
                    hook para mantener separadas la UI y el acceso a servicios.
                </p>
                <ul className="dashboard-points">
                    <li>Email/password con Firebase Authentication.</li>
                    <li>CRUD de tareas con Firestore y escucha en tiempo real.</li>
                    <li>Rutas privadas, logout y persistencia de sesion administrada por Firebase.</li>
                </ul>
            </article>
        </section>
    );
}

export default DashboardPage;
