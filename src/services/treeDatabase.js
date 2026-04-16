const DB_NAME = 'parcial-2-tree-db';
const STORE_NAME = 'trees';
const TREE_KEY = 'main-tree';

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = () => {
            const database = request.result;

            if (!database.objectStoreNames.contains(STORE_NAME)) {
                database.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(new Error('No fue posible abrir IndexedDB.'));
    });
}

export async function readStoredTree() {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = database.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(TREE_KEY);

        request.onsuccess = () => resolve(request.result?.tree ?? null);
        request.onerror = () => reject(new Error('No fue posible leer el arbol.'));
    });
}

export async function saveTree(tree) {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = database.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        store.put({
            id: TREE_KEY,
            tree,
            updatedAt: new Date().toISOString()
        });

        transaction.oncomplete = () => resolve(true);
        transaction.onerror = () => reject(new Error('No fue posible guardar el arbol.'));
    });
}
