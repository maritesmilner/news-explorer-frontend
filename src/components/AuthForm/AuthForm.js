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
        className="form__auth-input"
        type="email"
        name="email"
        label="Email"
        value={props.values.email}
        placeHolder="Enter email"
        minLength="2"
        isRequired={true}
        onInputChange={props.onInputChange}
        isError={props.errorFlags.email}
        isDisabled={props.isSubmitting}
      />
      <Input
        className="form__auth-input"
        type="password"
        name="password"
        label="Password"
        value={props.values.password}
        placeHolder="Enter password"
        minLength="8"
        maxLength="40"
        isRequired={true}
        onInputChange={props.onInputChange}
        isError={props.errorFlags.password}
        isDisabled={props.isSubmitting}
      />
      {props.isSignup &&
        <Input
          className="form__auth-input"
          type="text"
          name="name"
          label="Username"
          value={props.values.name}
          placeHolder="Enter your username"
          isRequired={true}
          onInputChange={props.onInputChange}
          isError={props.errorFlags.name}
          isDisabled={props.isSubmitting}
        />
      }
    </PopupWithForm>
  );
}
