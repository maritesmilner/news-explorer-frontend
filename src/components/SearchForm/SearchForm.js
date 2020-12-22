import './SearchForm.css';
import Input from "../Input/Input";

export default function SearchForm(props) {
  const handleSearch = (e) => {
    e.preventDefault();
    props.values.searchInput && props.handleSubmit();
  }

  return (
    <section id="search">
      <div className="search">
        <h1 className="search__title">What's going on in the world?</h1>
        <p className="search__subtitle">Find the latest news on any topic and save them in your personal account.</p>

        <form
          className="search__form"
          onSubmit={props.onSubmit}
          noValidate
        >
          <Input
            className="search__input"
            type="text"
            name="searchInput"
            value={props.values.searchInput}
            placeHolder="Enter topic"
            onInputChange={props.onInputChange}
            isError={props.errorFlags.searchInput}
          />
          <button
            type="submit"
            className="search__submit"
            onClick={handleSearch}
          >
            Search
          </button>

        </form>
      </div>
    </section>
  );
}
