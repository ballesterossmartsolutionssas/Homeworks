import { useMemo, useState } from 'react';
import { Graph } from 'react-d3-graph';
import { createInitialFriendsCitiesGraph } from './structures/friendsCitiesGraph';

const graphConfig = {
    directed: false,
    height: 540,
    width: 760,
    nodeHighlightBehavior: true,
    staticGraphWithDragAndDrop: true,
    maxZoom: 8,
    minZoom: 0.35,
    d3: {
        gravity: -360,
        linkLength: 170
    },
    node: {
        fontColor: '#1f2937',
        fontSize: 13,
        fontWeight: '700',
        highlightFontSize: 15,
        highlightStrokeColor: '#f97316',
        labelProperty: 'label',
        mouseCursor: 'pointer',
        renderLabel: true,
        size: 680,
        strokeColor: '#ffffff',
        strokeWidth: 2
    },
    link: {
        color: '#9ca3af',
        highlightColor: '#f97316',
        strokeWidth: 2
    }
};

function App() {
    const [graph, setGraph] = useState(() => createInitialFriendsCitiesGraph());
    const [selectedCityId, setSelectedCityId] = useState('city-cali');
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [cityName, setCityName] = useState('');
    const [personForm, setPersonForm] = useState({
        name: '',
        age: '',
        cityId: 'city-cali'
    });
    const [friendshipForm, setFriendshipForm] = useState({
        firstPersonId: 'person-camila',
        secondPersonId: 'person-juan'
    });
    const [message, setMessage] = useState('Grafo inicial cargado con personas, ciudades y amistades.');

    const cities = graph.getCities();
    const people = graph.getPeople();
    const selectedCity = graph.findNode(selectedCityId);
    const selectedNode = selectedNodeId ? graph.findNode(selectedNodeId) : null;
    const peopleInSelectedCity = selectedCityId ? graph.getPeopleByCity(selectedCityId) : [];
    const graphData = useMemo(() => graph.toD3Data(), [graph]);
    const adjacencyRows = graph.printAdjacencyList();

    const updateGraph = (callback, successMessage) => {
        try {
            const nextGraph = graph.clone();
            callback(nextGraph);
            setGraph(nextGraph);
            setMessage(successMessage);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleCreateCity = (event) => {
        event.preventDefault();

        updateGraph(
            (nextGraph) => {
                const createdCity = nextGraph.addCity(cityName);
                setSelectedCityId(createdCity.id);
                setPersonForm((currentForm) => ({
                    ...currentForm,
                    cityId: createdCity.id
                }));
                setCityName('');
            },
            'Ciudad agregada al grafo.'
        );
    };

    const handleCreatePerson = (event) => {
        event.preventDefault();

        updateGraph(
            (nextGraph) => {
                const createdPerson = nextGraph.addPerson({
                    name: personForm.name,
                    age: Number(personForm.age),
                    cityId: personForm.cityId
                });
                setFriendshipForm((currentForm) => ({
                    firstPersonId: currentForm.firstPersonId || createdPerson.id,
                    secondPersonId: createdPerson.id
                }));
                setPersonForm((currentForm) => ({
                    ...currentForm,
                    name: '',
                    age: ''
                }));
            },
            'Persona agregada y conectada con su ciudad.'
        );
    };

    const handleCreateFriendship = (event) => {
        event.preventDefault();

        updateGraph(
            (nextGraph) => {
                nextGraph.addFriendship(
                    friendshipForm.firstPersonId,
                    friendshipForm.secondPersonId
                );
            },
            'Amistad agregada entre personas.'
        );
    };

    const handleSelectCity = (event) => {
        setSelectedCityId(event.target.value);
    };

    const handlePersonFormChange = (event) => {
        const { name, value } = event.target;
        setPersonForm((currentForm) => ({
            ...currentForm,
            [name]: value
        }));
    };

    const handleFriendshipFormChange = (event) => {
        const { name, value } = event.target;
        setFriendshipForm((currentForm) => ({
            ...currentForm,
            [name]: value
        }));
    };

    const handleNodeClick = (nodeId) => {
        setSelectedNodeId(nodeId);
        const node = graph.findNode(nodeId);

        if (node?.type === 'city') {
            setSelectedCityId(node.id);
        }
    };

    return (
        <main className="app-shell">
            <section className="hero-card">
                <div>
                    <p className="eyebrow">Challenge 10</p>
                    <h1>Grafo de amigos y ciudades</h1>
                    <p className="hero-copy">
                        Cada persona y cada ciudad es un nodo. Las aristas conectan a las
                        personas con su ciudad y tambien representan relaciones de amistad.
                    </p>
                </div>

                <div className="hero-stats" aria-label="Resumen del grafo">
                    <article>
                        <span>Personas</span>
                        <strong>{people.length}</strong>
                    </article>
                    <article>
                        <span>Ciudades</span>
                        <strong>{cities.length}</strong>
                    </article>
                    <article>
                        <span>Aristas</span>
                        <strong>{graph.getEdges().length}</strong>
                    </article>
                </div>
            </section>

            <section className="workspace-grid">
                <aside className="control-panel">
                    <div className="panel-heading">
                        <p className="eyebrow">Gestion</p>
                        <h2>Crear nodos y relaciones</h2>
                    </div>

                    <form className="graph-form" onSubmit={handleCreateCity}>
                        <h3>Nueva ciudad</h3>
                        <label>
                            Nombre de la ciudad
                            <input
                                type="text"
                                value={cityName}
                                onChange={(event) => setCityName(event.target.value)}
                                placeholder="Ej: Pereira"
                            />
                        </label>
                        <button type="submit">Agregar ciudad</button>
                    </form>

                    <form className="graph-form" onSubmit={handleCreatePerson}>
                        <h3>Nueva persona</h3>
                        <label>
                            Nombre
                            <input
                                type="text"
                                name="name"
                                value={personForm.name}
                                onChange={handlePersonFormChange}
                                placeholder="Ej: Sofia"
                            />
                        </label>
                        <label>
                            Edad
                            <input
                                type="number"
                                name="age"
                                min="1"
                                value={personForm.age}
                                onChange={handlePersonFormChange}
                                placeholder="Ej: 21"
                            />
                        </label>
                        <label>
                            Ciudad
                            <select
                                name="cityId"
                                value={personForm.cityId}
                                onChange={handlePersonFormChange}
                            >
                                {cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button type="submit">Agregar persona</button>
                    </form>

                    <form className="graph-form" onSubmit={handleCreateFriendship}>
                        <h3>Nueva amistad</h3>
                        <label>
                            Primera persona
                            <select
                                name="firstPersonId"
                                value={friendshipForm.firstPersonId}
                                onChange={handleFriendshipFormChange}
                            >
                                {people.map((person) => (
                                    <option key={person.id} value={person.id}>
                                        {person.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Segunda persona
                            <select
                                name="secondPersonId"
                                value={friendshipForm.secondPersonId}
                                onChange={handleFriendshipFormChange}
                            >
                                {people.map((person) => (
                                    <option key={person.id} value={person.id}>
                                        {person.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button type="submit">Conectar amigos</button>
                    </form>

                    <p className="status-message">{message}</p>
                </aside>

                <section className="graph-card">
                    <div className="panel-heading">
                        <p className="eyebrow">Visualizacion</p>
                        <h2>react-d3-graph</h2>
                    </div>

                    <div className="graph-frame">
                        <Graph
                            id="friends-cities-graph"
                            data={graphData}
                            config={graphConfig}
                            onClickNode={handleNodeClick}
                        />
                    </div>
                </section>
            </section>

            <section className="details-grid">
                <article className="result-card">
                    <div className="panel-heading compact">
                        <p className="eyebrow">Print</p>
                        <h2>Personas por ciudad</h2>
                    </div>

                    <label className="filter-label">
                        Ciudad consultada
                        <select value={selectedCityId} onChange={handleSelectCity}>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className="city-result">
                        <h3>{selectedCity?.name}</h3>
                        {peopleInSelectedCity.length > 0 ? (
                            <ul>
                                {peopleInSelectedCity.map((person) => (
                                    <li key={person.id}>
                                        <strong>{person.name}</strong>
                                        <span>{person.age} años</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay personas registradas en esta ciudad.</p>
                        )}
                    </div>
                </article>

                <article className="result-card">
                    <div className="panel-heading compact">
                        <p className="eyebrow">Nodo seleccionado</p>
                        <h2>Detalle</h2>
                    </div>

                    {selectedNode ? (
                        <div className="node-detail">
                            <span className={`node-badge ${selectedNode.type}`}>
                                {selectedNode.type === 'city' ? 'Ciudad' : 'Persona'}
                            </span>
                            <h3>{selectedNode.name}</h3>
                            {selectedNode.type === 'person' && (
                                <p>
                                    Edad: <strong>{selectedNode.age}</strong> | Ciudad:{' '}
                                    <strong>{graph.findNode(selectedNode.cityId)?.name}</strong>
                                </p>
                            )}
                            <p>
                                Conexiones:{' '}
                                <strong>{graph.getAdjacentNodes(selectedNode.id).length}</strong>
                            </p>
                        </div>
                    ) : (
                        <p className="empty-copy">Haz clic en un nodo del grafo para ver su detalle.</p>
                    )}
                </article>

                <article className="result-card adjacency-card">
                    <div className="panel-heading compact">
                        <p className="eyebrow">Lista de adyacencia</p>
                        <h2>Representacion interna</h2>
                    </div>

                    <ul className="adjacency-list">
                        {adjacencyRows.map((row) => (
                            <li key={row.id}>
                                <strong>{row.name}</strong>
                                <span>{row.connections.join(', ') || 'Sin conexiones'}</span>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>
        </main>
    );
}

export default App;
