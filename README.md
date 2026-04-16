# Parcial 2 - Sistema jerarquico de carpetas y archivos

Aplicacion web desarrollada en React para gestionar un arbol n-ario de carpetas y archivos con autenticacion real en Firebase y persistencia en Cloud Firestore.

## Estudiante

- Juan Camilo Ballesteros Sierra
- Codigo: 2230721

## Usuarios demo

- `juan_cam.ballesteros@uao.edu.co` / `123456`
- `admin@parcial.com` / `admin123`

## Requisitos implementados

- Login con `Firebase Authentication` usando correo y contrasena.
- Usuario autenticado en contexto global.
- Validacion de acceso a partir de usuarios registrados en Firebase.
- Arbol n-ario implementado desde cero.
- Regla de negocio: los archivos no pueden tener hijos, las carpetas si.
- Persistencia del arbol en `Cloud Firestore`.
- Registro del correo creador en cada nodo.
- Visualizacion jerarquica y panel de detalles con estilos CSS.

## Configuracion de entorno

1. Copia `.env.example` a `.env`.
2. Completa las variables `VITE_FIREBASE_*` con la configuracion de tu app web en Firebase.

## Ejecutar

```bash
npm install
npm run dev
```

## Validar build

```bash
npm run build
```
