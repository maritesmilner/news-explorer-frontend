import './Signin.css';
import Input from "../Input/Input";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

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
        <p className="signin__text">
          or <button type="button" className="signin__signup" onClick={props.handleSignupClick}>Sign up</button>
        </p>
      </div>
    </section>
  );
}
