import { PopupWithForm } from "../PopupWithForm/PopupWithForm";
import { useState } from "react";

export function RegistrationForm({
  openModal,
  isOpen,
  onClose,
  handleRegistration,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(email, password, username);
  };
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form__label">Password</label>
          <input
            required
            name="password"
            type="password"
            value={password}
            placeholder="Enter password"
            className="form__input"
            minLength={3}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="form__label">Username</label>
          <input
            required
            name="username"
            type="text"
            value={username}
            placeholder="Enter your username"
            className="form__input"
            minLength={3}
            onChange={(e) => setUsername(e.target.value)}
          />
        </fieldset>
        <button type="submit" onClick={handleRegistration} className="form__button">
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
