# Practice 02 - Carousel Circular Doubly Linked List

This project is a React application that implements a fully functional product carousel powered by a **Circular Doubly Linked List** data structure.

## How to Run

1. Clone the repository and checkout the `05-Practice-02-Carousel` branch.
2. Open a terminal in the project root folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Circular Doubly Linked List

The carousel relies on a `CircularDoublyLinkedList` where:
- Each node has a `value` (the product data), a `next` pointer, and a `prev` pointer.
- **Circular logic:** 
  - The `tail` (last node) has its `.next` pointer set to the `head` (first node).
  - The `head` has its `.prev` pointer set to the `tail`.
  - This guarantees that navigating "Next" from the last product seamlessly wraps around to the first, and "Previous" from the first product wraps around to the last product without explicitly checking bounds in the UI logic.

## Auto-Play logic with `useEffect`

The carousel advances automatically every 2.5 seconds using a `setInterval` inside a `useEffect` hook in `App.jsx`:
- The interval simply updates the `currentNode` to `currentNode.next`. Thanks to the underlying circular structure, it never reaches a "null" end state.
- **Cleanup:** We return a cleanup function `() => clearInterval(intervalId)` inside the hook to prevent memory leaks or duplicate timers whenever the component re-renders or unmounts.
- **User Interaction:** If the user manually clicks "Next" or "Previous", the auto-play pauses so the user can control the carousel at their own pace.

## Communication between Components

The application follows a simple Parent-Child component pattern:
- **`App.jsx` (Parent):** Instantiates the Circular Doubly Linked List, manages the `currentNode` state, controls auto-play logic, and defines navigation handlers (`handleNext`, `handlePrev`).
- **`ProductCarousel.jsx` (Child):** Operates purely functionally to present the UI. It receives the active `product`, current index numbers, and the `onNext` / `onPrev` function handlers via React `props`. When buttons are clicked, it triggers the callback functions passed by its parent.
