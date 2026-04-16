import { createContext, useEffect, useMemo, useState } from 'react';
import { createDefaultTree, flattenTree, treeFromSerializable } from '../structures/naryTree';
import { readStoredTree, saveTree } from '../services/treeDatabase';
import { useAuth } from '../hooks/useAuth';

export const FileSystemContext = createContext(null);

function buildNodePayload({ name, type, createdBy }) {
    return {
        id: `${type}-${crypto.randomUUID()}`,
        name: name.trim(),
        type,
        createdBy,
        createdAt: new Date().toISOString(),
        children: []
    };
}

export function FileSystemProvider({ children }) {
    const { user, isAuthenticated, authLoading } = useAuth();
    const [treeData, setTreeData] = useState(null);
    const [selectedNodeId, setSelectedNodeId] = useState('root');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authLoading) {
            return undefined;
        }

        if (!isAuthenticated || !user) {
            setTreeData(null);
            setSelectedNodeId('root');
            setIsLoading(false);
            return undefined;
        }

        let ignore = false;
        setIsLoading(true);

        async function loadTree() {
            try {
                const storedTree = await readStoredTree();
                const defaultTree = createDefaultTree(user.email).serialize();
                const nextTree = storedTree ?? defaultTree;

                if (!storedTree) {
                    await saveTree(nextTree, user.email);
                }

                if (!ignore) {
                    setTreeData(nextTree);
                }
            } catch {
                if (!ignore) {
                    setTreeData(createDefaultTree(user.email).serialize());
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        loadTree();

        return () => {
            ignore = true;
        };
    }, [authLoading, isAuthenticated, user]);

    const tree = useMemo(() => {
        if (!treeData) return null;
        return treeFromSerializable(treeData);
    }, [treeData]);

    const selectedNode = useMemo(() => {
        if (!tree) return null;
        return tree.findNode(selectedNodeId) ?? tree.root;
    }, [selectedNodeId, tree]);

    const stats = useMemo(() => {
        if (!tree) {
            return {
                totalNodes: 0,
                folders: 0,
                files: 0
            };
        }

        const counters = tree.countByType();

        return {
            totalNodes: counters.folders + counters.files,
            folders: counters.folders,
            files: counters.files
        };
    }, [tree]);

    const allNodes = useMemo(() => {
        if (!tree) return [];
        return flattenTree(tree.root);
    }, [tree]);

    const createNode = async ({ name, type, parentId }) => {
        if (!user) {
            return {
                success: false,
                message: 'Debes iniciar sesion con un usuario registrado para crear elementos.'
            };
        }

        if (!name.trim()) {
            return {
                success: false,
                message: 'El nombre no puede estar vacio.'
            };
        }

        try {
            const nextTree = treeFromSerializable(treeData);
            const newNode = nextTree.insert(
                parentId,
                buildNodePayload({
                    name,
                    type,
                    createdBy: user.email
                })
            );

            const serializedTree = nextTree.serialize();
            setTreeData(serializedTree);
            setSelectedNodeId(newNode.id);
            await saveTree(serializedTree, user.email);

            return {
                success: true,
                message: `${type === 'folder' ? 'Carpeta' : 'Archivo'} creado correctamente en Firestore.`
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    };

    const deleteNode = async (nodeId) => {
        try {
            const nextTree = treeFromSerializable(treeData);
            const parentNode = nextTree.findParent(nodeId);
            nextTree.remove(nodeId);

            const serializedTree = nextTree.serialize();
            setTreeData(serializedTree);
            setSelectedNodeId(parentNode?.id ?? 'root');
            await saveTree(serializedTree, user?.email ?? 'sistema');

            return {
                success: true,
                message: 'Elemento eliminado correctamente.'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    };

    const value = useMemo(
        () => ({
            tree,
            selectedNode,
            selectedNodeId,
            setSelectedNodeId,
            isLoading,
            stats,
            allNodes,
            createNode,
            deleteNode
        }),
        [allNodes, isLoading, selectedNode, selectedNodeId, stats, tree]
    );

    return <FileSystemContext.Provider value={value}>{children}</FileSystemContext.Provider>;
}
