import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { menuNodeCount, menuRoutes, sidebarNodes } from './data/menuTree.jsx';

function MenuBranch({ node, level = 0 }) {
    return (
        <div className="branch-block">
            <NavLink
                to={node.link}
                className={({ isActive }) =>
                    isActive ? 'menu-item menu-item-active' : 'menu-item'
                }
                style={{ paddingLeft: `${1 + level * 1.1}rem` }}
            >
                {node.title}
            </NavLink>

            {node.children.length > 0 && (
                <div className="branch-children">
                    {node.children.map((child) => (
                        <MenuBranch key={child.link} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

function App() {
    return (
        <main className="layout-shell">
            <aside className="sidebar-panel">
                <div className="sidebar-head">
                    <p className="sidebar-kicker">Challenge 09</p>
                    <h1>N-ary Sidebar</h1>
                    <p>
                        El menu lateral se genera recorriendo un arbol n-ario compuesto por
                        nodos con `title`, `link` y `component`.
                    </p>
                </div>

                <div className="stats-card">
                    <span>Total nodes</span>
                    <strong>{menuNodeCount}</strong>
                    <small>Raiz + menus + submenus</small>
                </div>

                <nav className="menu-tree">
                    {sidebarNodes.map((node) => (
                        <MenuBranch key={node.link} node={node} />
                    ))}
                </nav>
            </aside>

            <section className="content-panel">
                <header className="content-hero">
                    <div>
                        <p className="section-label">Renderizado recursivo</p>
                        <h2>Menu lateral conectado a rutas</h2>
                    </div>
                    <p>
                        Cada rama del sidebar pinta sus hijos recursivamente y cada ruta
                        renderiza el componente almacenado en el nodo.
                    </p>
                </header>

                <Routes>
                    <Route path="/" element={<Navigate to="/overview" replace />} />
                    {menuRoutes.map((route) => {
                        const Component = route.component;

                        return <Route key={route.path} path={route.path} element={<Component />} />;
                    })}
                </Routes>
            </section>
        </main>
    );
}

export default App;
