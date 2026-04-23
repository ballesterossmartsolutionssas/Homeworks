class GraphNode {
    constructor({ id, type, name, age = null, cityId = null }) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.age = age;
        this.cityId = cityId;
    }
}

class GraphEdge {
    constructor(source, target, type) {
        this.source = source;
        this.target = target;
        this.type = type;
    }

    hasSameEnds(source, target) {
        return (
            (this.source === source && this.target === target) ||
            (this.source === target && this.target === source)
        );
    }
}

export class FriendsCitiesGraph {
    constructor(nodes = [], edges = []) {
        this.nodes = new Map();
        this.edges = [];
        this.adjacencyList = {};

        nodes.forEach((node) => this.addNode(node));
        edges.forEach((edge) => this.addEdge(edge.source, edge.target, edge.type));
    }

    clone() {
        return new FriendsCitiesGraph(this.getNodes(), this.getEdges());
    }

    addCity(name) {
        const normalizedName = normalizeText(name);

        if (!normalizedName) {
            throw new Error('La ciudad debe tener nombre.');
        }

        const duplicatedCity = this.getCities().some(
            (city) => normalizeText(city.name) === normalizedName
        );

        if (duplicatedCity) {
            throw new Error('Esa ciudad ya existe en el grafo.');
        }

        return this.addNode({
            id: createId('city', normalizedName),
            type: 'city',
            name: name.trim()
        });
    }

    addPerson({ name, age, cityId }) {
        const normalizedName = normalizeText(name);

        if (!normalizedName) {
            throw new Error('La persona debe tener nombre.');
        }

        if (!Number.isInteger(age) || age <= 0) {
            throw new Error('La edad debe ser un numero entero mayor que cero.');
        }

        const city = this.findNode(cityId);

        if (!city || city.type !== 'city') {
            throw new Error('La persona debe estar referenciada a una ciudad valida.');
        }

        const duplicatedPerson = this.getPeople().some(
            (person) => normalizeText(person.name) === normalizedName
        );

        if (duplicatedPerson) {
            throw new Error('Esa persona ya existe en el grafo.');
        }

        const person = this.addNode({
            id: createId('person', normalizedName),
            type: 'person',
            name: name.trim(),
            age,
            cityId
        });

        this.addEdge(person.id, city.id, 'lives-in');

        return person;
    }

    addFriendship(firstPersonId, secondPersonId) {
        if (firstPersonId === secondPersonId) {
            throw new Error('Selecciona dos personas diferentes.');
        }

        const firstPerson = this.findNode(firstPersonId);
        const secondPerson = this.findNode(secondPersonId);

        if (!isPerson(firstPerson) || !isPerson(secondPerson)) {
            throw new Error('La amistad solo puede conectar dos personas.');
        }

        return this.addEdge(firstPersonId, secondPersonId, 'friendship');
    }

    addNode(nodeData) {
        const node = nodeData instanceof GraphNode ? nodeData : new GraphNode(nodeData);

        if (this.nodes.has(node.id)) {
            throw new Error('El nodo ya existe en el grafo.');
        }

        this.nodes.set(node.id, node);
        this.adjacencyList[node.id] = this.adjacencyList[node.id] ?? [];

        return node;
    }

    addEdge(source, target, type = 'relation') {
        if (!this.nodes.has(source) || !this.nodes.has(target)) {
            throw new Error('Ambos nodos deben existir antes de crear la arista.');
        }

        const duplicatedEdge = this.edges.some((edge) => edge.hasSameEnds(source, target));

        if (duplicatedEdge) {
            throw new Error('Esa relacion ya existe en el grafo.');
        }

        const edge = new GraphEdge(source, target, type);
        this.edges.push(edge);
        this.adjacencyList[source].push(target);
        this.adjacencyList[target].push(source);

        return edge;
    }

    findNode(nodeId) {
        return this.nodes.get(nodeId) ?? null;
    }

    getNodes() {
        return Array.from(this.nodes.values()).map((node) => ({ ...node }));
    }

    getEdges() {
        return this.edges.map((edge) => ({ ...edge }));
    }

    getCities() {
        return this.getNodes()
            .filter((node) => node.type === 'city')
            .sort(sortByName);
    }

    getPeople() {
        return this.getNodes()
            .filter((node) => node.type === 'person')
            .sort(sortByName);
    }

    getPeopleByCity(cityId) {
        return this.getPeople().filter((person) => person.cityId === cityId);
    }

