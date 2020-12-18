import React from "react";
import "./PopupWithForm.css"

export default function PopupWithForm(props) {
  const [isInputError, setIsInputError] = React.useState(true);
  const children = props.children;

  React.useEffect(() => {
    if (props.errorFlags && Object.keys(props.errorFlags).length > 0) {
      const flagsArr = Object.keys(props.errorFlags);
      const hasEmpty = React.Children.toArray(children).some((child) =>
        child.props.value ? false : true
      );
      hasEmpty
        ? setIsInputError(true)
        : setIsInputError(flagsArr.some((k) => props.errorFlags[k] === true));
    } else {
      setIsInputError(true);
    }
  }, [props.errorFlags, children]);

  return (
    <>
      <form
        onSubmit={props.onSubmit}
        noValidate
      >
        <h1 className="form__title">{props.title}</h1>
        {props.children}
        <button
          type="submit"
          className={isInputError ? "form__submit form__submit_disabled" : "form__submit"}
          disabled={isInputError}
        >
          {props.submitButtonLabel}
        </button>
        <button
          type="button"
          className="form__close"
          onClick={props.onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.4142 12L18.7071 17.2928L17.2929 18.7071L11.2929 12.7071C10.9024 12.3165 10.9024 11.6834 11.2929 11.2928L17.2929 5.29285L18.7071 6.70706L13.4142 12Z" fill="white" />
            <path d="M10.8787 12L5.58577 17.2928L6.99999 18.7071L13 12.7071C13.3905 12.3165 13.3905 11.6834 13 11.2928L6.99999 5.29285L5.58577 6.70706L10.8787 12Z" fill="white" />
          </svg>

        </button>

      </form>

    </>
  );
}
