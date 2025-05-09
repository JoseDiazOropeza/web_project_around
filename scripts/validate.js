"use strict";

// ======================================================================
// VALIDACIÓN GENÉRICA
// ======================================================================

// --- Muestra el mensaje de error correspondiente a un <input> ---
function showInputError(form, input, { inputErrorClass, errorClass }) {
  const errorElement = input.nextElementSibling;
  // Mensajes personalizados en español
  let message = "";
  if (input.validity.valueMissing) {
    message = "Por favor, rellena este campo.";
  } else if (input.validity.tooShort) {
    message = "Por favor, introduce al menos dos caracteres.";
  } else if (input.type === "url" && input.validity.typeMismatch) {
    message = "Por favor, introduce una URL válida.";
  } else {
    message = input.validationMessage;
  }
  errorElement.textContent = message;
  input.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
}

// --- Oculta el mensaje de error ---
function hideInputError(form, input, { inputErrorClass, errorClass }) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = "";
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
}

// --- Comprueba si un input es válido y llama a show / hide ---
function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
}

// --- Devuelve true si ALGÚN input del array es inválido ---
function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

// --- Activa / desactiva el botón de envío según la validez global ---
function toggleButtonState(inputList, button, { inactiveButtonClass }) {
  const shouldDisable = hasInvalidInput(inputList);
  button.disabled = shouldDisable;
  button.classList.toggle(inactiveButtonClass, shouldDisable);
}

// --- Añade los eventListeners a un formulario concreto ---
function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  // Estado inicial del botón
  toggleButtonState(inputList, submitButton, config);

  // Validación “en vivo”
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputList, submitButton, config);
    });
  });
}

// --- Limpia todos los mensajes de error y estilos de los inputs de un formulario ---
function clearFormErrors(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = "";
    input.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
  });
}

// --- FUNCIÓN PÚBLICA – se llama una sola vez en tu app ---
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.setAttribute("novalidate", true); // desactiva el mensaje nativo
    setEventListeners(form, config);
  });
}

// --- Exporta la función para uso externo ---
window.clearFormErrors = clearFormErrors;
