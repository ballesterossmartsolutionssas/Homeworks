import { useState, useEffect } from 'react';
import { CircularLinkedList } from './structures/circularLinkedList';
import TurnerDisplay from './components/TurnerDisplay';
import TurnerControls from './components/TurnerControls';
import './index.css';

function App() {
    const [turnList, setTurnList] = useState(new CircularLinkedList());
    const [currentNode, setCurrentNode] = useState(null);
    const [nextTurnNumber, setNextTurnNumber] = useState(1);
    const [trigger, setTrigger] = useState(0);

    // Requirement: Use useEffect to display a message each time the current queue changes
    useEffect(() => {
        if (currentNode) {
            console.log(`[SYSTEM UPDATE] The turn has changed. Now serving turn: ${currentNode.value.number} (${currentNode.value.name})`);
        } else {
            console.log(`[SYSTEM UPDATE] Queue is currently empty.`);
        }
    }, [currentNode]); // Triggers ONLY when currentNode changes

    const handleAddTurn = (name) => {
        const newTurn = {
            number: nextTurnNumber,
            name: name
        };

        turnList.append(newTurn);
        setNextTurnNumber(prev => prev + 1);

        // If the list was empty, auto-start serving the new turn
        if (!currentNode) {
            setCurrentNode(turnList.getHead());
        } else {
            // Force re-render to update the "total turns" display accurately
            setTrigger(prev => prev + 1);
        }
    };

    const handleNextTurn = () => {
        if (currentNode) {
            // Because it's a circular linked list, next is never null.
            // If there's 1 item, next points to itself.
            // If there are N items, next points to the next item, and the last points to head.
            setCurrentNode(currentNode.next);
        }
    };

    return (
        <div className="turner-container">
            <h1>Turn Management System</h1>

            <TurnerDisplay
                currentTurn={currentNode ? currentNode.value : null}
                totalTurns={turnList.size()}
            />

            <TurnerControls
                onAddTurn={handleAddTurn}
                onNextTurn={handleNextTurn}
                hasTurns={turnList.size() > 0}
            />
        </div>
    );
}

export default App;
