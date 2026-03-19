# Challenge 06 - Demo Login

Aplicacion en React con demo login, Context API y rutas privadas para acceder a dos ejercicios protegidos.

## Estudiante

- Juan Camilo Ballesteros Sierra
- Codigo: 2230721

## Credenciales demo

- Email: `user@mail.com`
- Password: `123`

## Funcionalidades

- Login validando las credenciales solicitadas en el enunciado.
- Manejo de autenticacion con `Context`, `Provider` y `useState`.
- Persistencia basica del usuario autenticado en `localStorage`.
- Rutas privadas con `react-router-dom`.
- Logout y redireccion al login.
- Visualizacion del usuario actual cuando la sesion esta iniciada.

## Paginas privadas

- `/dashboard`: panel principal del usuario autenticado.
- `/books-stack`: ejercicio de `Practice 04 - Books Stack`.
- `/atm-queue`: ejercicio de `Practice 05 - ATM Queue`.

## Estructura principal

- `src/context/AuthContext.jsx`: contexto y provider de autenticacion.
- `src/hooks/useAuth.js`: custom hook para consumir el contexto.
- `src/components/PrivateRoute.jsx`: proteccion de rutas.
- `src/components/AppLayout.jsx`: layout privado con navegacion y logout.
- `src/pages/LoginPage.jsx`: pantalla de inicio de sesion.
- `src/pages/DashboardPage.jsx`: dashboard privado.
- `src/pages/BooksStackPage.jsx`: practica 04 protegida.
- `src/pages/ATMQueuePage.jsx`: practica 05 protegida.

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
