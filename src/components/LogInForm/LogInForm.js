import { PopupWithForm } from "../PopupWithForm/PopupWithForm";
import { useState, useEffect, useRef } from "react";
import { useForm } from "../useFormValidation/useFormValidation";

export function LogIn({
  onLoggedIn,
  openModal,
  isOpen,
  onClose,
  globalErrorMessage,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const button = useRef();
  const { handleChange, isValid, errors, resetForm } = useForm();
  const handleSubmit = (e) => {
    e.preventDefault();
    onLoggedIn(email, password);
  };
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);
  useEffect(() => {
    if (!isValid) {
      button.current.setAttribute("disabled", "");
    }
    if (isValid) {
      button.current.removeAttribute("disabled", "");
    }
  }, [isValid]);

  return (
    <PopupWithForm title={"Sign in"} isOpen={isOpen} onClose={onClose}>
      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="form__register">
          <label className="form__label">Email</label>
          <input
            required
            name="email"
            type="email"
            placeholder="Enter email"
            className="form__input"
            value={email}
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
            placeholder="Enter password"
            className="form__input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleChange(e);
            }}
          />
          <span id="input_type_password-error" className="form__span-error">
            {errors.password ? errors.password : ""}
          </span>
        </fieldset>
        <button ref={button} type="submit" className="form__button">
          Sign in
        </button>
        <div className="form__redirect">
          <span>or </span>
          <button onClick={openModal} className="form__redirect-link">
            Sign up
          </button>
        </div>
      </form>
    </PopupWithForm>
  );
}
