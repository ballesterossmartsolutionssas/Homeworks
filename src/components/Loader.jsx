function Loader() {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
      <div className="spinner" />
      <p>Cargando contactos...</p>
    </div>
  );
}

export default Loader;
