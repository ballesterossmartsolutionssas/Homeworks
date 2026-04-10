# Challenge 09 - N-ary Menu

Aplicacion en React que modela un menu lateral como un arbol n-ario. Cada nodo del arbol contiene `title`, `link` y `component`, y el sidebar se imprime recursivamente en pantalla para navegar entre menus y submenus.

## Estudiante

- Juan Camilo Ballesteros Sierra
- Codigo: 2230721

## Requisitos implementados

- Proyecto nuevo en React con Vite.
- Arbol n-ario con menus y submenus.
- Cada item del menu tiene titulo, link y componente asociado.
- Sidebar renderizado a partir del arbol.
- Navegacion entre secciones usando `react-router-dom`.

## Estructura principal

- `src/structures/MenuTree.js`: clases `MenuNode` y `MenuTree`.
- `src/data/menuTree.jsx`: definicion del menu y asignacion de componentes.
- `src/App.jsx`: layout principal, render recursivo del sidebar y rutas.
- `src/styles.css`: tema visual del reto.

## Ejecucion local

1. `npm install`
2. `npm run dev`
3. `npm run build`
