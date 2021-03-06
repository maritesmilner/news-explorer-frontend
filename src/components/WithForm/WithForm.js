import React from "react";
import "./WithForm.css"
import Form from "../Form/Form";

export default function WithForm(WrappedComponent) {
  return (props) => (
    <WrappedComponent {...props}>
      <Form
        title={props.title}
        submitButtonLabel={props.submitButtonLabel}
        values={props.values}
        errorFlags={props.errorFlags}
        altLink={props.altLink}
        handleAltLinkClick={props.handleAltLinkClick}
        handleSubmit={props.handleSubmit}
      >
        {props.children}
      </Form>
      {props.bottomText}
    </WrappedComponent >
  );
}
