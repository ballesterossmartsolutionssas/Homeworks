import { useMemo, useState } from 'react';
import { MusicPlatform, createInitialMusicPlatform } from './structures/musicPlatform';

function App() {
    const [platform, setPlatform] = useState(() => createInitialMusicPlatform());
    const [songForm, setSongForm] = useState({
        title: '',
        artist: '',
        genre: '',
        plays: '',
        related: ''
    });
    const [searchForm, setSearchForm] = useState({
        prefix: 'al',
        limit: 3,
        exactTitle: 'Algebra Flow'
    });
    const [selectedSong, setSelectedSong] = useState('Algebra Flow');
    const [message, setMessage] = useState(
        'Songs are stored in the Trie, ranked with a Max Heap, and connected through an undirected graph.'
    );

    const songs = platform.getAllSongs();
    const trieRows = platform.getTrieRows();
    const adjacencyRows = platform.getAdjacencyRows();
    const graphEdges = platform.getGraphEdges();
    const suggestions = useMemo(
        () => platform.getSuggestions(searchForm.prefix),
        [platform, searchForm.prefix]
    );
    const prefixTopSongs = useMemo(
        () => platform.searchTopK(searchForm.prefix, Number(searchForm.limit)),
        [platform, searchForm.prefix, searchForm.limit]
    );
    const globalTopSongs = useMemo(() => platform.getTopSongs(5), [platform]);
    const recommendations = useMemo(
        () => platform.getRecommendations(selectedSong),
        [platform, selectedSong]
    );
    const exactExists = useMemo(
        () => platform.songExists(searchForm.exactTitle),
        [platform, searchForm.exactTitle]
    );
    const highestPlayCount = Math.max(...songs.map((song) => song.plays), 1);

    const handleSongChange = (event) => {
        const { name, value } = event.target;

        setSongForm((currentForm) => ({
            ...currentForm,
            [name]: value
        }));
    };

    const handleSearchChange = (event) => {
        const { name, value } = event.target;

        setSearchForm((currentForm) => ({
            ...currentForm,
            [name]: value
        }));
    };

    const handleInsertSong = (event) => {
        event.preventDefault();

        try {
            const nextPlatform = new MusicPlatform(songs, graphEdges);
            const song = nextPlatform.insertSong(
                songForm.title,
                Number(songForm.plays),
                songForm.artist,
                songForm.genre
            );
            const relatedTitles = songForm.related
                .split(',')
                .map((title) => title.trim())
                .filter(Boolean);

            relatedTitles.forEach((relatedTitle) => nextPlatform.connectSongs(song.title, relatedTitle));

            setPlatform(nextPlatform);
            setSongForm({
                title: '',
                artist: '',
                genre: '',
                plays: '',
                related: ''
            });
            setSearchForm((currentForm) => ({
                ...currentForm,
                prefix: song.title.slice(0, 2),
                exactTitle: song.title
            }));
            setSelectedSong(song.title);
            setMessage(`Inserted "${song.title}" and connected ${relatedTitles.length} recommendation(s).`);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <main className="app-shell">
            <section className="hero-section">
                <div className="hero-copy">
                    <p className="eyebrow">Parcial 3</p>
                    <h1>Spotify Learning Dashboard</h1>
                    <p>
                        Predictive song search with a Trie, popularity rankings with a Max Heap,
                        and related-song recommendations with an undirected graph.
                    </p>
                </div>

                <div className="hero-metrics" aria-label="Music platform summary">
                    <article>
                        <span>Songs</span>
                        <strong>{songs.length}</strong>
                    </article>
                    <article>
                        <span>Trie nodes</span>
                        <strong>{trieRows.length}</strong>
                    </article>
                    <article>
                        <span>Graph edges</span>
                        <strong>{graphEdges.length}</strong>
                    </article>
                </div>
            </section>

            <section className="workspace-grid">
                <aside className="control-panel">
                    <div className="panel-heading">
                        <p className="eyebrow">Trie insert</p>
                        <h2>Add educational song</h2>
                    </div>

                    <form className="dashboard-form" onSubmit={handleInsertSong}>
                        <label>
                            Song title
                            <input
                                type="text"
                                name="title"
                                value={songForm.title}
                                onChange={handleSongChange}
                                placeholder="Example: Chemistry Chill"
                            />
                        </label>

                        <label>
                            Artist
                            <input
                                type="text"
                                name="artist"
                                value={songForm.artist}
                                onChange={handleSongChange}
                                placeholder="Example: Science Lab"
                            />
                        </label>

                        <div className="form-row">
                            <label>
                                Genre
                                <input
                                    type="text"
                                    name="genre"
                                    value={songForm.genre}
                                    onChange={handleSongChange}
                                    placeholder="Science"
                                />
                            </label>

                            <label>
                                Plays
                                <input
                                    type="number"
                                    name="plays"
                                    min="0"
                                    step="1"
                                    value={songForm.plays}
                                    onChange={handleSongChange}
                                    placeholder="920"
                                />
                            </label>
                        </div>

                        <label>
                            Related songs
                            <input
                                type="text"
                                name="related"
                                value={songForm.related}
                                onChange={handleSongChange}
                                placeholder="Algebra Flow, Physics Waves"
                            />
                        </label>

                        <button type="submit">Insert song</button>
                    </form>

                    <p className="status-message">{message}</p>
                </aside>

                <section className="results-panel">
                    <div className="panel-heading">
                        <p className="eyebrow">Max Heap</p>
                        <h2>Top songs in the platform</h2>
                    </div>

                    <RankingList songs={globalTopSongs} highestPlayCount={highestPlayCount} />
                </section>
            </section>

            <section className="search-section">
                <div className="panel-heading">
                    <p className="eyebrow">Predictive search</p>
                    <h2>Trie suggestions by prefix</h2>
                </div>

                <form className="dashboard-form search-form">
                    <label>
                        Prefix
                        <input
                            type="text"
                            name="prefix"
                            value={searchForm.prefix}
                            onChange={handleSearchChange}
                            placeholder="al"
                        />
                    </label>

                    <label>
                        Top K
                        <input
                            type="number"
                            name="limit"
                            min="1"
                            max="10"
                            step="1"
                            value={searchForm.limit}
                            onChange={handleSearchChange}
                        />
                    </label>

                    <label>
                        Exact title
                        <input
                            type="text"
                            name="exactTitle"
                            value={searchForm.exactTitle}
                            onChange={handleSearchChange}
                            placeholder="Algebra Flow"
                        />
                    </label>
                </form>

                <div className="search-grid">
                    <article className="data-panel">
                        <div className="panel-heading compact">
                            <p className="eyebrow">Exists</p>
                            <h2>{exactExists ? 'Song found' : 'Song not found'}</h2>
                        </div>
                        <p className={exactExists ? 'existence-badge exists' : 'existence-badge'}>
                            {searchForm.exactTitle || 'No title'} {exactExists ? 'is stored' : 'is not stored'}
                        </p>
                    </article>

                    <article className="data-panel">
                        <div className="panel-heading compact">
                            <p className="eyebrow">Suggestions</p>
                            <h2>{suggestions.length} prefix match(es)</h2>
                        </div>
                        <SongList songs={suggestions} emptyText="No songs match this prefix." />
                    </article>

                    <article className="data-panel">
                        <div className="panel-heading compact">
                            <p className="eyebrow">Top K</p>
                            <h2>Best matches</h2>
                        </div>
                        <RankingList songs={prefixTopSongs} highestPlayCount={highestPlayCount} compact />
                    </article>
                </div>
            </section>

            <section className="details-grid">
                <article className="data-panel">
                    <div className="panel-heading compact">
                        <p className="eyebrow">Graph</p>
                        <h2>Related songs</h2>
                    </div>

                    <label className="select-label">
                        Song
                        <select value={selectedSong} onChange={(event) => setSelectedSong(event.target.value)}>
                            {songs.map((song) => (
                                <option key={song.title} value={song.title}>
                                    {song.title}
                                </option>
                            ))}
                        </select>
                    </label>

                    <SongList songs={recommendations} emptyText="No recommendations yet." />
                </article>

                <article className="data-panel">
                    <div className="panel-heading compact">
                        <p className="eyebrow">Adjacency list</p>
                        <h2>Undirected graph</h2>
                    </div>

                    <ul className="adjacency-list">
                        {adjacencyRows.map((row) => (
                            <li key={row.song.title}>
                                <strong>{row.song.title}</strong>
                                <span>
                                    {row.recommendations.length > 0
                                        ? row.recommendations.join(', ')
                                        : 'No edges'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </article>

                <article className="data-panel trie-panel">
                    <div className="panel-heading compact">
                        <p className="eyebrow">Trie traversal</p>
                        <h2>Song title nodes</h2>
                    </div>

                    <ul className="trie-list">
                        {trieRows.map((row) => (
                            <li key={row.id} style={{ '--depth': row.depth }}>
                                <span className={row.isEndOfWord ? 'node-letter end-word' : 'node-letter'}>
                                    {row.letter === ' ' ? 'space' : row.letter}
                                </span>
                                <strong>{row.prefix}</strong>
                                <small>
                                    {row.children.length > 0
                                        ? `children: ${row.children
                                              .map((letter) => (letter === ' ' ? 'space' : letter))
                                              .join(', ')}`
                                        : 'leaf node'}
                                </small>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>
        </main>
    );
}

function RankingList({ songs, highestPlayCount, compact = false }) {
    if (songs.length === 0) {
        return <p className="empty-copy">No ranked songs available.</p>;
    }

    return (
        <ol className={compact ? 'ranking-list compact' : 'ranking-list'}>
            {songs.map((song, index) => (
                <li key={song.title}>
                    <span className="rank">{index + 1}</span>
                    <div>
                        <strong>{song.title}</strong>
                        <span>
                            {song.artist} - {song.genre}
                        </span>
                    </div>
                    <meter min="0" max={highestPlayCount} value={song.plays}>
                        {song.plays}
                    </meter>
                    <em>{song.plays}</em>
                </li>
            ))}
        </ol>
    );
}

function SongList({ songs, emptyText }) {
    if (songs.length === 0) {
        return <p className="empty-copy">{emptyText}</p>;
    }

    return (
        <ul className="song-list">
            {songs.map((song) => (
                <li key={song.title}>
                    <div>
                        <strong>{song.title}</strong>
                        <span>
                            {song.artist} - {song.genre}
                        </span>
                    </div>
                    <em>{song.plays}</em>
                </li>
            ))}
        </ul>
    );
}

export default App;
