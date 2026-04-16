import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <main className="login-shell">
            <section className="login-card">
                <p className="eyebrow">Ruta no encontrada</p>
                <h1>La pagina solicitada no existe</h1>
                <p>Regresa al inicio de sesion o vuelve al panel principal.</p>
                <Link className="primary-button link-button" to="/login">
                    Volver al login
                </Link>
            </section>
        </main>
    );
}

export default NotFoundPage;
