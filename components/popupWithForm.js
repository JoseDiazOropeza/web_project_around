import Popup from './popup.js';

// Clase hija de Popup para formularios
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('form');
    this._inputList = Array.from(this._form.querySelectorAll('input'));
  }

  // Método privado para obtener los valores de los inputs
  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  // Sobrescribe setEventListeners para manejar submit y cierre
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Sobrescribe close para reiniciar el formulario
  close() {
    super.close();
    this._form.reset();
  }
}
