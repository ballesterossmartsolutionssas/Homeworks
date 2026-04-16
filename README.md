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

## Nota academica

Este repositorio incluye un archivo `.env` real para que el profesor pueda ejecutar la aplicacion sin configuracion adicional.

Esto no es una buena practica para entornos profesionales, pero se deja asi unicamente con fines academicos y de facilidad de evaluacion.

## Configuracion de entorno

- El proyecto ya incluye `.env` listo para ejecutar.
- Si se desea replicar la configuracion en otro proyecto, se puede usar `.env.example` como referencia.

## Ejecutar

```bash
npm install
npm run dev
```

## Validar build

```bash
npm run build
```
