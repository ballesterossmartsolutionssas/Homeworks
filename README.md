# Homeworks - Challenge 03 (Clase 03 - Lists)

Rama de entrega: `03-Lists`

## Como ejecutar

```bash
npm install
npm run dev
```

## Paginas

- `/songs`: usa una `LinkedList` (singly) como playlist de canciones.
  - Carga canciones mock (5+).
  - Muestra cancion actual.
  - Permite avanzar con `Next`.
  - Permite volver al inicio con `Restart`.
  - Incluye `Remove current` usando `remove(value)`.

- `/history`: usa una `DoublyLinkedList` como historial tipo navegador.
  - Carga historial fake (6+ urls).
  - Muestra pagina actual.
  - Permite `Back` y `Forward`.
  - Permite `Visit new page` (append al final y mueve `current`).
  - Deshabilita botones cuando no se puede navegar.

## Estructuras implementadas

Ubicacion: `src/structures`

- `Node` (`value`, `next`)
- `LinkedList` (`head`, `tail`, `length`)
  - `append(value)`
  - `peek(value)`
  - `size()`
  - `remove(value)`
  - `print()`
- `DoubleNode` (`value`, `next`, `prev`)
- `DoublyLinkedList` (`head`, `tail`, `length`, `current`)
  - `append(value)`
  - `peek(value)`
  - `size()`
  - `remove(value)`
  - `print()`
  - `back()`
  - `forward()`
  - `visit(value)` (helper para agregar y mover current al nuevo tail)

## Estructura principal

- `src/router/AppRouter.jsx`: define rutas y layout base.
- `src/pages/SongsPage.jsx`: demo de LinkedList.
- `src/pages/HistoryPage.jsx`: demo de DoublyLinkedList.
- `src/components/NavBar.jsx`: navegacion entre `/songs` y `/history`.
