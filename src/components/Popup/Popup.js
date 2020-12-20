import "./Popup.css"

export default function Popup(props) {
  let message;
  if (props.isSignupSuccess) {
    message = props.successMessage;

  } else {
    message = props.errorMessage;

  }
  return (
    <section className={props.isOpen ? "" : "hide"}>
      <div className="overlay"></div>
      <div className="popup">
        {message ? <p className="popup__message">{message}</p> : ""}
        {props.children}
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.4142 12L18.7071 17.2928L17.2929 18.7071L11.2929 12.7071C10.9024 12.3165 10.9024 11.6834 11.2929 11.2928L17.2929 5.29285L18.7071 6.70706L13.4142 12Z" fill="white" />
            <path d="M10.8787 12L5.58577 17.2928L6.99999 18.7071L13 12.7071C13.3905 12.3165 13.3905 11.6834 13 11.2928L6.99999 5.29285L5.58577 6.70706L10.8787 12Z" fill="white" />
          </svg>
        </button>
        {props.isSignupSuccess &&
          <button type="button" className="popup__footer-button" onClick={props.handleAltLinkClick}>{props.altLink}</button>}
      </div>
    </section>
  );
}