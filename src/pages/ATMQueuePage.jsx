import { useState } from 'react';
import { Queue } from '../structures/queue';

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

const formatCurrency = (value) =>
    new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    }).format(value);

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

function ATMQueuePage() {
    const [atmQueue] = useState(() => {
        const queue = new Queue();
        INITIAL_PEOPLE.forEach((person) => queue.enqueue(person));
        return queue;
    });
    const [form, setForm] = useState(EMPTY_FORM);
    const [message, setMessage] = useState('Cola inicial cargada con datos mock.');
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
            setMessage('Ingresa un nombre y un monto de retiro valido.');
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
        setMessage(`Persona agregada a la cola: ${payload.name}.`);
        forceRender();
    };

    const handleDequeue = () => {
        const nextPerson = atmQueue.dequeue();

        if (!nextPerson) {
            setMessage('La cola esta vacia. No hay personas por atender.');
            return;
        }

        setMessage(`Turno atendido: ${nextPerson.name}.`);
        forceRender();
    };

    return (
        <section className="page-card">
            <div className="section-heading">
                <div>
                    <p className="panel-label">Private Page 02</p>
                    <h2>ATM Queue</h2>
                </div>
                <button type="button" className="ghost-button" onClick={handleDequeue}>
                    Atender siguiente
                </button>
            </div>

            <div className="workspace-grid">
                <article className="panel">
                    <h3>Formulario de personas</h3>
                    <form className="resource-form" onSubmit={handleSubmit}>
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
                    <p className="status-message">{message}</p>
                </article>

                <article className="panel">
                    <div className="summary-box">
                        <span>Peek actual</span>
                        <strong>
                            {firstPerson
                                ? `${firstPerson.name} | ${formatCurrency(firstPerson.withdrawalAmount)}`
                                : 'Sin personas en cola'}
                        </strong>
                    </div>

                    <div className="resource-list">
                        {queue.length > 0 ? (
                            queue.map((person, index) => (
                                <article
                                    key={person.id}
                                    className={`resource-card ${index === 0 ? 'resource-card-highlight' : ''}`}
                                >
                                    <div className="resource-tag">
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
            </div>
        </section>
    );
}

export default ATMQueuePage;
