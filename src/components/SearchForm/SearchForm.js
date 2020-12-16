import './SearchForm.css';
import Input from "../Input/Input";

export default function SearchForm(props) {
  const isInputError = props.errorFlags.name;
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
            name="search-input"
            value={props.values.name}
            placeHolder="Enter topic"
            isRequired={true}
            onInputChange={props.onInputChange}
            isError={isInputError}
          />
          <button
            type="submit"
            className={`search__submit ${isInputError ? "search__submit_disabled" : ""
              }`}
            disabled={isInputError}
          >
            Search
          </button>

        </form>
      </div>
    </section>
  );
}
