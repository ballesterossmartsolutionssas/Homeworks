import { useMemo, useState } from 'react';
import { useFileSystem } from '../hooks/useFileSystem';

const INITIAL_FORM = {
    name: '',
    type: 'folder'
};

function FileManagerPage() {
    const {
        tree,
        selectedNode,
        selectedNodeId,
        setSelectedNodeId,
        isLoading,
        stats,
        createNode,
        deleteNode
    } = useFileSystem();
    const [form, setForm] = useState(INITIAL_FORM);
    const [feedback, setFeedback] = useState('Selecciona una carpeta para crear un nuevo nodo.');
    const isFolderSelected = selectedNode?.type === 'folder';

    const currentPath = useMemo(() => {
        if (!tree || !selectedNode) return '';

        return tree
            .getPath(selectedNode.id)
            .map((node) => node.name)
            .join(' / ');
    }, [selectedNode, tree]);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await createNode({
            name: form.name,
            type: form.type,
            parentId: selectedNodeId
        });

        setFeedback(result.message);

        if (result.success) {
            setForm(INITIAL_FORM);
        }
    };

    const handleDelete = async () => {
        if (!selectedNode || selectedNode.id === 'root') {
            setFeedback('La carpeta raiz no se puede eliminar.');
            return;
        }

        const result = await deleteNode(selectedNode.id);
        setFeedback(result.message);
    };

    if (isLoading) {
        return (
            <section className="page-card">
                <p className="empty-state">Cargando arbol desde IndexedDB...</p>
            </section>
        );
    }

    return (
        <section className="page-card">
            <div className="section-heading">
                <div>
                    <p className="panel-label">Explorador</p>
                    <h2>Gestion visual del arbol n-ario</h2>
                </div>
                <div className="path-chip">{currentPath}</div>
            </div>

            <div className="workspace-grid">
                <article className="panel tree-panel">
                    <div className="tree-panel-header">
                        <div>
                            <p className="panel-label">Jerarquia</p>
                            <h3>Vista del arbol</h3>
                        </div>
                    </div>

                    <div className="tree-scroll">
                        <TreeBranch
                            node={tree.root}
                            selectedNodeId={selectedNodeId}
                            onSelect={setSelectedNodeId}
                        />
                    </div>
                </article>

                <div className="detail-column">
                    <article className="panel">
                        <p className="panel-label">Nodo seleccionado</p>
                        <h3>{selectedNode?.name}</h3>

                        <div className="detail-grid">
                            <div className="detail-box">
                                <span>Tipo</span>
                                <strong>
                                    {selectedNode?.type === 'folder' ? 'Carpeta' : 'Archivo'}
                                </strong>
                            </div>
                            <div className="detail-box">
                                <span>Creador</span>
                                <strong>{selectedNode?.createdBy}</strong>
                            </div>
                            <div className="detail-box">
                                <span>Fecha</span>
                                <strong>{formatDate(selectedNode?.createdAt)}</strong>
                            </div>
                            <div className="detail-box">
                                <span>Hijos directos</span>
                                <strong>{selectedNode?.children.length ?? 0}</strong>
                            </div>
                        </div>

                        <div className="children-section">
                            <p className="panel-label">Contenido</p>
                            {selectedNode?.children.length ? (
                                <div className="child-list">
                                    {selectedNode.children.map((child) => (
                                        <button
                                            key={child.id}
                                            type="button"
                                            className="child-chip"
                                            onClick={() => setSelectedNodeId(child.id)}
                                        >
                                            <span>{child.type === 'folder' ? 'Carpeta' : 'Archivo'}</span>
                                            <strong>{child.name}</strong>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="empty-state inline-empty">
                                    Este nodo no tiene elementos hijos.
                                </p>
                            )}
                        </div>
                    </article>

                    <article className="panel">
                        <p className="panel-label">Crear elemento</p>
                        <h3>Registrar carpeta o archivo</h3>
                        <form className="resource-form" onSubmit={handleSubmit}>
                            <label>
                                Nombre
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Ej: evidencias-parcial"
                                />
                            </label>

                            <label>
                                Tipo
                                <select name="type" value={form.type} onChange={handleChange}>
                                    <option value="folder">Carpeta</option>
                                    <option value="file">Archivo</option>
                                </select>
                            </label>

                            <button type="submit" className="primary-button" disabled={!isFolderSelected}>
                                {isFolderSelected
                                    ? `Crear en ${selectedNode?.name}`
                                    : 'Selecciona una carpeta para crear'}
                            </button>
                        </form>

                        {!isFolderSelected && (
                            <p className="helper-copy">
                                Los archivos no pueden tener hijos. Selecciona una carpeta del
                                arbol para habilitar el registro.
                            </p>
                        )}

                        <button
                            type="button"
                            className="ghost-button danger-button"
                            onClick={handleDelete}
                        >
                            Eliminar nodo seleccionado
                        </button>

                        <p className="status-message">{feedback}</p>
                    </article>

                    <article className="panel stats-panel">
                        <p className="panel-label">Resumen rapido</p>
                        <div className="stats-inline">
                            <div className="stat-chip">
                                <span>Nodos</span>
                                <strong>{stats.totalNodes}</strong>
                            </div>
                            <div className="stat-chip">
                                <span>Carpetas</span>
                                <strong>{stats.folders}</strong>
                            </div>
                            <div className="stat-chip">
                                <span>Archivos</span>
                                <strong>{stats.files}</strong>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}

function TreeBranch({ node, selectedNodeId, onSelect }) {
    const isSelected = node.id === selectedNodeId;

    return (
        <div className="tree-node">
            <button
                type="button"
                className={isSelected ? 'tree-node-button selected' : 'tree-node-button'}
                onClick={() => onSelect(node.id)}
            >
                <span className="tree-node-type">{node.type === 'folder' ? 'Carpeta' : 'Archivo'}</span>
                <strong>{node.name}</strong>
                <small>{node.createdBy}</small>
            </button>

            {node.children.length > 0 && (
                <div className="tree-children">
                    {node.children.map((child) => (
                        <TreeBranch
                            key={child.id}
                            node={child}
                            selectedNodeId={selectedNodeId}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function formatDate(date) {
    if (!date) return 'Sin fecha';

    return new Intl.DateTimeFormat('es-CO', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(new Date(date));
}

export default FileManagerPage;
