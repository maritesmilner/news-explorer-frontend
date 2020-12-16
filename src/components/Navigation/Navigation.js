import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./Navigation.css";

function Navigation(props) {
  const { currentUser } = React.useContext(CurrentUserContext);
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  const handleResize = (e) => {
    setWindowSize(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  let menuItemPlacement = "";
  if (props.location.pathname === "/saved-news") {
    menuItemPlacement = "header__menu-item_placement_saved-articles";
  }
  return (
    <nav>
      <ul className="header__menu>">
        <li style={{ display: windowSize > 768 ? 'inline-block' : 'none' }} className="header__menu-item">
          <NavLink className={`header__menu-item_home ${menuItemPlacement}`} activeClassName="header_menu-item_selected " to="/" exact>Home</NavLink>
        </li>
        <li style={{ display: windowSize > 768 ? 'inline-block' : 'none' }} className="header__menu-item">
          <NavLink className={`header__menu-item_news ${menuItemPlacement}`} activeClassName="header_menu-item_selected " to="/saved-news">Saved articles</NavLink>
        </li>
        <li style={{ display: currentUser ? 'block' : 'none' }} className="header__menu-item">
          <button className="header__signout" type="button" aria-label="sign out" onClick="">
            {currentUser.name}
          </button>
        </li>
        <li className="header__menu-item">
          <button className={`header__menu-item_signin ${menuItemPlacement}`} type="button" aria-label="sign in" onClick="">
            Sign in
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(Navigation);
