import './Signup.css';
import Input from "../Input/Input";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function Signup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onSignup();
  }
  return (
    <section className={props.isOpen ? "" : "hide"}>
      <div className="overlay"></div>
      <div className="signup">
        <PopupWithForm
          title="Sign up"
          isOpen={props.isOpen}
          onClose={props.onClose}
          submitButtonLabel="Sign up"
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
        <p className="signup__text">
          or <button type="button" className="signup__signin" onClick={props.handleSigninClick}>Sign in</button>
        </p>
      </div>
    </section>
  );
}
