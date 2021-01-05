import React from "react";
import "./Input.css";

export default function Input(props) {

  const [inputName, setInputName] = React.useState();
  const [inputValue, setInputValue] = React.useState(props.value);
  const [isInputError, setIsInputError] = React.useState(props.isInputError);

  const isInitialMount = React.useRef(true);
  const errorMsg = React.useRef("");

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      props.onInputChange({ inputName, inputValue, isInputError });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const validateChange = (e) => {
    setInputName(e.target.name);
    setInputValue(e.target.value);
    setIsInputError(!e.target.validity.valid);
    errorMsg.current = e.target.validationMessage;
  };


  const errorSpan = <span className="form__input-error-msg">{props.errorMessage ? props.errorMessage : errorMsg.current}</span>;

  return (
    <label className="form__input-label">
      {props.label}
      <input
        className={props.className}
        type={props.type}
        placeholder={props.placeHolder}
        name={props.name}
        minLength={props.minLength}
        maxLength={props.maxLength}
        required={props.isRequired}
        value={props.value || ""}
        onChange={validateChange}
      />
      {props.isError && errorSpan}
    </label>
  );
}
