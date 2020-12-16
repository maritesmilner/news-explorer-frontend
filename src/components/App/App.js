import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import './App.css';

function App(props) {
  const [values, setValues] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const handleChange = ({ inputName, inputValue, isInputError }) => {
    setValues({ ...values, [inputName]: inputValue });
    setErrorFlags({ ...errorFlags, [inputName]: isInputError });
  };

  return (
    <div className="page">
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <SearchForm
              onInputChange={handleChange}
              errorFlags={errorFlags}
              values={values}
            />
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
