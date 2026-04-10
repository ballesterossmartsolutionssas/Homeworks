import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <main className="auth-shell">
            <section className="auth-card">
                <p className="auth-kicker">404</p>
                <h1>Pagina no encontrada</h1>
                <p className="auth-copy">
                    La ruta solicitada no existe en esta entrega. Vuelve al login o al tablero
                    principal.
                </p>
                <div className="d-flex flex-wrap gap-2">
                    <Link className="btn btn-primary rounded-pill" to="/login">
                        Ir al login
                    </Link>
                    <Link className="btn btn-outline-primary rounded-pill" to="/dashboard">
                        Ir al dashboard
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default NotFoundPage;
