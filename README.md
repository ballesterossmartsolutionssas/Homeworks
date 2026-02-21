# Homeworks - Clase 02 Refuerzo React

Rama de entrega: `02-React-Contacts`

## Como ejecutar

```bash
npm install
npm run dev
```

## Componentes

- `src/components/Loader.jsx`: muestra el estado de carga inicial.
- `src/components/ContactForm.jsx`: formulario para agregar contactos con validacion de campos vacios.
- `src/components/ContactList.jsx`: renderiza la lista de contactos.
- `src/components/ContactItem.jsx`: muestra cada contacto y su boton para eliminar.
- `src/App.jsx`: estado principal de contactos, carga inicial, alta y eliminacion.

## Como se simula la carga inicial

En `src/App.jsx` se usa `useEffect` con `setTimeout` de 1000 ms:

- Al montar el componente, inicia el loader.
- Despues de ~1 segundo, carga los contactos iniciales.
- Se limpia el timer en el `return` de `useEffect` para evitar efectos colgantes.

## Funcionalidades implementadas

- Loader visible al iniciar.
- Lista inicial de 3 contactos (`id`, `name`, `phone`).
- Agregar contacto (nombre + telefono) con validacion.
- Limpieza de inputs despues de agregar.
- Eliminar contacto por boton.
- Estado en `App` y props hacia componentes hijos.
- Uso de `key={contact.id}` real.
