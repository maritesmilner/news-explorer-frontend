import React from "react";
import "./Form.css"

export default function Form(props) {
  const [disableSubmit, setDisableSubmit] = React.useState(true);

  React.useEffect(() => {
    if (props.isSubmitting) {
      setDisableSubmit(true);
      return;
    }
    if (props.errorFlags && Object.keys(props.errorFlags).length > 0) {
      const flagsArr = Object.keys(props.errorFlags);
      const hasEmpty = React.Children.toArray(props.children).some((child) =>
        child.props.value ? false : true
      );
      hasEmpty
        ? setDisableSubmit(true)
        : setDisableSubmit(flagsArr.some((k) => props.errorFlags[k] === true));
    } else {
      setDisableSubmit(true);
    }
  }, [props.errorFlags, props.children, props.isSubmitting]);

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
        {props.errorFlags.serverError && <p className="form__error">{props.errorFlags.serverError}</p>}
        <button
          type="submit"
          className={disableSubmit ? `${props.submitButtonClassName} form__submit_disabled` : props.submitButtonClassName}
          disabled={disableSubmit}
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
