export default function ActiveInvestors({ investors }) {
    return (
        <section className="panel">
            <h2>Inversionistas activos</h2>

            {investors.length === 0 ? (
                <p className="empty-text">No hay inversionistas activos.</p>
            ) : (
                <ul className="data-list">
                    {investors.map((investor) => (
                        <li className="list-item no-action" key={investor.id}>
                            <div className="item-info">
                                <strong>{investor.name}</strong>
                                <span>{investor.amount}</span>
                                <small>{investor.role}</small>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
