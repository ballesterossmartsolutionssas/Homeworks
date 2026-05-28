class TrieNode {
    constructor(value = '') {
        this.value = value;
        this.children = new Map();
        this.isEndOfWord = false;
        this.song = null;
    }
}

class MaxHeap {
    constructor(items = []) {
        this.items = [];
        this.heapify(items);
    }

    size() {
        return this.items.length;
    }

    peek() {
        return this.items[0] ?? null;
    }

    push(item) {
        this.items.push(item);
        this.percolateUp(this.items.length - 1);
    }

    pop() {
        if (this.items.length === 0) {
            return null;
        }

        if (this.items.length === 1) {
            return this.items.pop();
        }

        const root = this.items[0];
        this.items[0] = this.items.pop();
        this.percolateDown(0);
        return root;
    }

    heapify(items) {
        this.items = [...items];

        for (let index = Math.floor(this.items.length / 2) - 1; index >= 0; index -= 1) {
            this.percolateDown(index);
        }
    }

    percolateUp(index) {
        let currentIndex = index;

        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);

            if (this.hasHigherPriority(this.items[parentIndex], this.items[currentIndex])) {
                break;
            }

            this.swap(parentIndex, currentIndex);
            currentIndex = parentIndex;
        }
    }

    percolateDown(index) {
        let currentIndex = index;

        while (currentIndex < this.items.length) {
            const leftIndex = currentIndex * 2 + 1;
            const rightIndex = currentIndex * 2 + 2;
            let nextIndex = currentIndex;

            if (
                leftIndex < this.items.length &&
                this.hasHigherPriority(this.items[leftIndex], this.items[nextIndex])
            ) {
                nextIndex = leftIndex;
            }

            if (
                rightIndex < this.items.length &&
                this.hasHigherPriority(this.items[rightIndex], this.items[nextIndex])
            ) {
                nextIndex = rightIndex;
            }

            if (nextIndex === currentIndex) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }

    swap(firstIndex, secondIndex) {
        [this.items[firstIndex], this.items[secondIndex]] = [
            this.items[secondIndex],
            this.items[firstIndex]
        ];
    }

    hasHigherPriority(leftItem, rightItem) {
        if (leftItem.plays !== rightItem.plays) {
            return leftItem.plays > rightItem.plays;
        }

        return leftItem.title.localeCompare(rightItem.title, 'es', { sensitivity: 'base' }) < 0;
    }
}

class SongGraph {
    constructor() {
        this.nodes = new Map();
    }

    addSong(song) {
        const key = normalizeTitle(song.title);

        if (!this.nodes.has(key)) {
            this.nodes.set(key, {
                song,
                neighbors: new Set()
            });
        } else {
            this.nodes.get(key).song = song;
        }
    }

    connect(firstTitle, secondTitle) {
        const firstKey = normalizeTitle(firstTitle);
        const secondKey = normalizeTitle(secondTitle);

        if (!firstKey || !secondKey || firstKey === secondKey) {
            return;
        }

        if (!this.nodes.has(firstKey) || !this.nodes.has(secondKey)) {
            throw new Error('Both songs must exist before creating a recommendation.');
        }

        this.nodes.get(firstKey).neighbors.add(secondKey);
        this.nodes.get(secondKey).neighbors.add(firstKey);
    }

    getRecommendations(title) {
        const key = normalizeTitle(title);
        const node = this.nodes.get(key);

        if (!node) {
            return [];
        }

        return Array.from(node.neighbors)
            .map((neighborKey) => this.nodes.get(neighborKey)?.song)
            .filter(Boolean)
            .sort((leftSong, rightSong) => {
                if (leftSong.plays !== rightSong.plays) {
                    return rightSong.plays - leftSong.plays;
                }

                return leftSong.title.localeCompare(rightSong.title, 'es', { sensitivity: 'base' });
            });
    }

