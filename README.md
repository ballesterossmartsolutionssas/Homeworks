# Parcial 3 - Spotify Learning Dashboard

React application for a mini educational music platform inspired by Spotify.

## Student

- Juan Camilo Ballesteros Sierra
- Code: 2230721

## Implemented requirements

- Song titles are inserted and stored in a Trie.
- Exact title lookup verifies whether a song exists.
- Prefix search returns predictive song suggestions.
- A Max Heap ranks the most played songs globally and by prefix.
- Related songs are represented with an undirected graph.
- The dashboard uses Sass variables and mixins for reusable visual styles.

## Main structure

- `src/structures/musicPlatform.js`: `TrieNode`, `MusicPlatform`, `MaxHeap`, and `SongGraph`.
- `src/App.jsx`: dashboard for insertion, search, ranking, and recommendations.
- `src/index.scss`: Sass styles for the ranking dashboard.

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
