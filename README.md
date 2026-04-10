# Challenge 07 - Firebase Tasks

Aplicacion en React que transforma el fake login del reto anterior en un flujo real con Firebase Authentication y Firestore. Incluye registro, login, logout, rutas privadas, manejo global de sesion y CRUD de tareas con actualizacion en tiempo real.

## Estudiante

- Juan Camilo Ballesteros Sierra
- Codigo: 2230721

## Funcionalidades

- Login, register y logout con Firebase Authentication.
- CRUD de tareas usando Firestore.
- Cambio de estado `done / pending` para cada tarea.
- Un contexto para autenticacion y otro contexto para tareas.
- Dos custom hooks para encapsular la logica de Firebase.
- Rutas privadas para navegar entre dashboard y tareas.
- Interfaz construida con Bootstrap 5 y estilos propios en Sass.
- La app compila aun sin credenciales; en ese caso muestra una alerta de configuracion.

## Rutas principales

- `/login`: inicio de sesion.
- `/register`: registro de usuarios.
- `/tasks`: modulo principal de tareas.
- `/dashboard`: resumen del estado de la sesion y las tareas.

## Estructura principal

- `src/firebase/config.js`: inicializacion del proyecto Firebase mediante variables de entorno.
- `src/context/AuthContext.jsx`: contexto global de autenticacion.
- `src/context/TasksContext.jsx`: contexto global de tareas.
- `src/hooks/useFirebaseAuth.js`: login, register, logout y escucha de sesion.
- `src/hooks/useTasksCollection.js`: CRUD de tareas y sincronizacion en tiempo real.
- `src/components/PrivateRoute.jsx`: proteccion de rutas privadas.
- `src/pages/LoginPage.jsx` y `src/pages/RegisterPage.jsx`: flujo de acceso.
- `src/pages/TasksPage.jsx`: creacion, edicion, eliminacion y marcado de tareas.
- `src/styles/main.scss`: tema visual usando Bootstrap + Sass.

## Configuracion de Firebase

1. Crear un archivo `.env` basado en `.env.example`.
2. Activar Email/Password en Firebase Authentication.
3. Crear una base de datos Firestore en modo de desarrollo.
4. Registrar una app web en Firebase y copiar las credenciales.

Variables esperadas:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

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
