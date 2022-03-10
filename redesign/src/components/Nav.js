import './nav.css';
import { NavLink } from "react-router-dom";

const Nav = () => {
  return  (
    <nav className="noprint">
      <ul className="nav nav-pills">
        <li>
          <NavLink
            to="/setlists" 
            activeClassName="active"
            isActive={(match, location) => (match || location.pathname === '/')}
          >
            Setlists
          </NavLink>
        </li>
        <li>
          <NavLink to="/songs" activeClassName="active">
            Songs
          </NavLink> 
        </li>
      </ul>
    </nav>
  )
}

export default Nav;
