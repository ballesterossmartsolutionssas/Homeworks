export default function StudentList({ students, onDelete }) {
    if (students.length === 0) {
        return (
            <div className="list-container">
                <h2>Student List</h2>
                <p>No students enrolled yet.</p>
            </div>
        );
    }

    return (
        <div className="list-container">
            <h2>Student List ({students.length})</h2>
            <div className="student-list">
                {students.map((student) => (
                    <div key={student.code} className="student-item">
                        <div className="student-info">
                            <strong>{student.name}</strong>
                            <br />
                            <small>Age: {student.age} | Code: {student.code}</small>
                        </div>
                        <button className="delete-btn" onClick={() => onDelete(student.code)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
