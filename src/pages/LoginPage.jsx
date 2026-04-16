import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const EMPTY_FORM = {
    email: '',
    password: ''
};

function LoginPage() {
    const { login, isAuthenticated, registeredUsers } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState(EMPTY_FORM);
    const [message, setMessage] = useState(
        'Ingresa con un usuario registrado para administrar el arbol.'
    );

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
                    <p className="eyebrow">Parcial 2</p>
                    <h1>Login del gestor jerarquico</h1>
                    <p>
                        Aplicacion web con autenticacion mock, arbol n-ario hecho desde
                        cero y persistencia en base de datos del navegador.
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label>
                        Correo
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="juan_cam.ballesteros@uao.edu.co"
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="123456"
                        />
                    </label>

                    <button type="submit" className="primary-button">
                        Ingresar
                    </button>
                </form>

                <div className="credentials-box">
                    <span>Usuarios registrados</span>
                    {registeredUsers.map((registeredUser) => (
                        <div key={registeredUser.email} className="credential-row">
                            <strong>{registeredUser.email}</strong>
                            <small>{registeredUser.password}</small>
                        </div>
                    ))}
                </div>

                <p className="status-message">{message}</p>
            </section>
        </main>
    );
}

export default LoginPage;
