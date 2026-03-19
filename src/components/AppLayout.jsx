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
                    <p className="eyebrow">Challenge 06</p>
                    <h1>Demo Login With Private Routes</h1>
                </div>

                <div className="topbar-actions">
                    <div className="user-pill">
                        <span>Usuario actual</span>
                        <strong>{user?.username}</strong>
                        <small>{user?.email}</small>
                    </div>

                    <button type="button" className="ghost-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <nav className="nav-panel">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/books-stack"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                    Practice 04
                </NavLink>
                <NavLink
                    to="/atm-queue"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                    Practice 05
                </NavLink>
            </nav>

            <Outlet />
        </main>
    );
}

export default AppLayout;
