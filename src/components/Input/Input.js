import React from "react";
import "./Input.css";

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: this.props.value };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.value !== prevProps.value) {
      this.setState({ ...this.state, inputValue: this.props.value });
    }
  }

  validateChange = (e) => {
    this.setState(
      {
        ...this.state,
        inputName: e.target.name,
        inputValue: e.target.value,
        isInputError: !e.target.validity.valid,
        inputErrorMessage: e.target.validationMessage,
      },
      () => this.props.onInputChange(this.state)
    );
  };

  render() {
    let className = this.props.className;
    if (this.props.error) {
      console.log(this.state.inputErrorMessage);
      className = `${className}_error-indicator`;
    }
    return (
      <>
        <input
          type={this.props.type}
          placeholder={this.props.placeHolder}
          name={this.props.name}
          className={className}
          id={this.props.name}
          minLength={this.props.minLength}
          maxLength={this.props.maxLength}
          required={this.props.isRequired}
          onChange={this.validateChange}
          value={this.state.inputValue || ""}
        />
        <span
          className={`input__error ${this.props.isError ? "input__error-msg" : ""
            }`}
          id={`${this.props.name}-error`}
        >
          {this.props.isError && this.state.inputErrorMessage}
        </span>
      </>
    );
  }
}
