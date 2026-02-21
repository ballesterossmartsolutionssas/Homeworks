import { useEffect, useRef, useState } from "react";
import DoublyLinkedList from "../structures/DoublyLinkedList";

const MOCK_HISTORY = [
  "google.com",
  "youtube.com",
  "github.com",
  "react.dev",
  "vite.dev",
  "wikipedia.org",
];

function HistoryPage() {
  const historyRef = useRef(new DoublyLinkedList());
  const [historyValues, setHistoryValues] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [newPage, setNewPage] = useState("");

  useEffect(() => {
    const history = new DoublyLinkedList();
    MOCK_HISTORY.forEach((page) => history.append(page));
    history.current = history.tail;

    historyRef.current = history;
    setHistoryValues(history.print());
    setCurrentNode(history.current);
  }, []);

  const handleBack = () => {
    const moved = historyRef.current.back();
    if (moved) {
      setCurrentNode(moved);
    }
  };

  const handleForward = () => {
    const moved = historyRef.current.forward();
    if (moved) {
      setCurrentNode(moved);
    }
  };

  const handleVisitNewPage = () => {
    const safeValue = newPage.trim();

    if (!safeValue) {
      return;
    }

    const list = historyRef.current;
    list.visit(safeValue);

    setHistoryValues(list.print());
    setCurrentNode(list.current);
    setNewPage("");
  };

  return (
    <section className="panel">
      <h2>/history - DoublyLinkedList Browser History</h2>
      <p className="hint">
        Metodos usados: append, peek, size, remove, print, back y forward.
      </p>

      <div className="card">
        <h3>Pagina actual</h3>
        <p className="current-value">{currentNode ? currentNode.value : "Sin historial"}</p>
        <p className="meta">Total visitadas: {historyRef.current.size()}</p>
      </div>

      <div className="button-row">
        <button type="button" onClick={handleBack} disabled={!currentNode || !currentNode.prev}>
          Back
        </button>
        <button
          type="button"
          onClick={handleForward}
          disabled={!currentNode || !currentNode.next}
        >
          Forward
        </button>
      </div>

      <div className="visit-row">
        <input
          type="text"
          value={newPage}
          onChange={(event) => setNewPage(event.target.value)}
          placeholder="example.com"
        />
        <button type="button" onClick={handleVisitNewPage}>
          Visit new page
        </button>
      </div>

      <div className="card">
        <h3>Contenido (print)</h3>
        <ul className="list">
          {historyValues.map((page, index) => (
            <li key={`${page}-${index}`} className={currentNode && currentNode.value === page ? "active" : ""}>
              {page}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default HistoryPage;
