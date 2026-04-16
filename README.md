# Parcial 2 - Sistema jerarquico de carpetas y archivos

Aplicacion web desarrollada en React para gestionar un arbol n-ario de carpetas y archivos con autenticacion y persistencia local.

## Estudiante

- Juan Camilo Ballesteros Sierra
- Codigo: 2230721

## Usuarios demo

- `juan_cam.ballesteros@uao.edu.co` / `123456`
- `admin@parcial.com` / `admin123`

## Requisitos implementados

- Login mock con usuarios registrados.
- Usuario autenticado en contexto global.
- Validacion de usuario registrado antes de crear carpetas o archivos.
- Arbol n-ario implementado desde cero.
- Regla de negocio: los archivos no pueden tener hijos, las carpetas si.
- Persistencia del arbol en `IndexedDB`.
- Registro del correo creador en cada nodo.
- Visualizacion jerarquica y panel de detalles con estilos CSS.

## Ejecutar

```bash
npm install
npm run dev
```

## Validar build

```bash
npm run build
```
