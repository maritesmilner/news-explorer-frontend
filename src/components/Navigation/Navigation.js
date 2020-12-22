import React from "react";
import { NavLink, withRouter } from "react-router-dom";
// import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./Navigation.css";

function Navigation(props) {
  //for stage-3
  // const { currentUser } = React.useContext(CurrentUserContext);
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  const handleResize = (e) => {
    setWindowSize(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  let menuItemPlacement = "";
  let saveArticles = "";
  let button = "";
  if (props.location.pathname === "/saved-news") {
    menuItemPlacement = "navigation__menu-item_placement_saved-articles";
    saveArticles = <li style={{ display: windowSize > 768 ? 'inline-block' : 'none' }} className="navigation__menu-item">
      <NavLink className={`navigation__menu-item_news ${menuItemPlacement}`} activeClassName="navigation_menu-item_selected " to="/saved-news">Saved articles</NavLink>
    </li>;
    button = <button className={`navigation__menu-item_signout ${menuItemPlacement}`} type="button" aria-label="sign out" onClick={props.handleSignoutClick}>
      Elise <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M10 6L6 6L6 18H10V20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H10V6ZM17.5856 13L13.2927 17.1339L14.707 18.4958L21.4141 12.0371L14.707 5.57837L13.2927 6.9402L17.5856 11.0741H8V13H17.5856Z" fill="#1A1B22" />
      </svg>
    </button>
  } else {
    button = <button className={`navigation__menu-item_signin ${menuItemPlacement}`} type="button" aria-label="sign in" onClick={props.handleSigninClick}>Sign in</button>
  }

  return (
    <nav>
      <ul className="navigation__menu">
        <li style={{ display: windowSize > 768 ? 'inline-block' : 'none' }} className="navigation__menu-item">
          <NavLink className={`navigation__menu-item_home ${menuItemPlacement}`} activeClassName="navigation_menu-item_selected " to="/" exact>Home</NavLink>
        </li>
        {saveArticles}
        <li className="navigation__menu-item">
          {button}
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(Navigation);
