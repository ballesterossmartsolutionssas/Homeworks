export default function TurnerDisplay({ currentTurn, totalTurns }) {
    return (
        <div className="display-box">
            {currentTurn ? (
                <>
                    <h2 className="turn-number">{currentTurn.number}</h2>
                    <span className="turn-label">{currentTurn.name}</span>
                    <p className="status-text" style={{ marginTop: '1rem' }}>
                        Serving turn {currentTurn.number} of {totalTurns}
                    </p>
                </>
            ) : (
                <>
                    <h2 className="turn-number">--</h2>
                    <span className="turn-label">Waiting</span>
                    <p className="status-text" style={{ marginTop: '1rem' }}>
                        No turns in queue.
                    </p>
                </>
            )}
        </div>
    );
}
