import { useState } from 'react';

const INITIAL_FORM = {
    title: '',
    description: ''
};

function TaskComposer({ onCreate }) {
    const [form, setForm] = useState(INITIAL_FORM);
    const [message, setMessage] = useState('Crea una tarea nueva para tu tablero.');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setForm((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.title.trim()) {
            setMessage('El titulo es obligatorio.');
            return;
        }

        setSubmitting(true);
        const result = await onCreate(form);
        setSubmitting(false);
        setMessage(result.message);

        if (result.success) {
            setForm(INITIAL_FORM);
        }
    };

    return (
        <article className="glass-card">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                <div>
                    <p className="section-tag">Nueva tarea</p>
                    <h2 className="h4 mb-1">Formulario de creacion</h2>
                    <p className="text-secondary mb-0">
                        Cada registro se guarda en la coleccion `tasks`.
                    </p>
                </div>
            </div>

            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label className="form-label">Titulo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Preparar reto de estructuras"
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">Descripcion</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Explica el objetivo o los detalles de la tarea"
                    />
                </div>

                <div className="col-12 d-grid d-md-flex justify-content-md-end">
                    <button
                        type="submit"
                        className="btn btn-primary rounded-pill px-4"
                        disabled={submitting}
                    >
                        {submitting ? 'Guardando...' : 'Crear tarea'}
                    </button>
                </div>
            </form>

            <p className="feedback-box mt-3 mb-0">{message}</p>
        </article>
    );
}

export default TaskComposer;
