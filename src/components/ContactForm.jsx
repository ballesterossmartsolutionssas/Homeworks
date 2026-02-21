import { useState } from "react";

function ContactForm({ onAddContact }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const safeName = name.trim();
    const safePhone = phone.trim();

    if (!safeName || !safePhone) {
      setError("Nombre y telefono son obligatorios.");
      return;
    }

    onAddContact(safeName, safePhone);
    setName("");
    setPhone("");
    setError("");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Nombre
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ej: Maria Lopez"
        />
      </label>

      <label>
        Telefono
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Ej: 3001234567"
        />
      </label>

      <button type="submit">Agregar contacto</button>

      {error ? <p className="error-msg">{error}</p> : null}
    </form>
  );
}

export default ContactForm;
