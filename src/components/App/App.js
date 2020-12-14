import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import './App.css';


function App(props) {

  return (
    <div className="page">
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <SearchForm />
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
