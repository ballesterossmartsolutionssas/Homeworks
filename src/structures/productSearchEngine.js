class TrieNode {
    constructor(value = '') {
        this.value = value;
        this.children = new Map();
        this.isEndOfWord = false;
        this.product = null;
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

    toArray() {
        return [...this.items];
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
        if (leftItem.popularity !== rightItem.popularity) {
            return leftItem.popularity > rightItem.popularity;
        }

        return leftItem.name.localeCompare(rightItem.name, 'en', { sensitivity: 'base' }) < 0;
    }
}

export class ProductSearchEngine {
    constructor(products = []) {
        this.root = new TrieNode();
        this.products = new Map();
        products.forEach((product) => this.insert(product.name, product.popularity));
    }

    insert(name, popularity) {
        const cleanName = normalizeProductName(name);
        const cleanPopularity = Number(popularity);

        if (!cleanName) {
            throw new Error('Product name is required.');
        }

        if (!Number.isInteger(cleanPopularity) || cleanPopularity < 0) {
            throw new Error('Popularity must be an integer greater than or equal to 0.');
        }

        let currentNode = this.root;

        cleanName.split('').forEach((letter) => {
            if (!currentNode.children.has(letter)) {
                currentNode.children.set(letter, new TrieNode(letter));
            }

            currentNode = currentNode.children.get(letter);
        });

        const product = {
            name: cleanName,
            popularity: cleanPopularity
        };

        currentNode.isEndOfWord = true;
        currentNode.product = product;
        this.products.set(cleanName, product);

        return product;
    }

    searchByPrefix(prefix) {
        const startNode = this.findPrefixNode(prefix);

        if (!startNode) {
            return [];
        }

        const matches = [];
        this.collectProducts(startNode, matches);
        return matches;
    }

    searchTopK(prefix, k) {
        const limit = Number(k);

        if (!Number.isInteger(limit) || limit <= 0) {
            return [];
        }

        const matches = this.searchByPrefix(prefix);
        const heap = new MaxHeap(matches);
        const results = [];

        while (heap.size() > 0 && results.length < limit) {
            results.push(heap.pop());
        }

        return results;
    }

    getAllProducts() {
        return Array.from(this.products.values()).sort((leftProduct, rightProduct) =>
            leftProduct.name.localeCompare(rightProduct.name, 'en', { sensitivity: 'base' })
        );
    }

    getTrieRows() {
        const rows = [];

        this.walkTrie(this.root, '', 0, rows);

        return rows;
    }

    findPrefixNode(prefix) {
        const cleanPrefix = normalizeProductName(prefix);
        let currentNode = this.root;

        for (const letter of cleanPrefix) {
            currentNode = currentNode.children.get(letter);

            if (!currentNode) {
                return null;
            }
        }

        return currentNode;
    }

    collectProducts(node, matches) {
        if (node.isEndOfWord && node.product) {
            matches.push(node.product);
        }

        Array.from(node.children.keys())
            .sort()
            .forEach((letter) => this.collectProducts(node.children.get(letter), matches));
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

export function createInitialSearchEngine() {
    return new ProductSearchEngine([
        { name: 'air max', popularity: 90 },
        { name: 'air force', popularity: 95 },
        { name: 'air jordan', popularity: 85 },
        { name: 'adidas boost', popularity: 80 },
        { name: 'adidas samba', popularity: 88 },
        { name: 'apple watch', popularity: 92 },
        { name: 'amazon echo', popularity: 74 },
        { name: 'nike dunk', popularity: 84 },
        { name: 'new balance 550', popularity: 86 },
        { name: 'air pods', popularity: 91 }
    ]);
}

function normalizeProductName(value) {
    return String(value ?? '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ');
}

export { MaxHeap, TrieNode };
