import { useState } from 'react';
import { Stack } from './structures/stack';
import './index.css';

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

function App() {
    const [booksStack] = useState(() => {
        const stack = new Stack();

        INITIAL_BOOKS.forEach((book) => {
            stack.push(book);
        });

        return stack;
    });
    const [form, setForm] = useState(EMPTY_FORM);
    const [lastAction, setLastAction] = useState('Pila inicial cargada con datos mock.');
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

        const hasEmptyFields =
            payload.name === '' ||
            payload.isbn === '' ||
            payload.author === '' ||
            payload.editorial === '';

        if (hasEmptyFields) {
            setLastAction('Completa todos los campos antes de agregar el libro.');
            return;
        }

        booksStack.push(payload);
        setForm(EMPTY_FORM);
        setLastAction(`Libro agregado al tope: ${payload.name}.`);
        forceRender();
    };

    const handlePop = () => {
        const removedBook = booksStack.pop();

        if (!removedBook) {
            setLastAction('La pila esta vacia. No hay libros para retirar.');
            return;
        }

        setLastAction(`Libro retirado del tope: ${removedBook.name}.`);
        forceRender();
    };

    return (
        <main className="page-shell">
            <section className="hero">
                <div>
                    <p className="eyebrow">Challenge 04</p>
                    <h1>Books Stack</h1>
                    <p className="hero-copy">
                        Implementacion de una pila de libros con React usando el principio
                        LIFO, datos mock, formulario para agregar nuevos elementos y visualizacion
                        completa en pantalla.
                    </p>
                    <p className="author-line">
                        Presentado por: Juan Camilo Ballesteros Sierra - Codigo 2230721
                    </p>
                </div>

                <div className="hero-stats">
                    <article className="stat-card">
                        <span>Total en pila</span>
                        <strong>{booksStack.size()}</strong>
                    </article>
                    <article className="stat-card">
                        <span>Estado</span>
                        <strong>{booksStack.isEmpty() ? 'Vacia' : 'Activa'}</strong>
                    </article>
                    <article className="stat-card">
                        <span>Tope actual</span>
                        <strong>{topBook ? topBook.name : 'Sin libros'}</strong>
                    </article>
                </div>
            </section>

            <section className="content-grid">
                <article className="panel">
                    <div className="panel-heading">
                        <div>
                            <p className="panel-label">Formulario</p>
                            <h2>Agregar libro a la pila</h2>
                        </div>
                        <button type="button" className="secondary-button" onClick={handlePop}>
                            Pop del tope
                        </button>
                    </div>

                    <form className="book-form" onSubmit={handleSubmit}>
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

                    <p className="status-message">{lastAction}</p>
                </article>

                <article className="panel">
                    <div className="panel-heading">
                        <div>
                            <p className="panel-label">Impresion</p>
                            <h2>Stack de libros en pantalla</h2>
                        </div>
                    </div>

                    <div className="top-preview">
                        <span>Peek actual</span>
                        <strong>
                            {topBook
                                ? `${topBook.name} | ${topBook.author}`
                                : 'La pila no tiene elementos'}
                        </strong>
                    </div>

                    <div className="stack-list">
                        {books.length > 0 ? (
                            books.map((book, index) => (
                                <article
                                    key={book.id}
                                    className={`book-card ${index === 0 ? 'book-card-top' : ''}`}
                                >
                                    <div className="book-level">
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
            </section>
        </main>
    );
}

export default App;
