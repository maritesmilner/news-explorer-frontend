import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";
import './App.css';

function App() {
  const [values, setValues] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [isSigninPopupOpen, setIsSigninPopupOpen] = React.useState(
    false
  );
  const [isSignupPopupOpen, setIsSignupPopupOpen] = React.useState(
    false
  );

  const handleChange = ({ inputName, inputValue, isInputError }) => {
    setValues({ ...values, [inputName]: inputValue });
    setErrorFlags({ ...errorFlags, [inputName]: isInputError });
  };

  const closeAllPopups = () => {
    if (isSigninPopupOpen) {
      setIsSigninPopupOpen(false);
    }
    if (isSignupPopupOpen) {
      setIsSignupPopupOpen(false);
    }
    setErrorFlags({});
  };

  const handleSigninClick = () => {
    closeAllPopups();
    setIsSigninPopupOpen(true);
  };
  const handleSignupClick = () => {
    closeAllPopups();
    setIsSignupPopupOpen(true);
  };

  return (
    <div className="page">
      <Header
        handleSigninClick={handleSigninClick}
      />
      <Main>
        <Switch>
          <Route exact path="/">
            <SearchForm
              onInputChange={handleChange}
              errorFlags={errorFlags}
              values={values}
            />
            <NewsCardList />
            <About />
          </Route>
          <Route path="/saved-news">
            <SavedNews />
          </Route>
        </Switch>
        <Signin
          isOpen={isSigninPopupOpen}
          onClose={closeAllPopups}
          values={values}
          errorFlags={errorFlags}
          onInputChange={handleChange}
          handleSignupClick={handleSignupClick}
        />
        <Signup
          isOpen={isSignupPopupOpen}
          onClose={closeAllPopups}
          values={values}
          errorFlags={errorFlags}
          onInputChange={handleChange}
          handleSigninClick={handleSigninClick}
        />
        <Footer />
      </Main>
    </div>
  );
}

export default withRouter(App);
