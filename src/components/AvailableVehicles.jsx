export default function AvailableVehicles({ vehicles, onRentVehicle }) {
    return (
        <section className="panel">
            <h2>Vehiculos disponibles</h2>

            {vehicles.length === 0 ? (
                <p className="empty-text">No hay vehiculos disponibles.</p>
            ) : (
                <ul className="data-list">
                    {vehicles.map((vehicle) => (
                        <li className="list-item" key={vehicle.id}>
                            <div className="item-info">
                                <strong>{vehicle.plate}</strong>
                                <span>{vehicle.model}</span>
                                <small>{vehicle.type}</small>
                            </div>

                            <button
                                type="button"
                                className="btn-action"
                                onClick={() => onRentVehicle(vehicle.id)}
                            >
                                Alquilar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
