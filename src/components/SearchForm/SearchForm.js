import './SearchForm.css';
import Input from "../Input/Input";

export default function SearchForm(props) {
  const handleSearch = (e) => {
    e.preventDefault();
    props.values.searchInput && props.handleSubmit();
  }

  return (
    <section id="search">
      <div className="form form__search-wrapper">
        <h1 className="form__search-title">What's going on in the world?</h1>
        <p className="form__search-subtitle">Find the latest news on any topic and save them in your personal account.</p>

        <form
          className="form__search"
          onSubmit={props.onSubmit}
          noValidate
        >
          <Input
            className="form__search-input"
            type="text"
            name="searchInput"
            value={props.values.searchInput}
            placeHolder="Enter topic"
            onInputChange={props.onInputChange}
            isError={props.errorFlags.searchInput}
          />
          <button
            type="submit"
            className="form__search-submit"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </div>
      {props.children}
    </section>
  );
}
