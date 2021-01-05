import React from "react";
import "./Form.css"

export default function Form(props) {
  const [isInputError, setIsInputError] = React.useState(true);
  const children = props.children;

  React.useEffect(() => {
    if (props.isSubmitButtonEnabled) {
      setIsInputError(false);
      return;
    }
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
  }, [props.errorFlags, children, props.isSubmitButtonEnabled]);

  function handleSubmit(e) {
    e.preventDefault();
    props.handleSubmit();
  }


  return (
    <>
      <form className={`form ${props.formClassName}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="form__title">{props.title}</h1>
        {props.children}
        <button
          type="submit"
          className={isInputError ? `${props.submitButtonClassName} form__submit_disabled` : props.submitButtonClassName}
          disabled={isInputError}
          onClick={handleSubmit}
        >
          {props.submitButtonLabel}
        </button>
      </form>
      {props.formClassName === "form__search" ? "" :
        <p className="form__footer">
          or <button type="button" className="form__footer-button" onClick={props.handleAltLinkClick}>{props.altLink}</button>
        </p>
      }
    </>
  );
}
