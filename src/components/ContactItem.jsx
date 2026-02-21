function ContactItem({ contact, onDeleteContact }) {
  return (
    <li className="contact-item">
      <div>
        <strong>{contact.name}</strong>
        <p>{contact.phone}</p>
      </div>

      <button type="button" onClick={() => onDeleteContact(contact.id)}>
        Eliminar
      </button>
    </li>
  );
}

export default ContactItem;
