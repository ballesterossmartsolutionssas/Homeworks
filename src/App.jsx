import { useState, useEffect, useRef } from 'react';
import { SinglyLinkedList } from './structures/singlyLinkedList';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './index.css';

function App() {
    const [studentList, setStudentList] = useState(new SinglyLinkedList());
    // We use a trigger state to force React to re-render since mutating
    // the class instance doesn't change its reference.
    const [trigger, setTrigger] = useState(0);

    // Use a ref to store the last action type for the useEffect requirement
    const lastAction = useRef(null);

    const forceUpdate = () => setTrigger((prev) => prev + 1);

    // Requirement 2: useEffect
    // En el padre, cada vez que se agregue o elimine un estudiante, 
    // imprimir en consola: Acción, Tamaño actual, Contenido de la lista.
    useEffect(() => {
        if (lastAction.current) {
            console.log(`--- [ACTION: ${lastAction.current}] ---`);
            console.log(`Current List Size:`, studentList.length);
            console.log(`List Content:`, JSON.stringify(studentList.toArray(), null, 2));

            // Reset after logging to prevent redundant logs on other renders
            lastAction.current = null;
        }
    }, [trigger, studentList]);

    const handleAddStudent = (studentData) => {
        studentList.append(studentData);
        lastAction.current = 'ADDED';
        forceUpdate();
    };

    const handleDeleteStudent = (code) => {
        const removedNode = studentList.removeByCode(code);
        if (removedNode) {
            lastAction.current = 'REMOVED';
            forceUpdate();
        }
    };

    const studentsArray = studentList.toArray();

    return (
        <div className="container">
            <h1>Practice 01 - Students Linked List</h1>
            <StudentForm onAdd={handleAddStudent} list={studentList} />
            <StudentList students={studentsArray} onDelete={handleDeleteStudent} />
        </div>
    );
}

export default App;
