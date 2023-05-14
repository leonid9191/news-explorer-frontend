import { PopupWithForm } from "../PopupWithForm/PopupWithForm";

export function SuccessRegistration({
  isOpen,
  onClose,
  openModal,
}) {
  return (
    <PopupWithForm
      title={"Registration successfully completed!"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <>
        <button className="form__redirect-link" onClick={openModal}>
          Sign in
        </button>
      </>
    </PopupWithForm>
  );
}
