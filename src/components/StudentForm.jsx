import { useState } from 'react';

export default function StudentForm({ onAdd, list }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !age || !code) {
            setError('All fields are required.');
            return;
        }
        if (isNaN(age) || Number(age) <= 0) {
            setError('Age must be a number greater than 0.');
            return;
        }
        if (list.exists(code)) {
            setError('A student with this code already exists.');
            return;
        }

        onAdd({ name, age: Number(age), code });
        setName('');
        setAge('');
        setCode('');
        setError('');
    };

    return (
        <div className="form-container">
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                    />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="e.g. 20"
                    />
                </div>
                <div className="form-group">
                    <label>Code</label>
                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="e.g. STU001"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}
