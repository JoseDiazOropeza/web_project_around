// Clase FormValidator para validación modular de formularios
class FormValidator {
  #config;
  #formElement;
  #inputList;
  #submitButton;

  constructor(config, formElement) {
    this.#config = config;
    this.#formElement = formElement;
    this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#config.inputSelector));
    this.#submitButton = this.#formElement.querySelector(this.#config.submitButtonSelector);
  }

  // Método público para activar la validación
  enableValidation() {
    this.#formElement.setAttribute('novalidate', true);
    this.#setEventListeners();
    this.#toggleButtonState();
  }

  // Añade listeners a todos los inputs
  #setEventListeners() {
    this.#inputList.forEach(input => {
      input.addEventListener('input', () => {
        this.#checkInputValidity(input);
        this.#toggleButtonState();
      });
    });
  }

  // Comprueba la validez de un input y muestra/oculta el error
  #checkInputValidity(input) {
    if (!input.validity.valid) {
      this.#showInputError(input);
    } else {
      this.#hideInputError(input);
    }
  }

  // Muestra el mensaje de error
  #showInputError(input) {
    const errorElement = input.nextElementSibling;
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
    input.classList.add(this.#config.inputErrorClass);
    errorElement.classList.add(this.#config.errorClass);
  }

  // Oculta el mensaje de error
  #hideInputError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = "";
    input.classList.remove(this.#config.inputErrorClass);
    errorElement.classList.remove(this.#config.errorClass);
  }

  // Cambia el estado del botón submit
  #toggleButtonState() {
    const hasInvalid = this.#inputList.some(input => !input.validity.valid);
    this.#submitButton.disabled = hasInvalid;
    this.#submitButton.classList.toggle(this.#config.inactiveButtonClass, hasInvalid);
  }
  // Método público para desactivar el botón de submit
  disableSubmit() {
    this.#submitButton.disabled = true;
    this.#submitButton.classList.add(this.#config.inactiveButtonClass);
  }
}

export default FormValidator;
