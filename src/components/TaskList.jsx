import { useState } from 'react';

const EMPTY_EDIT = {
    id: null,
    title: '',
    description: ''
};

function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
    const [editingTask, setEditingTask] = useState(EMPTY_EDIT);

    const startEdit = (task) => {
        setEditingTask({
            id: task.id,
            title: task.title,
            description: task.description || ''
        });
    };

    const cancelEdit = () => {
        setEditingTask(EMPTY_EDIT);
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setEditingTask((current) => ({
            ...current,
            [name]: value
        }));
    };

    const submitEdit = async (event) => {
        event.preventDefault();

        if (!editingTask.title.trim()) {
            return;
        }

        await onUpdate(editingTask.id, editingTask);
        cancelEdit();
    };

    if (!tasks.length) {
        return (
            <article className="glass-card">
                <p className="section-tag">Lista</p>
                <h2 className="h4">No hay tareas todavia</h2>
                <p className="text-secondary mb-0">
                    Crea la primera para ver el CRUD funcionando con Firestore.
                </p>
            </article>
        );
    }

    return (
        <article className="glass-card">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                <div>
                    <p className="section-tag">Lista</p>
                    <h2 className="h4 mb-1">Tareas guardadas</h2>
                    <p className="text-secondary mb-0">
                        Puedes editar, eliminar o marcar cada tarea como completada.
                    </p>
                </div>
                <span className="badge rounded-pill text-bg-dark px-3 py-2">{tasks.length} items</span>
            </div>

            <div className="task-stack">
                {tasks.map((task) => {
                    const isEditing = editingTask.id === task.id;

                    return (
                        <article key={task.id} className={`task-card ${task.done ? 'task-card-done' : ''}`}>
                            {isEditing ? (
                                <form className="row g-3" onSubmit={submitEdit}>
                                    <div className="col-12">
                                        <input
                                            className="form-control"
                                            name="title"
                                            value={editingTask.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            name="description"
                                            value={editingTask.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12 d-flex flex-wrap gap-2">
                                        <button type="submit" className="btn btn-primary rounded-pill">
                                            Guardar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary rounded-pill"
                                            onClick={cancelEdit}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className="d-flex justify-content-between align-items-start gap-3">
                                        <div>
                                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                                <h3 className="h5 mb-0">{task.title}</h3>
                                                <span
                                                    className={`badge rounded-pill ${
                                                        task.done ? 'text-bg-success' : 'text-bg-warning'
                                                    }`}
                                                >
                                                    {task.done ? 'Done' : 'Pending'}
                                                </span>
                                            </div>
                                            <p className="text-secondary mb-0 mt-2">
                                                {task.description || 'Sin descripcion adicional.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2 mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary rounded-pill"
                                            onClick={() => onToggle(task.id, task.done)}
                                        >
                                            {task.done ? 'Marcar pendiente' : 'Marcar done'}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark rounded-pill"
                                            onClick={() => startEdit(task)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger rounded-pill"
                                            onClick={() => onDelete(task.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </>
                            )}
                        </article>
                    );
                })}
            </div>
        </article>
    );
}

export default TaskList;