    getAdjacentNodes(nodeId) {
        return (this.adjacencyList[nodeId] ?? [])
            .map((adjacentId) => this.findNode(adjacentId))
            .filter(Boolean);
    }

    printAdjacencyList() {
        return this.getNodes()
            .sort((leftNode, rightNode) => {
                if (leftNode.type !== rightNode.type) {
                    return leftNode.type === 'city' ? -1 : 1;
                }

                return sortByName(leftNode, rightNode);
            })
            .map((node) => ({
                id: node.id,
                name: node.name,
                connections: this.getAdjacentNodes(node.id).map((adjacentNode) => adjacentNode.name)
            }));
    }

    toD3Data() {
        const positions = createNodePositions(this.getCities(), this.getPeople());

        return {
            nodes: this.getNodes().map((node) => ({
                id: node.id,
                label: node.name,
                color: node.type === 'city' ? '#0f766e' : '#f97316',
                fontColor: '#1f2937',
                size: node.type === 'city' ? 900 : 620,
                symbolType: node.type === 'city' ? 'diamond' : 'circle',
                x: positions[node.id]?.x,
                y: positions[node.id]?.y
            })),
            links: this.getEdges().map((edge) => ({
                source: edge.source,
                target: edge.target,
                color: edge.type === 'lives-in' ? '#0f766e' : '#f97316',
                strokeWidth: edge.type === 'lives-in' ? 2.8 : 1.8
            }))
        };
    }
}

export function createInitialFriendsCitiesGraph() {
    return createFriendsCitiesGraph({
        cities: ['Cali', 'Bogota', 'Medellin', 'Barranquilla'],
        people: [
            { name: 'Camila', age: 22, cityName: 'Cali' },
            { name: 'Mateo', age: 24, cityName: 'Cali' },
            { name: 'Laura', age: 21, cityName: 'Bogota' },
            { name: 'Daniel', age: 26, cityName: 'Medellin' },
            { name: 'Valentina', age: 23, cityName: 'Barranquilla' },
            { name: 'Juan', age: 25, cityName: 'Bogota' }
        ],
        friendships: [
            ['Camila', 'Mateo'],
            ['Camila', 'Laura'],
            ['Mateo', 'Daniel'],
            ['Laura', 'Juan'],
            ['Daniel', 'Valentina']
        ]
    });
}

export function createFriendsCitiesGraph({ cities = [], people = [], friendships = [] } = {}) {
    const graph = new FriendsCitiesGraph();

    cities.forEach((cityName) => graph.addCity(cityName));

    people.forEach((person) => {
        const cityId = createId('city', normalizeText(person.cityName));
        graph.addPerson({
            name: person.name,
            age: person.age,
            cityId
        });
    });

    friendships.forEach(([firstPersonName, secondPersonName]) => {
        graph.addFriendship(
            createId('person', normalizeText(firstPersonName)),
            createId('person', normalizeText(secondPersonName))
        );
    });

    return graph;
}

function isPerson(node) {
    return node?.type === 'person';
}

function normalizeText(value) {
    return String(value ?? '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function createId(prefix, value) {
    return `${prefix}-${value.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}

function sortByName(leftNode, rightNode) {
    return leftNode.name.localeCompare(rightNode.name, 'es', { sensitivity: 'base' });
}

function createNodePositions(cities, people) {
    const positions = {};
    const center = { x: 380, y: 270 };
    const cityRadius = { x: 270, y: 190 };
    const peopleRadius = { x: 135, y: 105 };

    cities.forEach((city, index) => {
        const angle = getCircleAngle(index, cities.length);
        positions[city.id] = {
            x: center.x + Math.cos(angle) * cityRadius.x,
            y: center.y + Math.sin(angle) * cityRadius.y
        };

        const cityPeople = people.filter((person) => person.cityId === city.id);
        const perpendicular = {
            x: -Math.sin(angle),
            y: Math.cos(angle)
        };

        cityPeople.forEach((person, personIndex) => {
            const offset = (personIndex - (cityPeople.length - 1) / 2) * 76;

            positions[person.id] = {
                x: center.x + Math.cos(angle) * peopleRadius.x + perpendicular.x * offset,
                y: center.y + Math.sin(angle) * peopleRadius.y + perpendicular.y * offset
            };
        });
    });

    return positions;
}

function getCircleAngle(index, totalItems) {
    if (totalItems <= 1) {
        return -Math.PI / 2;
    }

    return -Math.PI / 2 + (index * Math.PI * 2) / totalItems;
}
