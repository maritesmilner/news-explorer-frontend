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
import { SEARCH_RESULT_INITIAL_DISP_COUNT } from "../../utils/Constants";

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
  const [resultCount, setResultCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const [newsCards, setNewsCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);
  const [isApiError, setIsApiError] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const initialDisplayCount = React.useRef(SEARCH_RESULT_INITIAL_DISP_COUNT);
  const [displayCount, setDisplayCount] = React.useState(initialDisplayCount.current);

  const authorize = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // verify the token
      mainApi.authorize(token)
        .then((res) => {
          setCurrentUser(res);
          setIsSignedIn(true);
          props.history.push(props.location.pathname);
          return;
        })
        .catch((err) => {
          err.then((error) => {
            console.log(error.message);
            setIsApiError(true);
          })
        });
    }
  };

  React.useEffect(() => {
    const prevSearchResults = JSON.parse(localStorage.getItem('searchResults'));
    if (prevSearchResults) {
      setNewsCards(prevSearchResults);
      setResultCount(prevSearchResults.length);
      prevSearchResults.length > 0 && setIsVisible(true);
      return;
    }
    setIsVisible(false);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("searchResults", JSON.stringify(newsCards));
  }, [newsCards]);

  React.useEffect(() => {
    isSignedIn &&
      mainApi.getArticles(currentUser._id)
        .then((res) => {
          if (res.data) {
            setSavedCards(res.data);
            return;
          }
        })
        .catch((err) => {
          err.then((error) => {
            console.log(error.message);
            setIsApiError(true);
          })
        });
  }, [isSignedIn, currentUser]);

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
    setIsApiError(false);
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
    setIsSubmitting(true);
    mainApi.signIn({ email: values.email, password: values.password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          authorize();
          closeAllPopups();
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        err.then((error) => {
          setErrorFlags({ ...errorFlags, serverError: error.message });
        })
      });
  };

  const handleSignup = () => {
    setIsSubmitting(true);
    mainApi.signUp({ email: values.email, password: values.password, name: values.name })
      .then((res) => {
        closeAllPopups();
        setIsInfoPopupOpen(true);
        setIsSignupSuccess(true);
        setIsSubmitting(false);
      })
      .catch((err) => {
        err.then((error) => {
          setErrorFlags({ ...errorFlags, serverError: error.message });
        })
      });
  };

  const handleSignout = () => {
    localStorage.removeItem('token');
    setIsSignedIn(false);
    props.history.push('/');
  };

  const handleSearch = () => {
    if (!values.searchInput) {
      setErrorFlags({ ...errorFlags, searchInput: true });
      return;
    }
    setIsSubmitting(true);
    setIsSearching(true);
    newsApi
      .getArticles({ query: values.searchInput })
      .then((res) => {
        if (res.articles) {
          const cards = res.articles.map(a => {
            return {
              keyword: values.searchInput,
              title: a.title,
              text: a.description,
              source: a.source.name,
              link: a.link,
              image: a.urlToImage,
              date: a.publishedAt,
            }
          })
          setNewsCards(cards);
          setResultCount(res.totalResults);
        }
        setIsSearching(false);
        setIsSubmitting(false);
        setIsVisible(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSearching(false);
        setIsApiError(true);
      });
  }
  const handleMore = () => {
    setDisplayCount(displayCount + initialDisplayCount.current)
  };
  const handleDeleteCard = (card) => {
    mainApi
      .deleteArticle(card._id)
      .then((res) => {
        console.log(card);
        card.isSaved = false;
        const cards = [...newsCards];
        const foundIndex = cards.findIndex(c => c._id === card._id);
        cards[foundIndex] = card;
        setNewsCards(cards);
        const filteredCards = savedCards.filter(c => c._id !== card._id)
        setSavedCards(filteredCards);
      })
      .catch((err) => {
        err.then((error) => {
          console.log(error.message);
          setIsApiError(true);
        })
      });
  }
  const handleBookmark = (card) => {
    if (isSignedIn) {
      card.isSaved ?
        handleDeleteCard(card) :
        mainApi
          .saveArticle(card)
          .then((res) => {
            card._id = res.data._id;
            card.isSaved = true;
            const cards = [...newsCards];
            const foundIndex = cards.findIndex(c => c.title === card.title);
            cards[foundIndex] = card;
            setNewsCards(cards);
            setSavedCards([card, ...savedCards]);
          })
          .catch((err) => {
            err.then((error) => {
              console.log(error.message);
              setIsApiError(true);
            })
          });
    } else {
      handleSigninClick();
    }

  }

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
                isSearching={isSearching}
                isSubmitting={isSubmitting}
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
                  isSignedIn={isSignedIn}
                  handleBookmark={handleBookmark}
                />
              </SearchForm>
              <About />
            </Route>
            <ProtectedRoute
              path="/saved-news"
              component={SavedNews}
              isSignedIn={isSignedIn}
              newsCards={savedCards}
              handleDeleteCard={handleDeleteCard}
              keywordsToDisplay="3"
              handleSignin={handleSigninClick}
              handleClose={closeAllPopups}
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
            isSubmitting={isSubmitting}
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
            isSubmitting={isSubmitting}
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
