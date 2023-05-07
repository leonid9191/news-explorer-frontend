import { Children } from "react";

export function PopupWithForm({ title, isOpen, onClose, children }) {
  return (
    <div className={`popup ${isOpen && "popup-active"}`}>
      <div className="popup__window">
        <button
          type="button"
          className="popup__close-button"
          aria-label="close"
          onClick={onClose}
        ></button>

        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
