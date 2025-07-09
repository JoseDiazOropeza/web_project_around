// Clase Card para crear tarjetas dinámicamente
class Card {
  #text;
  #imageUrl;
  #templateSelector;
  #element;

  constructor({ text, imageUrl }, templateSelector) {
    this.#text = text;
    this.#imageUrl = imageUrl;
    this.#templateSelector = templateSelector;
    this.#element = this.#getTemplate();
    // Bind para mantener el contexto correcto en el event listener
    this._boundHandleClickOutsidePopup = this.#handleClickOutsidePopup.bind(this);
    this.#setCardContent();
    this.#setEventListeners();
  }

  // Obtiene el template y clona el nodo
  #getTemplate() {
    const template = document.querySelector(this.#templateSelector);
    if (!template) {
      throw new Error(`No se encontró la plantilla: ${this.#templateSelector}`);
    }
    return template.content.firstElementChild.cloneNode(true);
  }

  // Rellena la tarjeta con los datos
  #setCardContent() {
    // Adaptar a la estructura real de la plantilla
    const img = this.#element.querySelector('.cards__image');
    const title = this.#element.querySelector('.cards__title');
    const windowImg = this.#element.querySelector('.cards__window-img');
    const windowCaption = this.#element.querySelector('.cards__window-caption');
    if (img) {
      img.src = this.#imageUrl;
      img.alt = `Imagen de ${this.#text}`;
    }
    if (title) title.textContent = this.#text;
    if (windowImg) {
      windowImg.src = this.#imageUrl;
      windowImg.alt = `Imagen de ${this.#text}`;
    }
    if (windowCaption) windowCaption.textContent = this.#text;
  }

  // Añade los listeners de eventos
  #setEventListeners() {
    // Like
    const btnLike = this.#element.querySelector('.cards__like-btn');
    if (btnLike) {
      btnLike.addEventListener('click', this.#handleLikeClick.bind(this));
    }
    // Trash (borrar)
    const btnTrash = this.#element.querySelector('.cards__trash-btn');
    if (btnTrash) {
      btnTrash.addEventListener('click', this.#handleTrashClick.bind(this));
    }
    // Popup de imagen
    const img = this.#element.querySelector('.cards__image');
    const cardWindow = this.#element.querySelector('.cards__window');
    if (img && cardWindow) {
      img.addEventListener('click', () => this.#handleOpenPopup(cardWindow));
    }
    // Cerrar popup de imagen
    const btnClosePopup = this.#element.querySelector('.cards__exit-btn');
    if (btnClosePopup && cardWindow) {
      btnClosePopup.addEventListener('click', () => this.#handleClosePopup(cardWindow));
    }
  }

  // Like
  #handleLikeClick(evt) {
    evt.currentTarget.classList.toggle('cards__like-btn--active');
  }

  // Borrar tarjeta
  #handleTrashClick(evt) {
    this.#element.remove();
  }

  // Abrir popup de imagen
  #handleOpenPopup(cardWindow) {
    cardWindow.classList.remove('popup_hidden');
    cardWindow.addEventListener('click', this._boundHandleClickOutsidePopup);
  }

  // Cerrar popup de imagen
  #handleClosePopup(cardWindow) {
    cardWindow.classList.add('popup_hidden');
    cardWindow.removeEventListener('click', this._boundHandleClickOutsidePopup);
  }

  // Cerrar popup si se hace click fuera del contenido
  #handleClickOutsidePopup(evt) {
    if (evt.target === evt.currentTarget) {
      evt.currentTarget.classList.add('popup_hidden');
      evt.currentTarget.removeEventListener('click', this.#handleClickOutsidePopup);
    }
  }

  // Devuelve el elemento card listo para usar
  getCardElement() {
    return this.#element;
  }
}

export default Card;
