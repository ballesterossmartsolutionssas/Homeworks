import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function AppLayout() {
    const { user, logout, firebaseReady } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    return (
        <main className="app-shell container-xl py-4 py-lg-5">
            <section className="hero-panel mb-4">
                <div>
                    <p className="hero-kicker">Challenge 07</p>
                    <h1>Firebase Task Flow</h1>
                    <p className="hero-copy mb-0">
                        Login, registro y gestion de tareas usando Firebase Authentication,
                        Firestore, Context API y custom hooks.
                    </p>
                </div>

                <div className="hero-user">
                    <span className={`status-dot ${firebaseReady ? 'online' : 'offline'}`} />
                    <div>
                        <small>Sesion activa</small>
                        <strong>{user?.displayName || user?.email?.split('@')[0] || 'Usuario'}</strong>
                        <span>{user?.email}</span>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-light rounded-pill"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </section>

            <nav className="menu-pills mb-4">
                <NavLink
                    to="/tasks"
                    className={({ isActive }) =>
                        isActive ? 'menu-pill menu-pill-active' : 'menu-pill'
                    }
                >
                    Tareas
                </NavLink>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? 'menu-pill menu-pill-active' : 'menu-pill'
                    }
                >
                    Dashboard
                </NavLink>
            </nav>

            <Outlet />
        </main>
    );
}

export default AppLayout;
