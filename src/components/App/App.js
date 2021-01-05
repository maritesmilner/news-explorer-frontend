import './App.css';
import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import newsApi from "../../utils/NewsApi";
import mainApi from "../../utils/MainApi";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import AuthForm from "../AuthForm/AuthForm";
import Popup from "../Popup/Popup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App(props) {
  const [currentUser, setCurrentUser] = React.useState({});
  const currentUserValue = { currentUser, setCurrentUser };
  const [values, setValues] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [isSigninPopupOpen, setIsSigninPopupOpen] = React.useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = React.useState(false);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [resultCount, setResultCount] = React.useState();
  const [isVisible, setIsVisible] = React.useState(false);
  const [newsCards, setNewsCards] = React.useState([]);
  const [isApiError, setIsApiError] = React.useState(false);
  const initialDisplayCount = React.useRef(3);
  const [displayCount, setDisplayCount] = React.useState(initialDisplayCount.current);
  // const isSignedIn = React.useRef(false);

  const authorize = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // we'll verify the token
      mainApi.authorize(token)
        .then((res) => {
          console.log(res);
          setCurrentUser(res);
          setIsSignedIn(true);
          props.history.push(props.location.pathname);
        })
        .catch((err) => {
          console.log(err);
          setIsInfoPopupOpen(true);
        });
    }
  };

  React.useEffect(() => {
    !isSignedIn && authorize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

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
    mainApi.signin({ email: values.email, password: values.password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          authorize();
        } else {
          setIsInfoPopupOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoPopupOpen(true);
      });
  };

  const handleSignup = () => {
    closeAllPopups();
    mainApi.signup({ email: values.email, password: values.password, name: values.name })
      .then((res) => {
        setIsInfoPopupOpen(true);
        setIsSignupSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoPopupOpen(true);
      });
  };

  const handleSignout = () => {
    localStorage.removeItem('token');
    props.history.push('/');
  };


  const handleSearch = () => {
    if (!values.searchInput) {
      setErrorFlags({ ...errorFlags, searchInput: true });
      return;
    }
    setIsSearching(true);
    newsApi
      .getArticles({ query: values.searchInput })
      .then((res) => {
        setNewsCards(res.articles);
        setResultCount(res.totalResults);
      })
      .catch((err) => {
        console.log(err);
        setIsApiError(true);
      });
    setTimeout(function () { setIsSearching(false) }, 250);
    setIsVisible(true);
    setDisplayCount(initialDisplayCount.current);
  }
  const handleMore = () => {
    setDisplayCount(displayCount + initialDisplayCount.current)
  };

  return (
    <CurrentUserContext.Provider value={currentUserValue}>
      <div className="page">
        <Header
          handleSigninClick={handleSigninClick}
          handleSignout={handleSignout}
          isSignedIn={isSignedIn}
        />
        <Main>
          <Switch>
            <Route exact path="/">
              <SearchForm
                onInputChange={handleChange}
                errorFlags={errorFlags}
                values={values}
                handleSubmit={handleSearch}
                formClassName="form__search"
                submitButtonLabel="Search"
                submitButtonClassName="form__search-submit"
                isSubmitButtonEnabled={true}
                isSearching={isSearching}
              >
                <NewsCardList
                  title="Search results"
                  resultCount={resultCount}
                  isSearching={isSearching}
                  displayCount={displayCount}
                  newsCards={newsCards}
                  isVisible={isVisible}
                  isApiError={isApiError}
                  handleMore={handleMore}
                />
              </SearchForm>
              <About />
            </Route>
            <ProtectedRoute
              path="/saved-news"
              component={SavedNews}
              isSignedIn={isSignedIn}
              newsCards={newsCards}
              isVisible={true}
              authorize={authorize}
            />
            <Route>
              <Redirect to="/" />
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
            submitButtonClassName="form__submit"
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
            submitButtonClassName="form__submit"
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
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
