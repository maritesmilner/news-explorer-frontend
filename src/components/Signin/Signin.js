import './Signin.css';
import Input from "../Input/Input";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { Link } from "react-router-dom";

export default function Signin(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onSignin();
  }
  return (
    <section className={props.isOpen ? "" : "hide"}>
      <div className="overlay"></div>
      <div className="signin">
        <PopupWithForm
          title="Sign in"
          isOpen={props.isOpen}
          onClose={props.onClose}
          submitButtonLabel="Sign in"
          onSubmit={handleSubmit}
          errorFlags={props.errorFlags}
        >
          <Input
            className="signin__input"
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
            className="signin__input"
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
        <p className="signin__text">
          or <Link to="/signup" className="signin__link">Sign up</Link>
        </p>
      </div>
    </section>
  );
}
