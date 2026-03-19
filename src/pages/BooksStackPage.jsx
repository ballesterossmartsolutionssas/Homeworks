import { useState } from 'react';
import { Stack } from '../structures/stack';

const INITIAL_BOOKS = [
    {
        id: 1,
        name: 'Clean Code',
        isbn: '978-0132350884',
        author: 'Robert C. Martin',
        editorial: 'Prentice Hall'
    },
    {
        id: 2,
        name: 'The Pragmatic Programmer',
        isbn: '978-0201616224',
        author: 'Andrew Hunt',
        editorial: 'Addison-Wesley'
    },
    {
        id: 3,
        name: 'Eloquent JavaScript',
        isbn: '978-1593279509',
        author: 'Marijn Haverbeke',
        editorial: 'No Starch Press'
    }
];

const EMPTY_FORM = {
    name: '',
    isbn: '',
    author: '',
    editorial: ''
};

function BooksStackPage() {
    const [booksStack] = useState(() => {
        const stack = new Stack();
        INITIAL_BOOKS.forEach((book) => stack.push(book));
        return stack;
    });
    const [form, setForm] = useState(EMPTY_FORM);
    const [message, setMessage] = useState('Pila inicial cargada con datos mock.');
    const [, setRenderVersion] = useState(0);

    const books = booksStack.print();
    const topBook = booksStack.peek();

    const forceRender = () => {
        setRenderVersion((prev) => prev + 1);
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            id: Date.now(),
            name: form.name.trim(),
            isbn: form.isbn.trim(),
            author: form.author.trim(),
            editorial: form.editorial.trim()
        };

        const hasEmptyFields = Object.values(payload).some((value) => value === '');

        if (hasEmptyFields) {
            setMessage('Completa todos los campos antes de agregar el libro.');
            return;
        }

        booksStack.push(payload);
        setForm(EMPTY_FORM);
        setMessage(`Libro agregado al tope: ${payload.name}.`);
        forceRender();
    };

    const handlePop = () => {
        const removedBook = booksStack.pop();

        if (!removedBook) {
            setMessage('La pila esta vacia. No hay libros para retirar.');
            return;
        }

        setMessage(`Libro retirado del tope: ${removedBook.name}.`);
        forceRender();
    };

    return (
        <section className="page-card">
            <div className="section-heading">
                <div>
                    <p className="panel-label">Private Page 01</p>
                    <h2>Books Stack</h2>
                </div>
                <button type="button" className="ghost-button" onClick={handlePop}>
                    Pop del tope
                </button>
            </div>

            <div className="workspace-grid">
                <article className="panel">
                    <h3>Formulario de libros</h3>
                    <form className="resource-form" onSubmit={handleSubmit}>
                        <label>
                            Nombre
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Ej. Don Quijote de la Mancha"
                            />
                        </label>

                        <label>
                            ISBN
                            <input
                                name="isbn"
                                value={form.isbn}
                                onChange={handleChange}
                                placeholder="Ej. 978-0060934347"
                            />
                        </label>

                        <label>
                            Autor
                            <input
                                name="author"
                                value={form.author}
                                onChange={handleChange}
                                placeholder="Ej. Miguel de Cervantes"
                            />
                        </label>

                        <label>
                            Editorial
                            <input
                                name="editorial"
                                value={form.editorial}
                                onChange={handleChange}
                                placeholder="Ej. Francisco de Robles"
                            />
                        </label>

                        <button type="submit" className="primary-button">
                            Push a la pila
                        </button>
                    </form>
                    <p className="status-message">{message}</p>
                </article>

                <article className="panel">
                    <div className="summary-box">
                        <span>Peek actual</span>
                        <strong>{topBook ? `${topBook.name} | ${topBook.author}` : 'Sin elementos'}</strong>
                    </div>

                    <div className="resource-list">
                        {books.length > 0 ? (
                            books.map((book, index) => (
                                <article
                                    key={book.id}
                                    className={`resource-card ${index === 0 ? 'resource-card-highlight' : ''}`}
                                >
                                    <div className="resource-tag">
                                        <span>{index === 0 ? 'TOP' : `Nivel ${books.length - index}`}</span>
                                    </div>
                                    <h3>{book.name}</h3>
                                    <p>ISBN: {book.isbn}</p>
                                    <p>Autor: {book.author}</p>
                                    <p>Editorial: {book.editorial}</p>
                                </article>
                            ))
                        ) : (
                            <p className="empty-state">
                                La pila esta vacia. Agrega un libro desde el formulario.
                            </p>
                        )}
                    </div>
                </article>
            </div>
        </section>
    );
}

export default BooksStackPage;
