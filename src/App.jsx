import { useState } from 'react';
import { Queue } from './structures/queue';
import './index.css';

const createPastArrivalDate = (minutesAgo) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - minutesAgo);
    return date.toISOString();
};

const createNextArrivalDate = (people) => {
    const latestArrival = people.reduce((latest, person) => {
        if (!latest) return person.arrivalDate;
        return new Date(person.arrivalDate) > new Date(latest) ? person.arrivalDate : latest;
    }, null);

    const nextDate = latestArrival ? new Date(latestArrival) : new Date();
    const randomMinutes = Math.floor(Math.random() * 9) + 1;
    nextDate.setMinutes(nextDate.getMinutes() + randomMinutes);

    return nextDate.toISOString();
};

const formatArrivalDate = (value) =>
    new Intl.DateTimeFormat('es-CO', {
        dateStyle: 'short',
        timeStyle: 'short'
    }).format(new Date(value));

const INITIAL_PEOPLE = [
    {
        id: 1,
        name: 'Laura Diaz',
        withdrawalAmount: 180000,
        arrivalDate: createPastArrivalDate(34)
    },
    {
        id: 2,
        name: 'Sebastian Ruiz',
        withdrawalAmount: 250000,
        arrivalDate: createPastArrivalDate(21)
    },
    {
        id: 3,
        name: 'Camila Mora',
        withdrawalAmount: 90000,
        arrivalDate: createPastArrivalDate(12)
    }
];

const EMPTY_FORM = {
    name: '',
    withdrawalAmount: ''
};

const formatCurrency = (value) =>
    new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    }).format(value);

function App() {
    const [atmQueue] = useState(() => {
        const queue = new Queue();

        INITIAL_PEOPLE.forEach((person) => {
            queue.enqueue(person);
        });

        return queue;
    });
    const [form, setForm] = useState(EMPTY_FORM);
    const [lastAction, setLastAction] = useState('Cola inicial cargada con datos mock.');
    const [, setRenderVersion] = useState(0);

    const queue = atmQueue
        .print()
        .sort((left, right) => new Date(left.arrivalDate) - new Date(right.arrivalDate));
    const firstPerson = atmQueue.peek();

    const forceRender = () => {
        setRenderVersion((prev) => prev + 1);
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = form.name.trim();
        const withdrawalAmount = Number(form.withdrawalAmount);

        if (name === '' || Number.isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
            setLastAction('Ingresa un nombre y un monto de retiro valido.');
            return;
        }

        const payload = {
            id: Date.now(),
            name,
            withdrawalAmount,
            arrivalDate: createNextArrivalDate(atmQueue.print())
        };

        atmQueue.enqueue(payload);
        setForm(EMPTY_FORM);
        setLastAction(`Persona agregada a la cola: ${payload.name}.`);
        forceRender();
    };

    const handleDequeue = () => {
        const nextPerson = atmQueue.dequeue();

        if (!nextPerson) {
            setLastAction('La cola esta vacia. No hay personas por atender.');
            return;
        }

        setLastAction(`Turno atendido: ${nextPerson.name}.`);
        forceRender();
    };

    return (
        <main className="page-shell">
            <section className="hero">
                <div>
                    <p className="eyebrow">Practice 05</p>
                    <h1>ATM Queue</h1>
                    <p className="hero-copy">
                        Implementacion de una cola FIFO para un cajero, con personas que
                        registran nombre y monto de retiro, mientras el sistema asigna
                        automaticamente la fecha de llegada.
                    </p>
                    <p className="author-line">
                        Presentado por: Juan Camilo Ballesteros Sierra - Codigo 2230721
                    </p>
                </div>

                <div className="hero-stats">
                    <article className="stat-card">
                        <span>Total en cola</span>
                        <strong>{atmQueue.size()}</strong>
                    </article>
                    <article className="stat-card">
                        <span>Estado</span>
                        <strong>{atmQueue.isEmpty() ? 'Vacia' : 'Activa'}</strong>
                    </article>
                    <article className="stat-card">
                        <span>Siguiente turno</span>
                        <strong>{firstPerson ? firstPerson.name : 'Sin personas'}</strong>
                    </article>
                </div>
            </section>

            <section className="content-grid">
                <article className="panel">
                    <div className="panel-heading">
                        <div>
                            <p className="panel-label">Formulario</p>
                            <h2>Agregar persona a la cola</h2>
                        </div>
                        <button type="button" className="secondary-button" onClick={handleDequeue}>
                            Atender siguiente
                        </button>
                    </div>

                    <form className="queue-form" onSubmit={handleSubmit}>
                        <label>
                            Nombre
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Ej. Andres Gomez"
                            />
                        </label>

                        <label>
                            Monto de retiro
                            <input
                                type="number"
                                min="1000"
                                step="1000"
                                name="withdrawalAmount"
                                value={form.withdrawalAmount}
                                onChange={handleChange}
                                placeholder="Ej. 150000"
                            />
                        </label>

                        <div className="system-box">
                            <span>Fecha de llegada</span>
                            <strong>Asignada automaticamente por el sistema</strong>
                        </div>

                        <button type="submit" className="primary-button">
                            Enqueue a la cola
                        </button>
                    </form>

                    <p className="status-message">{lastAction}</p>
                </article>

                <article className="panel">
                    <div className="panel-heading">
                        <div>
                            <p className="panel-label">Impresion</p>
                            <h2>Cola ordenada por llegada</h2>
                        </div>
                    </div>

                    <div className="top-preview">
                        <span>Peek actual</span>
                        <strong>
                            {firstPerson
                                ? `${firstPerson.name} | ${formatCurrency(firstPerson.withdrawalAmount)}`
                                : 'La cola no tiene personas'}
                        </strong>
                    </div>

                    <div className="queue-list">
                        {queue.length > 0 ? (
                            queue.map((person, index) => (
                                <article
                                    key={person.id}
                                    className={`person-card ${index === 0 ? 'person-card-front' : ''}`}
                                >
                                    <div className="turn-badge">
                                        <span>{index === 0 ? 'FRONT' : `Turno ${index + 1}`}</span>
                                    </div>
                                    <h3>{person.name}</h3>
                                    <p>Retiro: {formatCurrency(person.withdrawalAmount)}</p>
                                    <p>Llegada: {formatArrivalDate(person.arrivalDate)}</p>
                                </article>
                            ))
                        ) : (
                            <p className="empty-state">
                                La cola esta vacia. Agrega personas desde el formulario.
                            </p>
                        )}
                    </div>
                </article>
            </section>
        </main>
    );
}

export default App;
