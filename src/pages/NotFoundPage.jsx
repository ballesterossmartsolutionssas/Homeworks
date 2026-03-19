import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <main className="login-shell">
            <section className="login-card">
                <p className="eyebrow">404</p>
                <h1>Pagina no encontrada</h1>
                <p>La ruta que intentaste abrir no existe dentro de esta SPA.</p>
                <Link className="primary-button link-button" to="/dashboard">
                    Ir al dashboard
                </Link>
            </section>
        </main>
    );
}

export default NotFoundPage;
