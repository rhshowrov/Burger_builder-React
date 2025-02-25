import { NavLink ,Link } from 'react-router-dom';
import styles from './Header.module.css'
const Header = () => {
  return (
        <nav className="navbar navbar-expand-lg bg-warning border-bottom ">
          <div className="container">
            {/* Logo/Brand */}
            <Link  to="/">
            <img
              className={styles.burger_builder_home}
              src="images/logo.png"
              alt="BurGer Builder"
            />
            </Link>
    
            {/* Navigation Items */}
            <div className="collapse navbar-collapse " id="navbarNav" >
              <ul className="navbar-nav ms-auto ">
                <li className="nav-item">
                  <NavLink 
                    className="nav-link fw-bold text-black" 
                    to="/building-burger"
                  >
                    Build Burger
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink 
                    className="nav-link fw-bold text-black" 
                    to="#"
                  >
                    My Orders
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink 
                    className="nav-link fw-bold text-black" 
                    to="/logout"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  );
};

export default Header;
