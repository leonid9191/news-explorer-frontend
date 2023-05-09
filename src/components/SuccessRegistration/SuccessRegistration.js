import { PopupWithForm } from "../PopupWithForm/PopupWithForm";

export function SuccessRegistration(
  {isOpen = { isOpen },
  onClose = { onClose },
  openModal = {openModal}}
) {
  return (
    <PopupWithForm
      title={"Registration successfully completed!"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <>
        <button className="form__redirect_link" onClick={openModal}>
          Sign in
        </button>
      </>
    </PopupWithForm>
  );
}