    getEdges() {
        const edges = [];
        const seen = new Set();

        this.nodes.forEach((node, key) => {
            node.neighbors.forEach((neighborKey) => {
                const edgeKey = [key, neighborKey].sort().join('::');

                if (!seen.has(edgeKey)) {
                    seen.add(edgeKey);
                    edges.push([
                        node.song.title,
                        this.nodes.get(neighborKey).song.title
                    ]);
                }
            });
        });

        return edges.sort((leftEdge, rightEdge) =>
            leftEdge.join('').localeCompare(rightEdge.join(''), 'es', { sensitivity: 'base' })
        );
    }

    getAdjacencyRows() {
        return Array.from(this.nodes.values())
            .map((node) => ({
                song: node.song,
                recommendations: Array.from(node.neighbors)
                    .map((neighborKey) => this.nodes.get(neighborKey)?.song.title)
                    .filter(Boolean)
                    .sort((leftTitle, rightTitle) =>
                        leftTitle.localeCompare(rightTitle, 'es', { sensitivity: 'base' })
                    )
            }))
            .sort((leftRow, rightRow) =>
                leftRow.song.title.localeCompare(rightRow.song.title, 'es', { sensitivity: 'base' })
            );
    }
}

export class MusicPlatform {
    constructor(songs = [], connections = []) {
        this.root = new TrieNode();
        this.songs = new Map();
        this.graph = new SongGraph();

        songs.forEach((song) =>
            this.insertSong(song.title, song.plays, song.artist, song.genre)
        );
        connections.forEach(([firstTitle, secondTitle]) => this.connectSongs(firstTitle, secondTitle));
    }

    insertSong(title, plays, artist = 'Educational Beats', genre = 'Learning') {
        const cleanTitle = normalizeDisplayText(title);
        const cleanArtist = normalizeDisplayText(artist) || 'Educational Beats';
        const cleanGenre = normalizeDisplayText(genre) || 'Learning';
        const cleanPlays = Number(plays);

        if (!cleanTitle) {
            throw new Error('Song title is required.');
        }

        if (!Number.isInteger(cleanPlays) || cleanPlays < 0) {
            throw new Error('Plays must be an integer greater than or equal to 0.');
        }

        let currentNode = this.root;
        const titleKey = normalizeTitle(cleanTitle);

        titleKey.split('').forEach((letter) => {
            if (!currentNode.children.has(letter)) {
                currentNode.children.set(letter, new TrieNode(letter));
            }

            currentNode = currentNode.children.get(letter);
        });

        const song = {
            title: cleanTitle,
            artist: cleanArtist,
            genre: cleanGenre,
            plays: cleanPlays
        };

        currentNode.isEndOfWord = true;
        currentNode.song = song;
        this.songs.set(titleKey, song);
        this.graph.addSong(song);

        return song;
    }

    connectSongs(firstTitle, secondTitle) {
        this.graph.connect(firstTitle, secondTitle);
    }

    songExists(title) {
        const node = this.findTitleNode(title);
        return Boolean(node?.isEndOfWord);
    }

    getSuggestions(prefix) {
        const startNode = this.findPrefixNode(prefix);

        if (!startNode) {
            return [];
        }

        const suggestions = [];
        this.collectSongs(startNode, suggestions);
        return suggestions.sort((leftSong, rightSong) =>
            leftSong.title.localeCompare(rightSong.title, 'es', { sensitivity: 'base' })
        );
    }

    getTopSongs(limit) {
        return this.extractTopK(this.getAllSongs(), limit);
    }

    searchTopK(prefix, limit) {
        return this.extractTopK(this.getSuggestions(prefix), limit);
    }

    getRecommendations(title) {
        return this.graph.getRecommendations(title);
    }

    getAllSongs() {
        return Array.from(this.songs.values()).sort((leftSong, rightSong) =>
            leftSong.title.localeCompare(rightSong.title, 'es', { sensitivity: 'base' })
        );
    }

