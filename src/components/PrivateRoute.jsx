import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function PrivateRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <main className="auth-shell">
                <section className="auth-card text-center">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-3 mb-0 text-secondary">Validando sesion actual...</p>
                </section>
            </main>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}

export default PrivateRoute;
