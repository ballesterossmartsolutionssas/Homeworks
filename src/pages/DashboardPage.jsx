import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function DashboardPage() {
    const { user } = useAuth();

    return (
        <section className="page-card">
            <div className="section-heading">
                <div>
                    <p className="panel-label">Private Area</p>
                    <h2>Bienvenido, {user?.username}</h2>
                </div>
            </div>

            <p className="section-copy">
                Este dashboard confirma que el usuario ya esta autenticado. Desde aqui
                puedes navegar a las dos paginas privadas que contienen los ejercicios
                anteriores.
            </p>

            <div className="exercise-grid">
                <article className="exercise-card">
                    <p className="panel-label">Practice 04</p>
                    <h3>Books Stack</h3>
                    <p>Gestiona una pila de libros usando metodos LIFO.</p>
                    <Link className="primary-button link-button" to="/books-stack">
                        Ir al ejercicio
                    </Link>
                </article>

                <article className="exercise-card">
                    <p className="panel-label">Practice 05</p>
                    <h3>ATM Queue</h3>
                    <p>Administra la cola del cajero con orden FIFO y fecha de llegada.</p>
                    <Link className="primary-button link-button" to="/atm-queue">
                        Ir al ejercicio
                    </Link>
                </article>
            </div>
        </section>
    );
}

export default DashboardPage;
