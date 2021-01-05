import './SearchForm.css';
import Input from "../Input/Input";
import WithForm from "../WithForm/WithForm";

function SearchFormContainer(props) {
  return (
    <section id="search">
      <div className="form form__search-wrapper">
        <h1 className="form__search-title">What's going on in the world?</h1>
        <p className="form__search-subtitle">Find the latest news on any topic and save them in your personal account.</p>
        {props.children}
      </div>
    </section>
  );
}

const SearchWithForm = WithForm(SearchFormContainer);
export default function SearchForm(props) {
  return (
    <>
      <SearchWithForm {...props}>
        <Input
          className="form__search-input"
          type="text"
          name="searchInput"
          value={props.values.searchInput}
          placeHolder="Enter topic"
          onInputChange={props.onInputChange}
          isError={props.errorFlags.searchInput}
          isRequired={true}
          errorMessage="Please enter a keyword"
        />
      </SearchWithForm>
      {props.children}
    </>
  );
}
