import ContactItem from "./ContactItem";

function ContactList({ contacts, onDeleteContact }) {
  if (contacts.length === 0) {
    return <p className="empty-state">No hay contactos para mostrar.</p>;
  }

  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
}

export default ContactList;
