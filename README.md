# Practice 03 - Turner System (Circular Linked List)

This React application simulates a bank/clinic turner queue system using a **Circular Linked List**.

## How to Run

1. Clone the repository and checkout the `06-Practice-03-TurnerSystem` branch.
2. Open a terminal in the project root folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Circular Linked List Implementation

The Turner System uses a `CircularLinkedList` directly in the React state:
- Each incoming turn is encapsulated in a `Node` containing the number and name, and a `next` pointer.
- **Circular Logic:**
  - Standard Singly Linked Lists point the final item's `next` to `null`.
  - In a Circular Linked List, the `tail` node pointer `next` is always linked back to the `head` node.
  - Thus, when the system reaches the "last turn" in the queue, clicking "Call Next Turn" will flawlessly loop back to the first turn that was added.

## Communication between Components (Props)

The application demonstrates React component architecture with props passing:
- **`App.jsx`**: Acts as the smart container. It holds the `turnList` (the Circular Linked List), the `currentNode` currently being served, and manages all state mutation handlers.
- **`TurnerDisplay.jsx`**: A purely presentational child component that receives `currentTurn` and `totalTurns` as props to render the numerical UI.
- **`TurnerControls.jsx`**: Receives an `onAddTurn` callback function from the parent (to push data upwards to App) and an `onNextTurn` callback to trigger the pointer traversal natively in the Parent state. 

## `useEffect` Side Effects

Per the requirements, a `useEffect` hook operates in `App.jsx` specifically "listening" to the `currentNode` variable. Every time the current turn pointer changes (whether it's the first initialization or traversing to the next turn via the circular list), a system update message is accurately logged to the browser's console indicating who is currently being served.
