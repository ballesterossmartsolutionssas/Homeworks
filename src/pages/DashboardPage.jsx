import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFileSystem } from '../hooks/useFileSystem';

function DashboardPage() {
    const { user } = useAuth();
    const { stats, selectedNode } = useFileSystem();

    return (
        <section className="page-card">
            <div className="section-heading">
                <div>
                    <p className="panel-label">Area privada</p>
                    <h2>Bienvenido, {user?.username}</h2>
                </div>
            </div>

            <p className="section-copy">
                Este panel centraliza el acceso al sistema de carpetas. Cada nodo guarda
                su creador, respeta la jerarquia del arbol y queda persistido en la base
                de datos en Cloud Firestore.
            </p>

            <div className="stats-grid">
                <article className="info-card accent-card">
                    <span>Total de nodos</span>
                    <strong>{stats.totalNodes}</strong>
                    <p>Cuenta completa del arbol n-ario almacenado.</p>
                </article>

                <article className="info-card">
                    <span>Carpetas</span>
                    <strong>{stats.folders}</strong>
                    <p>Unica estructura habilitada para contener hijos.</p>
                </article>

                <article className="info-card">
                    <span>Archivos</span>
                    <strong>{stats.files}</strong>
                    <p>Los archivos son nodos hoja y no aceptan descendientes.</p>
                </article>
            </div>

            <div className="dashboard-grid">
                <article className="panel">
                    <p className="panel-label">Nodo activo</p>
                    <h3>{selectedNode?.name}</h3>
                    <p>
                        Tipo: <strong>{selectedNode?.type === 'folder' ? 'Carpeta' : 'Archivo'}</strong>
                    </p>
                    <p>
                        Creado por: <strong>{selectedNode?.createdBy}</strong>
                    </p>
                </article>

                <article className="panel">
                    <p className="panel-label">Requisitos cubiertos</p>
                    <ul className="feature-list">
                        <li>Login real con Firebase Authentication.</li>
                        <li>Persistencia del arbol en Cloud Firestore.</li>
                        <li>Validacion de creador por correo electronico.</li>
                        <li>Restriccion de hijos solo para carpetas.</li>
                    </ul>
                </article>
            </div>

            <div className="cta-strip">
                <div>
                    <p className="panel-label">Gestion del sistema</p>
                    <h3>Abre el explorador para crear carpetas y archivos</h3>
                </div>
                <Link className="primary-button link-button" to="/explorer">
                    Ir al explorador
                </Link>
            </div>
        </section>
    );
}

export default DashboardPage;
