import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Loader from "./components/Loader";
import "./App.css";

const initialContacts = [
  { id: 1, name: "Ana Torres", phone: "3001112233" },
  { id: 2, name: "Luis Perez", phone: "3014445566" },
  { id: 3, name: "Carla Mendez", phone: "3207778899" },
];

const createId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading for ~1 second.
    const timerId = setTimeout(() => {
      setContacts(initialContacts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timerId);
  }, []);

  const handleAddContact = (name, phone) => {
    const newContact = {
      id: createId(),
      name,
      phone,
    };

    setContacts((previousContacts) => [...previousContacts, newContact]);
  };

  const handleDeleteContact = (contactId) => {
    setContacts((previousContacts) =>
      previousContacts.filter((contact) => contact.id !== contactId)
    );
  };

  return (
    <main className="app-shell">
      <section className="contacts-card">
        <h1 className="title">Contact Manager</h1>
        <p className="subtitle">Clase 02 - Refuerzo React</p>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ContactForm onAddContact={handleAddContact} />
            <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
          </>
        )}
      </section>
    </main>
  );
}

export default App;
