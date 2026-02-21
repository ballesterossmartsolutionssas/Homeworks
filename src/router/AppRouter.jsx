import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import HistoryPage from "../pages/HistoryPage";
import SongsPage from "../pages/SongsPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="header">
          <h1>Challenge 03 - Lists</h1>
          <p>Singly Linked List y Doubly Linked List en React</p>
        </header>

        <NavBar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/songs" replace />} />
            <Route path="/songs" element={<SongsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="*" element={<Navigate to="/songs" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
