# Practice 01 - Students Linked List

This project is a React application that manages a list of students using a simulated **Singly Linked List** data structure.

## How to Run

1. Make sure you have Node.js installed.
2. Clone the repository and checkout the branch `04-Practice-01-Students`.
3. Open a terminal in the project root folder.
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Linked List Simulation

The state of the application is managed in the parent component (`App.jsx`), where instead of storing a simple JavaScript Array, we instantiate a `SinglyLinkedList` class.

- The `SinglyLinkedList` class holds a reference to the `head` and `tail` nodes, and keeps track of its `length`.
- We provide methods like `append(value)` to insert nodes at the end, and `removeByCode(code)` to find and remove nodes while re-linking pointers.
- To make it compatible with React rendering, we provide a `toArray()` method that converts the linked structure into an array passed down as props to the `StudentList` child component.

## `useEffect` and Console Logs

As per the requirements, every time a student is added or removed, a `useEffect` hook in `App.jsx` prints the following information to the console:
- **Action**: Indicates whether the action was `ADDED` or `REMOVED`.
- **List Size**: Current number of nodes directly tracked by the Linked List.
- **List Content**: An Array format stringification of the linked list data so it can be easily read in the browser console.
