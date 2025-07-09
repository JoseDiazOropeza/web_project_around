import Popup from './popup.js';

// Clase hija de Popup para mostrar imágenes
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // Selecciona la imagen y el caption dentro del popup
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  // Abre el popup y muestra la imagen y el caption
  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
