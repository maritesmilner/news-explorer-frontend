import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import AuthForm from "../AuthForm/AuthForm";
import Popup from "../Popup/Popup";
import './App.css';

function App() {
  const [values, setValues] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [isSigninPopupOpen, setIsSigninPopupOpen] = React.useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [resultCount, setResultCount] = React.useState(5);

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
    if (isInfoPopupOpen) {
      setIsInfoPopupOpen(false);
    }
    setErrorFlags({});
    setValues({});
  };

  const handleSigninClick = () => {
    closeAllPopups();
    setIsSigninPopupOpen(true);
  };
  const handleSignupClick = () => {
    closeAllPopups();
    setIsSignupPopupOpen(true);
  };
  const handleSignin = () => {
    closeAllPopups();
  }
  const handleSignup = () => {
    closeAllPopups();
    setIsInfoPopupOpen(true);
    setIsSignupSuccess(true);
  }
  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(function () { setIsSearching(false) }, 600);
    setResultCount(0);
  }

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
              handleSubmit={handleSearch}
            >
              <NewsCardList
                title="Search results"
                resultCount={resultCount}
                isSearching={isSearching}
                displayCount="3"
              />
            </SearchForm>
            <About />
          </Route>
          <Route path="/saved-news">
            <SavedNews />
          </Route>
        </Switch>
        <AuthForm
          isOpen={isSigninPopupOpen}
          onClose={closeAllPopups}
          values={values}
          errorFlags={errorFlags}
          onInputChange={handleChange}
          title="Sign in"
          submitButtonLabel="Sign in"
          altLink="Sign up"
          handleAltLinkClick={handleSignupClick}
          handleSubmit={handleSignin}
        />
        <AuthForm
          isOpen={isSignupPopupOpen}
          onClose={closeAllPopups}
          values={values}
          errorFlags={errorFlags}
          onInputChange={handleChange}
          title="Sign up"
          submitButtonLabel="Sign up"
          altLink="Sign in"
          handleAltLinkClick={handleSigninClick}
          handleSubmit={handleSignup}
          isSignup={true}
        />
        <Popup
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          successMessage="Registration successfully completed!"
          errorMessage="Oops, something went wrong! Please try again."
          isSignupSuccess={isSignupSuccess}
          altLink="Sign in"
          handleAltLinkClick={handleSigninClick}
        />
        <Footer />
      </Main>
    </div>
  );
}

export default withRouter(App);
