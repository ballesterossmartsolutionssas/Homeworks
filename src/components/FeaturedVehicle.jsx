export default function FeaturedVehicle({ vehicle }) {
    return (
        <section className="panel featured-panel">
            <h2>Vehiculo destacado</h2>
            {vehicle ? (
                <div className="featured-card">
                    <h3>{vehicle.model}</h3>
                    <p>{vehicle.type}</p>
                    <span>{vehicle.plate}</span>
                    <small>Rota automaticamente cada 5 segundos</small>
                </div>
            ) : (
                <p className="empty-text">No hay vehiculos destacados activos.</p>
            )}
        </section>
    );
}
