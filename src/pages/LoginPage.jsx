import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const EMPTY_FORM = {
    email: '',
    password: ''
};

function LoginPage() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState(EMPTY_FORM);
    const [message, setMessage] = useState('Usa user@mail.com y password 123 para ingresar.');

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const from = location.state?.from?.pathname || '/dashboard';

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const result = login(form);
        setMessage(result.message);

        if (result.success) {
            navigate(from, { replace: true });
        }
    };

    return (
        <main className="login-shell">
            <section className="login-card">
                <div className="login-copy">
                    <p className="eyebrow">Challenge 06</p>
                    <h1>Demo Login Page</h1>
                    <p>
                        Inicio de sesion con Context API, Provider, estado global y rutas
                        privadas para acceder a las dos practicas anteriores.
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="user@mail.com"
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="123"
                        />
                    </label>

                    <button type="submit" className="primary-button">
                        Login
                    </button>
                </form>

                <div className="credentials-box">
                    <span>Demo credentials</span>
                    <strong>user@mail.com</strong>
                    <strong>123</strong>
                </div>

                <p className="status-message">{message}</p>
            </section>
        </main>
    );
}

export default LoginPage;
