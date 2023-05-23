import { PopupWithForm } from "../PopupWithForm/PopupWithForm";
import { useState } from "react";

export function LogIn({ onLoggedIn, openModal, isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLoggedIn(email, password);
  }
  return (
    <PopupWithForm title={"Sign in"} isOpen={isOpen} onClose={onClose}>
      <form className="form" onSubmit={handleSubmit} >
        <fieldset className="form__register">
          <label className="form__label">Email</label>
          <input
            required
            name="email"
            type="email"
            placeholder="Enter email"
            className="form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form__label">Password</label>
          <input
            required
            name="password"
            type="password"
            placeholder="Enter password"
            className="form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button type="submit" className="form__button">
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
