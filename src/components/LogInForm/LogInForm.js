import { PopupWithForm } from "../PopupWithForm/PopupWithForm";

export function LogIn({ onLoggedIn, openModal, isOpen, onClose }) {
  return (
    <PopupWithForm title={"Sign in"} isOpen={isOpen} onClose={onClose}>
      <form className="form" noValidate>
        <fieldset className="form__register">
          <label className="form__label">Email</label>
          <input
            required
            name="email"
            type="email"
            placeholder="Enter email"
            className="form__input"
          />
          <label className="form__label">Password</label>
          <input
            required
            name="password"
            type="password"
            placeholder="Enter password"
            className="form__input"
          />
        </fieldset>
        <button onClick={onLoggedIn} className="form__button">
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
