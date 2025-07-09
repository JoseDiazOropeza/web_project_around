// utils.js: controladores de eventos y funciones para popups

// Limpia todos los mensajes de error y estilos de los inputs de un formulario
export function clearFormErrors(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = "";
    input.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
  });
}

// Abre un elemento popup
export function openPopup(popupTarget) {
  popupTarget.classList.remove("popup_hidden");
  popupTarget.addEventListener("click", handleClickOutside);

  const formInside = popupTarget.querySelector("form");
}

// Cierra un elemento popup
export function closePopup(popupTarget) {
  popupTarget.classList.add("popup_hidden");
  popupTarget.removeEventListener("click", handleClickOutside);
  const formInside = popupTarget.querySelector("form");
  if (formInside) {
    clearFormErrors(formInside, window.validationConfig || {});
  }
}

// Cierra popup si se hace click fuera de él
export function handleClickOutside(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}
