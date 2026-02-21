import { useEffect, useRef, useState } from "react";
import LinkedList from "../structures/LinkedList";

const MOCK_SONGS = [
  "Numb - Linkin Park",
  "Yellow - Coldplay",
  "Viva La Vida - Coldplay",
  "Blinding Lights - The Weeknd",
  "As It Was - Harry Styles",
];

function SongsPage() {
  const playlistRef = useRef(new LinkedList());
  const [playlistValues, setPlaylistValues] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);

  useEffect(() => {
    const playlist = new LinkedList();
    MOCK_SONGS.forEach((song) => playlist.append(song));

    playlistRef.current = playlist;
    setPlaylistValues(playlist.print());
    setCurrentNode(playlist.head);
  }, []);

  const handleNext = () => {
    if (!currentNode || !currentNode.next) {
      return;
    }

    setCurrentNode(currentNode.next);
  };

  const handleRestart = () => {
    setCurrentNode(playlistRef.current.head);
  };

  const handleRemoveCurrent = () => {
    if (!currentNode) {
      return;
    }

    const list = playlistRef.current;
    const valueToRemove = currentNode.value;
    const nextValue = currentNode.next ? currentNode.next.value : null;

    list.remove(valueToRemove);
    const updated = list.print();
    setPlaylistValues(updated);

    if (list.size() === 0) {
      setCurrentNode(null);
      return;
    }

    if (nextValue) {
      setCurrentNode(list.peek(nextValue) || list.head);
      return;
    }

    setCurrentNode(list.head);
  };

  const currentIndex = currentNode ? playlistValues.indexOf(currentNode.value) + 1 : 0;

  return (
    <section className="panel">
      <h2>/songs - LinkedList Playlist</h2>
      <p className="hint">
        Metodos usados: append, peek, size, remove, print.
      </p>

      <div className="card">
        <h3>Cancion actual</h3>
        <p className="current-value">{currentNode ? currentNode.value : "Sin canciones"}</p>
        <p className="meta">
          Posicion: {currentIndex} / {playlistRef.current.size()}
        </p>
      </div>

      <div className="button-row">
        <button type="button" onClick={handleNext} disabled={!currentNode || !currentNode.next}>
          Next
        </button>
        <button type="button" onClick={handleRestart} disabled={!playlistRef.current.head}>
          Restart
        </button>
        <button type="button" onClick={handleRemoveCurrent} disabled={!currentNode}>
          Remove current
        </button>
      </div>

      <div className="card">
        <h3>Contenido (print)</h3>
        <ul className="list">
          {playlistValues.map((song) => (
            <li key={song} className={currentNode && currentNode.value === song ? "active" : ""}>
              {song}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SongsPage;
