import React from "react";
import { NavLink, withRouter } from "react-router-dom";
// import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./Navigation.css";

function Navigation(props) {
  //for stage-3
  // const { currentUser } = React.useContext(CurrentUserContext);
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

  const handleResize = (e) => {
    setWindowSize(window.innerWidth);
  };
  const toggleBurgerMenu = () => {
    isBurgerMenuOpen ? setIsBurgerMenuOpen(false) : setIsBurgerMenuOpen(true);
  };

  const handleSignout = () => {
    isBurgerMenuOpen && toggleBurgerMenu();
    //proceed to signout
  }

  const handleSignin = () => {
    isBurgerMenuOpen && toggleBurgerMenu();
    props.handleSigninClick();
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  let menuItemPlacement = "";
  let saveArticles = "";
  let button = "";
  let burgerMenuPlacement = "";
  let headerMenuColPlacement = "";
  let closeButtonPlacement = "";
  if (props.location.pathname === "/saved-news") {
    menuItemPlacement = "header__menu-item_placement_saved-articles";
    headerMenuColPlacement = "header__menu-col_placement_saved-articles";
    burgerMenuPlacement = "header__burger-menu_placement_saved-articles";
    closeButtonPlacement = "header__close_placement__saved-articles";
    saveArticles = <li className="header__menu-item">
      <NavLink className={`header__menu-item_news ${menuItemPlacement}`} activeClassName="header_menu-item_selected " to="/saved-news">Saved articles</NavLink>
    </li>;
    button = <button className={`header__menu-item_signout ${menuItemPlacement}`} type="button" aria-label="sign out" onClick={handleSignout}>
      Elise <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M10 6L6 6L6 18H10V20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H10V6ZM17.5856 13L13.2927 17.1339L14.707 18.4958L21.4141 12.0371L14.707 5.57837L13.2927 6.9402L17.5856 11.0741H8V13H17.5856Z" fill="#1A1B22" />
      </svg>
    </button>
  } else {
    button = <button className={`header__menu-item_signin ${menuItemPlacement}`} type="button" aria-label="sign in" onClick={handleSignin}>Sign in</button>
  }

  let navClassName = "header__menu";
  if (windowSize < 768 && isBurgerMenuOpen) {
    navClassName += " header__menu-col";
    navClassName = navClassName.concat(' ', headerMenuColPlacement);
  }

  if (windowSize < 768 && !isBurgerMenuOpen) {
    return (
      <nav>
        <ul className={navClassName}>
          <li className="header__menu-item">
            <button className={`header__burger-menu ${burgerMenuPlacement}`} type="button" aria-label="menu" onClick={toggleBurgerMenu}>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="16" height="2" />
                <rect x="4" y="14" width="16" height="2" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul className={navClassName}>
        <li className="header__menu-item">
          <NavLink className={`header__menu-item_home ${menuItemPlacement}`} activeClassName="header_menu-item_selected " to="/" exact>Home</NavLink>
        </li>
        {saveArticles}
        <li className="header__menu-item">
          {button}
        </li>
      </ul>
      {windowSize < 768 && isBurgerMenuOpen &&
        <button
          type="button"
          className={`header__close ${closeButtonPlacement}`}
          onClick={toggleBurgerMenu}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.4142 12L18.7071 17.2928L17.2929 18.7071L11.2929 12.7071C10.9024 12.3165 10.9024 11.6834 11.2929 11.2928L17.2929 5.29285L18.7071 6.70706L13.4142 12Z" />
            <path d="M10.8787 12L5.58577 17.2928L6.99999 18.7071L13 12.7071C13.3905 12.3165 13.3905 11.6834 13 11.2928L6.99999 5.29285L5.58577 6.70706L10.8787 12Z" />
          </svg>
        </button>
      }
    </nav>
  );
}

export default withRouter(Navigation);
