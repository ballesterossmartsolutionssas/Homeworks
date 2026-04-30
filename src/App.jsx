import { useMemo, useState } from 'react';
import { ProductSearchEngine, createInitialSearchEngine } from './structures/productSearchEngine';

function App() {
    const [engine, setEngine] = useState(() => createInitialSearchEngine());
    const [productForm, setProductForm] = useState({
        name: '',
        popularity: ''
    });
    const [searchForm, setSearchForm] = useState({
        prefix: 'air',
        limit: 2
    });
    const [message, setMessage] = useState(
        'Products loaded in the Trie. Search a prefix to calculate the Top K with the Heap.'
    );

    const products = engine.getAllProducts();
    const trieRows = engine.getTrieRows();
    const matches = useMemo(
        () => engine.searchByPrefix(searchForm.prefix),
        [engine, searchForm.prefix]
    );
    const topResults = useMemo(
        () => engine.searchTopK(searchForm.prefix, Number(searchForm.limit)),
        [engine, searchForm.prefix, searchForm.limit]
    );
    const topPopularity = Math.max(...products.map((product) => product.popularity), 1);

    const handleProductChange = (event) => {
        const { name, value } = event.target;

        setProductForm((currentForm) => ({
            ...currentForm,
            [name]: value
        }));
    };

    const handleSearchChange = (event) => {
        const { name, value } = event.target;

        setSearchForm((currentForm) => ({
            ...currentForm,
            [name]: value
        }));
    };

    const handleInsertProduct = (event) => {
        event.preventDefault();

        try {
            const nextEngine = new ProductSearchEngine(products);
            const product = nextEngine.insert(productForm.name, Number(productForm.popularity));
            setEngine(nextEngine);
            setProductForm({ name: '', popularity: '' });
            setSearchForm((currentForm) => ({
                ...currentForm,
                prefix: product.name.split(' ')[0]
            }));
            setMessage(`Inserted "${product.name}" with popularity ${product.popularity}.`);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <main className="app-shell">
            <section className="hero-section">
                <div>
                    <p className="eyebrow">Challenge 11</p>
                    <h1>Smart Search Engine</h1>
                    <p className="hero-copy">
                        Product names are stored in a Trie. Prefix matches are ranked with a
                        Max Heap to return the most popular results first.
                    </p>
                </div>

                <div className="hero-metrics" aria-label="Search engine summary">
                    <article>
                        <span>Products</span>
                        <strong>{products.length}</strong>
                    </article>
                    <article>
                        <span>Trie nodes</span>
                        <strong>{trieRows.length}</strong>
                    </article>
                    <article>
                        <span>Matches</span>
                        <strong>{matches.length}</strong>
                    </article>
                </div>
            </section>

            <section className="workspace-grid">
                <aside className="control-panel">
                    <div className="panel-heading">
                        <p className="eyebrow">Trie insert</p>
                        <h2>Add product</h2>
                    </div>

                    <form className="engine-form" onSubmit={handleInsertProduct}>
                        <label>
                            Product name
                            <input
                                type="text"
                                name="name"
                                value={productForm.name}
                                onChange={handleProductChange}
                                placeholder="Example: air zoom"
                            />
                        </label>

                        <label>
                            Popularity
                            <input
                                type="number"
                                name="popularity"
                                min="0"
                                step="1"
                                value={productForm.popularity}
                                onChange={handleProductChange}
                                placeholder="Example: 89"
                            />
                        </label>

                        <button type="submit">Insert product</button>
                    </form>

                    <div className="panel-heading search-heading">
                        <p className="eyebrow">Prefix search</p>
                        <h2>Search Top K</h2>
                    </div>

                    <form className="engine-form search-form">
                        <label>
                            Prefix
                            <input
                                type="text"
                                name="prefix"
                                value={searchForm.prefix}
                                onChange={handleSearchChange}
                                placeholder="air"
                            />
                        </label>

                        <label>
                            Top K
                            <input
                                type="number"
                                name="limit"
                                min="1"
                                max="10"
                                step="1"
                                value={searchForm.limit}
                                onChange={handleSearchChange}
                            />
                        </label>
                    </form>

                    <p className="status-message">{message}</p>
                </aside>

                <section className="results-panel">
                    <div className="panel-heading">
                        <p className="eyebrow">Max Heap result</p>
                        <h2>Top products for "{searchForm.prefix || 'all'}"</h2>
                    </div>

                    {topResults.length > 0 ? (
                        <ol className="top-results">
                            {topResults.map((product, index) => (
                                <li key={product.name}>
                                    <span className="rank">{index + 1}</span>
                                    <div>
                                        <strong>{product.name}</strong>
                                        <span>Popularity {product.popularity}</span>
                                    </div>
                                    <meter min="0" max={topPopularity} value={product.popularity}>
                                        {product.popularity}
                                    </meter>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="empty-copy">No products match that prefix.</p>
                    )}
                </section>
            </section>

            <section className="details-grid">
                <article className="data-panel">
                    <div className="panel-heading compact">
                        <p className="eyebrow">Stored products</p>
                        <h2>Trie words</h2>
                    </div>

                    <ul className="product-list">
                        {products.map((product) => (
                            <li key={product.name}>
                                <strong>{product.name}</strong>
                                <span>{product.popularity}</span>
                            </li>
                        ))}
                    </ul>
                </article>

                <article className="data-panel">
                    <div className="panel-heading compact">
                        <p className="eyebrow">Prefix matches</p>
                        <h2>Before heap ranking</h2>
                    </div>

                    <ul className="match-list">
                        {matches.map((product) => (
                            <li key={product.name}>
                                <span>{product.name}</span>
                                <strong>{product.popularity}</strong>
                            </li>
                        ))}
                    </ul>
                </article>

                <article className="data-panel trie-panel">
                    <div className="panel-heading compact">
                        <p className="eyebrow">Trie traversal</p>
                        <h2>Nodes and paths</h2>
                    </div>

                    <ul className="trie-list">
                        {trieRows.map((row) => (
                            <li key={row.id} style={{ '--depth': row.depth }}>
                                <span className={row.isEndOfWord ? 'node-letter end-word' : 'node-letter'}>
                                    {row.letter === ' ' ? 'space' : row.letter}
                                </span>
                                <strong>{row.prefix}</strong>
                                <small>
                                    {row.children.length > 0
                                        ? `children: ${row.children
                                              .map((letter) => (letter === ' ' ? 'space' : letter))
                                              .join(', ')}`
                                        : 'leaf node'}
                                </small>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>
        </main>
    );
}

export default App;
