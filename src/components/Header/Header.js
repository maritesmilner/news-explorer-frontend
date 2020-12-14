import React from 'react';
import { withRouter } from "react-router-dom";
import Navigation from '../Navigation/Navigation'
import './Header.css'

function Header(props) {
  let headerPlacement = "";
  let logoPlacement = "";
  if (props.location.pathname === '/saved-news') {
    headerPlacement = "header__placement_saved-articles";
    logoPlacement = "header__logo_placement_saved-articles";
  }

  return (
    <header className={`header ${headerPlacement}`}>
      <p className={`header__logo ${logoPlacement}`}>NewsExplorer</p>
      <Navigation />
    </header>
  );
}

export default withRouter(Header);
