import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SetupAlert from '../components/SetupAlert';
import { useAuth } from '../hooks/useAuth';

const EMPTY_FORM = {
    name: '',
    email: '',
    password: ''
};

function RegisterPage() {
    const { register, isAuthenticated, firebaseReady } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState(EMPTY_FORM);
    const [message, setMessage] = useState(
        'Crea una cuenta para administrar las tareas del challenge.'
    );
    const [submitting, setSubmitting] = useState(false);

    if (isAuthenticated) {
        return <Navigate to="/tasks" replace />;
    }

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setForm((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        const result = await register(form);
        setSubmitting(false);
        setMessage(result.message);

        if (result.success) {
            navigate('/tasks', { replace: true });
        }
    };

    return (
        <main className="auth-shell">
            <section className="auth-card">
                <p className="auth-kicker">Challenge 07</p>
                <h1>Create account</h1>
                <p className="auth-copy">
                    Registro con email/password usando Firebase Authentication.
                </p>

                <SetupAlert ready={firebaseReady} />

                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            placeholder="Juan Camilo"
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            placeholder="dev@mail.com"
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            placeholder="Minimo 6 caracteres"
                        />
                    </div>

                    <div className="col-12 d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg rounded-pill"
                            disabled={submitting}
                        >
                            {submitting ? 'Creando...' : 'Registrar'}
                        </button>
                    </div>
                </form>

                <p className="feedback-box mt-3">{message}</p>

                <p className="auth-switch mb-0">
                    Ya tienes cuenta? <Link to="/login">Inicia sesion aqui</Link>
                </p>
            </section>
        </main>
    );
}

export default RegisterPage;
