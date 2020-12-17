import React from "react";

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

  let formClassName = "form";
  let titleClassName = "form__title";
  let saveButtonClassName = "form__save-button";
  let hasOverlay = true;
  let hasCloseButton = true;
  if (props.name === "sign-in" || props.name === "sign-up") {
    formClassName = "form_display_auth";
    titleClassName += " form__title_type_auth";
    saveButtonClassName += " form__save-button_type_auth";
    hasOverlay = false;
    hasCloseButton = false;
  }

  return (
    <section className={props.isOpen ? `${props.name}` : `${props.name} hide`}>
      {hasOverlay && <div className="overlay"></div>}
      <form
        className={formClassName}
        onSubmit={props.onSubmit}
        noValidate
      >
        <h2 className={titleClassName}>{props.title}</h2>
        {props.children}
        <button
          type="submit"
          className={`${saveButtonClassName} ${isInputError ? "form__save-button_disabled" : ""
            }`}
          disabled={isInputError}
        >
          {props.submitButtonLabel}
        </button>
        {hasCloseButton && <button
          type="button"
          className="form__close-button"
          onClick={props.onClose}
        ></button>}
      </form>
    </section>
  );
}
