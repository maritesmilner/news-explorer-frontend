import React from "react";
import './AuthForm.css';
import Input from "../Input/Input";
import Popup from "../Popup/Popup";
import WithForm from "../WithForm/WithForm";

const PopupWithForm = WithForm(Popup);

export default function AuthForm(props) {
  return (
    <PopupWithForm {...props}>
      <Input
        className="auth__input"
        type="email"
        name="email"
        label="Email"
        value={props.values.email}
        placeHolder="Enter email"
        minLength="2"
        maxLength="40"
        isRequired={true}
        onInputChange={props.onInputChange}
        isError={props.errorFlags.email}
      />
      <Input
        className="auth__input"
        type="password"
        name="password"
        label="Password"
        value={props.values.password}
        placeHolder="Enter password"
        minLength="2"
        maxLength="40"
        isRequired={true}
        onInputChange={props.onInputChange}
        isError={props.errorFlags.password}
      />
    </PopupWithForm>
  );
}
