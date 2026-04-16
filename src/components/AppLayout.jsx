import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function AppLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <main className="app-shell">
            <header className="topbar">
                <div>
                    <p className="eyebrow">Parcial 2</p>
                    <h1>Sistema jerarquico de carpetas y archivos</h1>
                    <p className="topbar-copy">
                        Arbol n-ario, autenticacion mock y persistencia en IndexedDB.
                    </p>
                </div>

                <div className="topbar-actions">
                    <div className="user-pill">
                        <span>Usuario autenticado</span>
                        <strong>{user?.username}</strong>
                        <small>{user?.email}</small>
                    </div>

                    <button type="button" className="ghost-button" onClick={handleLogout}>
                        Cerrar sesion
                    </button>
                </div>
            </header>

            <nav className="nav-panel">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                    Resumen
                </NavLink>
                <NavLink
                    to="/explorer"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                    Explorador
                </NavLink>
            </nav>

            <Outlet />
        </main>
    );
}

export default AppLayout;
