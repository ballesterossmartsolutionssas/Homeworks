import { useState } from 'react';

export default function TurnerControls({ onAddTurn, onNextTurn, hasTurns }) {
    const [name, setName] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onAddTurn(name.trim());
            setName('');
        }
    };

    return (
        <div className="controls-container">
            {/* Proceed to Next Turn Button */}
            <button
                className="btn-next"
                onClick={onNextTurn}
                disabled={!hasTurns}
            >
                Call Next Turn &#8594;
            </button>

            <hr style={{ width: '100%', borderColor: '#444', margin: '1rem 0' }} />

            {/* Add New Turn Form */}
            <form className="add-turn-form" onSubmit={handleAdd}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter patient/client name..."
                />
                <button
                    type="submit"
                    className="btn-add"
                    disabled={!name.trim()}
                >
                    + Add
                </button>
            </form>
        </div>
    );
}
