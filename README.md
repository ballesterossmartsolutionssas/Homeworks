# Parcial 1 - Movilidad Urbana

Aplicacion en React para gestionar vehiculos de una empresa de movilidad usando estructuras de datos implementadas manualmente.

## Integrante

- Juan Camilo Ballesteros Sierra
- Codigo: 2230721

## Requisitos implementados

- Gestionar vehiculos disponibles con **Lista Enlazada Simple**.
- Registrar historial de alquileres con **Lista Doblemente Enlazada**.
- Rotar vehiculo destacado con **Lista Circular**.
- Administrar inversionistas activos con **Lista Circular Doblemente Enlazada**.
- Mostrar toda la informacion en la app React.
- Al alquilar un vehiculo:
  - se elimina de disponibles,
  - se agrega automaticamente al historial.
- Rotacion automatica del destacado cada 5 segundos.

## Estructuras usadas

- `src/structures/linkedList.js` -> `LinkedList` (vehiculos disponibles)
- `src/structures/doublyLinkedList.js` -> `DoublyLinkedList` (historial)
- `src/structures/circularLinkedList.js` -> `CircularLinkedList` (destacados)
- `src/structures/doublyCircularLinkedList.js` -> `DoublyCircularLinkedList` (inversionistas)

## Componentes principales

- `src/App.jsx`: estado general y reglas de negocio del parcial.
- `src/components/AvailableVehicles.jsx`: lista de disponibles y boton `Alquilar`.
- `src/components/RentalHistory.jsx`: visualizacion del historial.
- `src/components/FeaturedVehicle.jsx`: tarjeta del vehiculo destacado actual.
- `src/components/ActiveInvestors.jsx`: lista de inversionistas activos.

## Ejecucion local

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar en desarrollo:
   ```bash
   npm run dev
   ```
3. Compilar para validar:
   ```bash
   npm run build
   ```
