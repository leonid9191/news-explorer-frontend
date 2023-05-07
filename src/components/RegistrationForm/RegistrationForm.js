import { PopupWithForm } from "../PopupWithForm/PopupWithForm";

export function RegistrationForm({ openModal, isOpen, onClose }) {
  return(
    <PopupWithForm title={'Sign up'} isOpen={isOpen} onClose={onClose}>
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
            <label className="form__label">Username</label>
            <input
              required
              name="username"
              type="text"
              placeholder="Enter your username"
              className="form__input"
            />
          </fieldset>
          <button type="submit" className="form__button">
            Sign up
          </button>
          <div className="form__redirect">
            <span>or </span>
            <a onClick={openModal} className="form__redirect__link">Sign in</a>
          </div>
        </form>
    </PopupWithForm>
  )
}