import { MenuNode, MenuTree } from '../structures/MenuTree';

function SectionCard({ label, title, text, bullets }) {
    return (
        <article className="content-card">
            <p className="section-label">{label}</p>
            <h2>{title}</h2>
            <p>{text}</p>
            <ul className="content-list">
                {bullets.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </article>
    );
}

const OverviewPage = () => (
    <SectionCard
        label="Root"
        title="Overview"
        text="La raiz del arbol organiza el flujo general de navegacion y conecta todos los menus secundarios."
        bullets={[
            'Nodo principal con acceso a secciones academicas y de trabajo.',
            'Sidebar renderizado con recursion sobre cada hijo.',
            'Cada nodo mantiene title, link y component.'
        ]}
    />
);

const CourseHubPage = () => (
    <SectionCard
        label="Course"
        title="Course hub"
        text="Este menu agrupa material teorico sobre arboles y recorridos vistos en clase."
        bullets={[
            'Submenu de arboles binarios.',
            'Submenu de DFS y BFS.',
            'Relacion entre teoria y visualizacion.'
        ]}
    />
);

const TreesPage = () => (
    <SectionCard
        label="Theory"
        title="Binary and N-ary Trees"
        text="Los nodos almacenan un valor y referencias a sus hijos, permitiendo modelar estructuras jerarquicas."
        bullets={[
            'Nodo raiz, nodos hoja, profundidad y altura.',
            'Arboles binarios con maximo dos hijos.',
            'Arboles n-arios para menus y estructuras complejas.'
        ]}
    />
);

const TraversalPage = () => (
    <SectionCard
        label="Traversal"
        title="DFS and BFS"
        text="Los recorridos permiten imprimir o explorar el arbol usando estrategias de profundidad o amplitud."
        bullets={[
            'DFS prioriza profundizar antes de retroceder.',
            'BFS recorre nivel por nivel.',
            'Ambos patrones ayudan a construir menus, buscadores y dashboards.'
        ]}
    />
);

const PracticeHubPage = () => (
    <SectionCard
        label="Practice"
        title="Practice hub"
        text="Este menu agrupa ejemplos practicos conectados con los retos 08 y 09."
        bullets={[
            'Acceso a la visualizacion del arbol binario.',
            'Acceso al ejemplo del sidebar n-ario.',
            'Relacion entre estructura de datos y UI.'
        ]}
    />
);

const ChallengeEightPage = () => (
    <SectionCard
        label="Practice"
        title="Challenge 08 recap"
        text="El arbol binario se puede recorrer con preorder, inorder y postorder, y tambien visualizar en pantalla."
        bullets={[
            'Insercion basada en comparacion de valores.',
            'Busqueda usando contains.',
            'Representacion grafica con nodos e hijos.'
        ]}
    />
);

const ChallengeNinePage = () => (
    <SectionCard
        label="Practice"
        title="Challenge 09 recap"
        text="Un menu lateral es un caso natural para un arbol n-ario porque cada opcion puede tener varios hijos."
        bullets={[
            'Cada item conoce su link y componente.',
            'Los hijos se imprimen en forma recursiva.',
            'La navegacion queda desacoplada del layout.'
        ]}
    />
);

const WorkspacePage = () => (
    <SectionCard
        label="Workspace"
        title="Workspace"
        text="Seccion para agrupar acciones secundarias de la interfaz."
        bullets={[
            'Configuraciones de la cuenta.',
            'Seccion de soporte o ayuda.',
            'Secciones internas del tablero.'
        ]}
    />
);

const SettingsPage = () => (
    <SectionCard
        label="Workspace"
        title="Settings"
        text="Los menus de configuracion suelen ser otro caso frecuente de arbol n-ario."
        bullets={[
            'Perfil del usuario.',
            'Preferencias visuales.',
            'Acciones de mantenimiento.'
        ]}
    />
);

const HelpPage = () => (
    <SectionCard
        label="Support"
        title="Help center"
        text="La ayuda y documentacion tambien se pueden organizar como menus anidados."
        bullets={[
            'FAQ por categorias.',
            'Tutoriales por tema.',
            'Contactos y soporte.'
        ]}
    />
);

const root = new MenuNode({ title: 'Overview', link: '/overview', component: OverviewPage });

const courseHub = root.addChild(
    new MenuNode({ title: 'Course Hub', link: '/course', component: CourseHubPage })
);
courseHub.addChild(new MenuNode({ title: 'Trees', link: '/course/trees', component: TreesPage }));
courseHub.addChild(
    new MenuNode({ title: 'DFS and BFS', link: '/course/traversals', component: TraversalPage })
);

const practiceHub = root.addChild(
    new MenuNode({ title: 'Practice Hub', link: '/practice', component: PracticeHubPage })
);
practiceHub.addChild(
    new MenuNode({
        title: 'Challenge 08',
        link: '/practice/challenge-08',
        component: ChallengeEightPage
    })
);
practiceHub.addChild(
    new MenuNode({
        title: 'Challenge 09',
        link: '/practice/challenge-09',
        component: ChallengeNinePage
    })
);

const workspaceHub = root.addChild(
    new MenuNode({ title: 'Workspace', link: '/workspace', component: WorkspacePage })
);
workspaceHub.addChild(
    new MenuNode({ title: 'Settings', link: '/workspace/settings', component: SettingsPage })
);
workspaceHub.addChild(
    new MenuNode({ title: 'Help Center', link: '/workspace/help', component: HelpPage })
);

export const menuTree = new MenuTree(root);
export const sidebarNodes = [root, ...root.children];
export const menuRoutes = menuTree.toRoutes();
export const menuNodeCount = menuTree.countNodes();
