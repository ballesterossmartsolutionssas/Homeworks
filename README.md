# Parcial 2 - Sistema jerarquico de carpetas y archivos

Profesor:

Le presento esta entrega del Parcial 2, desarrollada como una aplicacion web en React para gestionar un sistema jerarquico de carpetas y archivos mediante un arbol n-ario implementado desde cero.

Quise dejar claro que la solucion no se realizo de forma mockeada. El inicio de sesion fue implementado con `Firebase Authentication` y la persistencia del arbol se resolvio con `Cloud Firestore`, buscando que la entrega fuera mas cercana a un escenario real de desarrollo y no solo a una simulacion local.

## Datos del estudiante

- Juan Camilo Ballesteros Sierra
- Codigo: 2230721

## Credenciales de acceso

- `juan_cam.ballesteros@uao.edu.co` / `123456`
- `admin@parcial.com` / `admin123`

## Aspectos implementados

- Autenticacion real con `Firebase Authentication`.
- Usuario autenticado manejado mediante contexto global.
- Validacion de acceso con usuarios registrados en Firebase.
- Arbol n-ario construido desde cero para representar la jerarquia.
- Regla de negocio donde los archivos no pueden tener hijos y las carpetas si.
- Persistencia del sistema en `Cloud Firestore`.
- Registro del correo del creador en cada carpeta o archivo.
- Interfaz visual con estilos CSS para navegar y administrar el sistema.

## Aclaracion sobre el archivo `.env`

Profesor, dejo incluido el archivo `.env` real dentro del repositorio para que usted pueda ejecutar el proyecto directamente sin pasos extra de configuracion.

Soy consciente de que esto no corresponde a una buena practica en un entorno profesional. Sin embargo, en este caso lo dejo de esa manera unicamente con fines academicos y para facilitar la revision y ejecucion completa del proyecto.

Tambien dejo disponible el archivo `.env.example` como referencia de la estructura de variables de entorno.

## Ejecucion del proyecto

```bash
npm install
npm run dev
```

Luego puede abrir en el navegador la URL local que entregue Vite, normalmente:

```bash
http://localhost:5173
```

## Validacion de compilacion

```bash
npm run build
```
