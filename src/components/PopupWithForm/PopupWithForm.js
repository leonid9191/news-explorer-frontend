export function PopupWithForm() {
  return (
    <div className="popup">
      <div className="popup__window">
        <button
          type="button"
          className="popup__close-button"
          aria-label="close"
        ></button>

        <h2 className="popup__title">Sign in</h2>
        <form className="form">
          <fieldset className="form__register">
            <label className="form__label"  htmlFor="email">Email</label>
            <input
              required
              name="email"
              type="email"
              placeholder="Email"
              className="form__input"
            />
            <label className="form__label" htmlFor="password">Password</label>
            <input
              required
              name="password"
              type="password"
              placeholder="Password"
              className="form__input"
            />
          </fieldset>
          <button type="submit" className="form__button">
            Sign in
          </button>
          <div className="form__redirect">
            <span>or</span>
            <button className="form__redirect__link">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
