import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="nav">
      <NavLink
        to="/songs"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Songs
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        History
      </NavLink>
    </nav>
  );
}

export default NavBar;
