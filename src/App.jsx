import { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { BinaryTree } from './structures/BinaryTree';

const seedValues = [50, 25, 75, 10, 30, 60, 90, 27, 55, 80];

const tree = new BinaryTree();
seedValues.forEach((value) => tree.insert(value));

const traversals = {
    inOrder: tree.inOrder(),
    postOrder: tree.postOrder(),
    preOrder: tree.preOrder()
};

const treeData = tree.toD3();

function App() {
    const [searchValue, setSearchValue] = useState('27');
    const [treeOrigin, setTreeOrigin] = useState({ x: 480, y: 80 });

    const numericValue = Number(searchValue);
    const canSearch = searchValue !== '' && Number.isFinite(numericValue);
    const containsValue = canSearch ? tree.contains(numericValue) : false;

    const logTraversals = () => {
        console.log('Challenge 08 - Binary Tree');
        console.log('Inserted values:', seedValues.join(', '));
        console.log('Inorder:', traversals.inOrder.join(', '));
        console.log('Postorder:', traversals.postOrder.join(', '));
        console.log('Preorder:', traversals.preOrder.join(', '));
    };

    useEffect(() => {
        logTraversals();
    }, []);

    useEffect(() => {
        const updateOrigin = () => {
            const isCompact = window.innerWidth < 900;
            setTreeOrigin({
                x: isCompact ? 190 : 480,
                y: 70
            });
        };

        updateOrigin();
        window.addEventListener('resize', updateOrigin);

        return () => {
            window.removeEventListener('resize', updateOrigin);
        };
    }, []);

    return (
        <main className="page-shell">
            <section className="hero-card">
                <div>
                    <p className="hero-kicker">Challenge 08</p>
                    <h1>Binary Tree Explorer</h1>
                    <p className="hero-copy">
                        Insercion, recorridos clasicos, busqueda de valores y visualizacion
                        con `react-d3-tree`.
                    </p>
                </div>

                <button type="button" className="ghost-button" onClick={logTraversals}>
                    Imprimir recorridos en consola
                </button>
            </section>

            <section className="info-grid">
                <article className="panel-card">
                    <p className="section-tag">Valores insertados</p>
                    <h2>Serie base del arbol</h2>
                    <div className="chip-list">
                        {seedValues.map((value) => (
                            <span key={value} className="number-chip">
                                {value}
                            </span>
                        ))}
                    </div>

                    <div className="search-box">
                        <label htmlFor="tree-search">Buscar valor en el arbol</label>
                        <input
                            id="tree-search"
                            type="number"
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                            placeholder="27"
                        />
                        <p className={`search-result ${containsValue ? 'success' : 'warning'}`}>
                            {canSearch
                                ? containsValue
                                    ? `El valor ${numericValue} si existe en el arbol.`
                                    : `El valor ${numericValue} no existe en el arbol.`
                                : 'Ingresa un numero para usar el metodo contains.'}
                        </p>
                    </div>
                </article>

                <article className="panel-card">
                    <p className="section-tag">Recorridos</p>
                    <h2>Resultados del arbol</h2>
                    <div className="traversal-stack">
                        <div>
                            <span>Inorder</span>
                            <strong>{traversals.inOrder.join(' -> ')}</strong>
                        </div>
                        <div>
                            <span>Postorder</span>
                            <strong>{traversals.postOrder.join(' -> ')}</strong>
                        </div>
                        <div>
                            <span>Preorder</span>
                            <strong>{traversals.preOrder.join(' -> ')}</strong>
                        </div>
                    </div>
                </article>
            </section>

            <section className="tree-card">
                <div className="tree-header">
                    <div>
                        <p className="section-tag">Visualizacion</p>
                        <h2>Estructura del arbol binario</h2>
                    </div>
                    <p className="tree-note">
                        Cada nodo se muestra segun su posicion como hijo izquierdo o derecho.
                    </p>
                </div>

                <div className="tree-canvas">
                    <Tree
                        data={treeData}
                        translate={treeOrigin}
                        orientation="vertical"
                        pathFunc="step"
                        collapsible={false}
                        zoomable={false}
                        separation={{ siblings: 1.4, nonSiblings: 1.8 }}
                    />
                </div>
            </section>
        </main>
    );
}

export default App;
