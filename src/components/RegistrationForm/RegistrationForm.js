import { PopupWithForm } from "../PopupWithForm/PopupWithForm";
import { useForm } from "../useFormValidation/useFormValidation";
import { useState, useEffect, useRef } from "react";

export function RegistrationForm({
  openModal,
  isOpen,
  onClose,
  handleRegistration,
  globalErrorMessage
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const button = useRef()
  const { handleChange, isValid, errors, resetForm } = useForm();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(email, password, username);
  };
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen])
  useEffect(() => {
    if (!isValid) {
      button.current.setAttribute("disabled", "");
    }
    if (isValid) {
      button.current.removeAttribute("disabled", "");
    }
  }, [isValid])
  return (
    <PopupWithForm title={"Sign up"} isOpen={isOpen} onClose={onClose}>
      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="form__register">
          <label className="form__label">Email</label>
          <input
            required
            name="email"
            type="email"
            value={email}
            placeholder="Enter email"
            className="form__input"
            onChange={(e) => {
              setEmail(e.target.value);
              handleChange(e);
            }}
          />
          <span id="input_type_password-error" className="form__span-error">
            {errors.email ? errors.email : ""}
          </span>
          <label className="form__label">Password</label>
          <input
            required
            name="password"
            type="password"
            value={password}
            placeholder="Enter password"
            className="form__input"
            minLength={3}
            onChange={(e) => {
              setPassword(e.target.value);
              handleChange(e);
            }}
          />
          <span id="input_type_password-error" className="form__span-error">
            {errors.password ? errors.password : ""}
          </span>
          <label className="form__label">Username</label>
          <input
            required
            name="username"
            type="text"
            value={username}
            placeholder="Enter your username"
            className="form__input"
            minLength={2}
            onChange={(e) => {
              setUsername(e.target.value);
              handleChange(e);
            }}
          />
          <span id="input_type_password-error" className="form__span-error">
            {errors.username ? errors.username : ""}
          </span>
        </fieldset>
        <span id="input_type_global-error" className="form__span-error">
          {globalErrorMessage && globalErrorMessage}
        </span>
        <button
          type="submit"
          ref={button}
          onClick={handleRegistration}
          className="form__button"
          disabled
        >
          Sign up
        </button>
        <div className="form__redirect">
          <span>or </span>
          <button onClick={openModal} className="form__redirect-link">
            Sign in
          </button>
        </div>
      </form>
    </PopupWithForm>
  );
}