    getGraphEdges() {
        return this.graph.getEdges();
    }

    getAdjacencyRows() {
        return this.graph.getAdjacencyRows();
    }

    getTrieRows() {
        const rows = [];
        this.walkTrie(this.root, '', 0, rows);
        return rows;
    }

    extractTopK(songs, limit) {
        const cleanLimit = Number(limit);

        if (!Number.isInteger(cleanLimit) || cleanLimit <= 0) {
            return [];
        }

        const heap = new MaxHeap(songs);
        const results = [];

        while (heap.size() > 0 && results.length < cleanLimit) {
            results.push(heap.pop());
        }

        return results;
    }

    findTitleNode(title) {
        const node = this.findPrefixNode(title);

        if (!node) {
            return null;
        }

        return node;
    }

    findPrefixNode(prefix) {
        const cleanPrefix = normalizeTitle(prefix);
        let currentNode = this.root;

        for (const letter of cleanPrefix) {
            currentNode = currentNode.children.get(letter);

            if (!currentNode) {
                return null;
            }
        }

        return currentNode;
    }

    collectSongs(node, suggestions) {
        if (node.isEndOfWord && node.song) {
            suggestions.push(node.song);
        }

        Array.from(node.children.keys())
            .sort()
            .forEach((letter) => this.collectSongs(node.children.get(letter), suggestions));
    }

    walkTrie(node, prefix, depth, rows) {
        if (node !== this.root) {
            rows.push({
                id: `${prefix}-${depth}`,
                letter: node.value,
                prefix,
                depth,
                isEndOfWord: node.isEndOfWord,
                children: Array.from(node.children.keys()).sort()
            });
        }

        Array.from(node.children.keys())
            .sort()
            .forEach((letter) => {
                const child = node.children.get(letter);
                this.walkTrie(child, `${prefix}${letter}`, depth + 1, rows);
            });
    }
}

export function createInitialMusicPlatform() {
    return new MusicPlatform(
        [
            { title: 'Algebra Flow', artist: 'Math Beats', genre: 'Mathematics', plays: 940 },
            { title: 'Algorithm Groove', artist: 'Code Classroom', genre: 'Programming', plays: 880 },
            { title: 'Binary Sunrise', artist: 'Code Classroom', genre: 'Programming', plays: 910 },
            { title: 'Calculus Calm', artist: 'Math Beats', genre: 'Mathematics', plays: 870 },
            { title: 'Cell Biology Bounce', artist: 'Science Lab', genre: 'Biology', plays: 820 },
            { title: 'Geometry Pulse', artist: 'Math Beats', genre: 'Mathematics', plays: 900 },
            { title: 'Grammar Pop', artist: 'Language Studio', genre: 'Language', plays: 790 },
            { title: 'History Lo-Fi', artist: 'Archive Sounds', genre: 'History', plays: 760 },
            { title: 'Physics Waves', artist: 'Science Lab', genre: 'Physics', plays: 930 },
            { title: 'Statistics Swing', artist: 'Data Notes', genre: 'Statistics', plays: 850 }
        ],
        [
            ['Algebra Flow', 'Calculus Calm'],
            ['Algebra Flow', 'Geometry Pulse'],
            ['Algorithm Groove', 'Binary Sunrise'],
            ['Algorithm Groove', 'Statistics Swing'],
            ['Cell Biology Bounce', 'Physics Waves'],
            ['Geometry Pulse', 'Physics Waves'],
            ['Grammar Pop', 'History Lo-Fi'],
            ['Physics Waves', 'Statistics Swing']
        ]
    );
}

function normalizeTitle(value) {
    return normalizeDisplayText(value).toLowerCase();
}

function normalizeDisplayText(value) {
    return String(value ?? '')
        .trim()
        .replace(/\s+/g, ' ');
}

export { MaxHeap, SongGraph, TrieNode };
