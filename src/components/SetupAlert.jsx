function SetupAlert({ ready }) {
    if (ready) {
        return (
            <div className="alert alert-success border-0 shadow-sm" role="alert">
                Firebase listo. Puedes autenticarte y sincronizar tareas.
            </div>
        );
    }

    return (
        <div className="alert alert-warning border-0 shadow-sm" role="alert">
            Debes crear el archivo <strong>.env</strong> con las credenciales de Firebase
            para habilitar login y Firestore.
        </div>
    );
}

export default SetupAlert;
