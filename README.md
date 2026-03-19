# Practice 05 - ATM Queue

Aplicacion en React para simular la cola de atencion de un cajero automatico usando una estructura `Queue` implementada manualmente.

## Estudiante

- Juan Camilo Ballesteros Sierra
- Codigo: 2230721

## Requisitos implementados

- Cola de personas para un ATM.
- Cada persona tiene nombre, monto de retiro y fecha de llegada.
- Carga inicial con datos mock.
- Formulario para agregar nuevas personas a la cola.
- La fecha de llegada es asignada automaticamente por el sistema.
- Impresion de la cola en pantalla segun el orden de llegada.
- Boton para atender a la siguiente persona usando `dequeue`.

## Estructura usada

- `src/structures/queue.js`: implementacion de la cola con `enqueue`, `dequeue`, `peek`, `isEmpty`, `size` y `print`.

## Pantalla principal

- `src/App.jsx`: logica de la cola, formulario, mock data y render de personas.
- `src/index.css`: estilos de la practica.

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
