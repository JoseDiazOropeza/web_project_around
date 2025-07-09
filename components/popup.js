// Clase Popup para abrir y cerrar ventanas emergentes
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Método público para abrir el popup
  open() {
    this._popup.classList.remove('popup_hidden');
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Método público para cerrar el popup
  close() {
    this._popup.classList.add('popup_hidden');
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Método privado para cerrar el popup con la tecla Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Método público para establecer los event listeners
  setEventListeners() {
    // Cerrar al hacer click en el icono de cerrar o en el overlay
    this._popup.addEventListener('click', (evt) => {
      if (
        evt.target.classList.contains('popup_opened') ||
        evt.target.closest('.popup__close')
      ) {
        this.close();
      }
    });
  }
}
