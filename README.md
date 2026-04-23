# Challenge 10 - Graphs

Aplicacion en React para crear y administrar un grafo de amigos y ciudades usando una estructura `Graph` implementada manualmente y visualizada con `react-d3-graph`.

## Estudiante

- Juan Camilo Ballesteros Sierra
- Codigo: 2230721

## Requisitos implementados

- Cada persona es un nodo del grafo.
- Cada ciudad tambien es un nodo del grafo.
- Cada persona tiene nombre, edad y referencia a una ciudad.
- Cada ciudad tiene nombre.
- Formulario para agregar nuevas ciudades.
- Formulario para agregar nuevas personas conectadas con su ciudad.
- Formulario para crear relaciones de amistad entre personas.
- Impresion en pantalla de las personas que viven en una ciudad seleccionada.
- Visualizacion interactiva del grafo con `react-d3-graph`.
- Lista de adyacencia para mostrar la representacion interna del grafo.

## Estructura usada

- `src/structures/friendsCitiesGraph.js`: implementacion del grafo con nodos, aristas, lista de adyacencia, busqueda y filtros por ciudad.
- `src/App.jsx`: interfaz principal, formularios, listado por ciudad y componente `Graph`.
- `src/index.css`: estilos de la entrega.

## Ejecucion local

1. Instalar dependencias:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Iniciar en desarrollo:
   ```bash
   npm run dev
   ```
3. Compilar para validar:
   ```bash
   npm run build
   ```

## Nota sobre la dependencia

`react-d3-graph` declara un peer dependency antiguo para React. Por eso la instalacion se debe ejecutar con `--legacy-peer-deps` en este proyecto.
