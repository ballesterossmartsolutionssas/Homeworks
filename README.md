# Challenge 11 - Tries and Heaps

React application for a smart product search engine. Product names are stored in a Trie and prefix search results are ranked with a Max Heap to return the Top K most popular products.

## Student

- Juan Camilo Ballesteros Sierra
- Code: 2230721

## Implemented requirements

- Products are inserted in a Trie with `name` and `popularity`.
- Search supports prefixes such as `air`, `adi`, or `new`.
- `searchTopK(prefix, k)` returns the most popular products for the prefix.
- A Max Heap ranks results by popularity.
- The UI allows inserting or updating products.
- The UI shows all stored products, prefix matches before ranking, Top K results, and a Trie traversal.

## Main structure

- `src/structures/productSearchEngine.js`: `TrieNode`, `ProductSearchEngine`, and `MaxHeap` implementation.
- `src/App.jsx`: main interface for inserting products and running prefix searches.
- `src/index.css`: styling for the challenge.

## Local execution

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Validate production build:
   ```bash
   npm run build
   ```
