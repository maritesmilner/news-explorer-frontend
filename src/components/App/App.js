import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import './App.css';

function App(props) {
  const [values, setValues] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const handleChange = ({ inputName, inputValue, isInputError }) => {
    setValues({ ...values, [inputName]: inputValue });
    setErrorFlags({ ...errorFlags, [inputName]: isInputError });
  };
  //placeholder
  const handleSignin = () => {
  };

  return (
    <div className="page">
      <Header
        handleSignin={handleSignin}
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
        <Footer />
      </Main>
    </div>
  );
}

export default withRouter(App);
