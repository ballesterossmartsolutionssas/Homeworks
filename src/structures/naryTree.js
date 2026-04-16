export class TreeNode {
    constructor({
        id,
        name,
        type,
        createdBy,
        createdAt,
        parentId = null,
        children = []
    }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.parentId = parentId;
        this.children = children.map((child) =>
            child instanceof TreeNode ? child : new TreeNode(child)
        );
    }

    isFolder() {
        return this.type === 'folder';
    }
}

export class NaryTree {
    constructor(root) {
        this.root = root instanceof TreeNode ? root : new TreeNode(root);
    }

    findNode(nodeId, currentNode = this.root) {
        if (!currentNode) return null;
        if (currentNode.id === nodeId) return currentNode;

        for (const child of currentNode.children) {
            const foundNode = this.findNode(nodeId, child);

            if (foundNode) {
                return foundNode;
            }
        }

        return null;
    }

    findParent(nodeId, currentNode = this.root) {
        if (!currentNode || !currentNode.children.length) return null;

        for (const child of currentNode.children) {
            if (child.id === nodeId) {
                return currentNode;
            }

            const foundParent = this.findParent(nodeId, child);

            if (foundParent) {
                return foundParent;
            }
        }

        return null;
    }

    insert(parentId, nodeData) {
        const parentNode = this.findNode(parentId);

        if (!parentNode) {
            throw new Error('La carpeta padre no existe.');
        }

        if (!parentNode.isFolder()) {
            throw new Error('Un archivo no puede tener hijos.');
        }

        const normalizedName = nodeData.name.trim().toLowerCase();
        const duplicatedName = parentNode.children.some(
            (child) => child.name.trim().toLowerCase() === normalizedName
        );

        if (duplicatedName) {
            throw new Error('Ya existe un elemento con ese nombre en la carpeta.');
        }

        const nextNode = new TreeNode({
            ...nodeData,
            parentId,
            children: nodeData.type === 'file' ? [] : nodeData.children ?? []
        });

        parentNode.children.push(nextNode);
        parentNode.children.sort(sortNodes);

        return nextNode;
    }

    remove(nodeId) {
        if (this.root.id === nodeId) {
            throw new Error('La carpeta raiz no se puede eliminar.');
        }

        const parentNode = this.findParent(nodeId);

        if (!parentNode) {
            throw new Error('El nodo a eliminar no existe.');
        }

        parentNode.children = parentNode.children.filter((child) => child.id !== nodeId);
    }

    getPath(nodeId) {
        const path = [];
        let currentNode = this.findNode(nodeId);

        while (currentNode) {
            path.unshift(currentNode);
            currentNode = currentNode.parentId ? this.findNode(currentNode.parentId) : null;
        }

        return path;
    }

    countByType() {
        const counters = {
            folders: 0,
            files: 0
        };

        traverseTree(this.root, (node) => {
            if (node.type === 'folder') {
                counters.folders += 1;
                return;
            }

            counters.files += 1;
        });

        return counters;
    }

    serialize() {
        return serializeNode(this.root);
    }
}

export function treeFromSerializable(data) {
    return new NaryTree(new TreeNode(data));
}

export function createDefaultTree(ownerEmail = 'sistema@parcial.local') {
    const now = new Date().toISOString();

    return new NaryTree({
        id: 'root',
        name: 'Mi unidad',
        type: 'folder',
        createdBy: ownerEmail,
        createdAt: now,
        parentId: null,
        children: [
            {
                id: 'folder-projects',
                name: 'Proyectos',
                type: 'folder',
                createdBy: ownerEmail,
                createdAt: now,
                parentId: 'root',
                children: []
            },
            {
                id: 'file-readme',
                name: 'reglas-del-sistema.txt',
                type: 'file',
                createdBy: ownerEmail,
                createdAt: now,
                parentId: 'root',
                children: []
            }
        ]
    });
}

export function flattenTree(rootNode) {
    const items = [];
    traverseTree(rootNode, (node) => {
        items.push(node);
    });
    return items;
}

function traverseTree(node, visitor) {
    visitor(node);
    node.children.forEach((child) => traverseTree(child, visitor));
}

function serializeNode(node) {
    return {
        id: node.id,
        name: node.name,
        type: node.type,
        createdBy: node.createdBy,
        createdAt: node.createdAt,
        parentId: node.parentId,
        children: node.children.map(serializeNode)
    };
}

function sortNodes(leftNode, rightNode) {
    if (leftNode.type !== rightNode.type) {
        return leftNode.type === 'folder' ? -1 : 1;
    }

    return leftNode.name.localeCompare(rightNode.name, 'es', { sensitivity: 'base' });
}
