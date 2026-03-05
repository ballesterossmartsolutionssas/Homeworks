export default function RentalHistory({ history }) {
    return (
        <section className="panel">
            <h2>Historial de alquileres</h2>

            {history.length === 0 ? (
                <p className="empty-text">Todavia no hay alquileres registrados.</p>
            ) : (
                <ul className="data-list">
                    {history.map((record) => (
                        <li className="list-item no-action" key={record.id}>
                            <div className="item-info">
                                <strong>{record.vehicle.plate}</strong>
                                <span>{record.vehicle.model}</span>
                                <small>Alquilado: {record.rentedAt}</small>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
