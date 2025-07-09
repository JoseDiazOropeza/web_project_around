// Clase Card para crear tarjetas dinámicamente
class Card {
  #text;
  #imageUrl;
  #templateSelector;
  #element;
  _handleCardClick;

  constructor({ text, imageUrl }, templateSelector, handleCardClick) {
    this.#text = text;
    this.#imageUrl = imageUrl;
    this.#templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this.#element = this.#getTemplate();
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
    // Popup de imagen externo
    const img = this.#element.querySelector('.cards__image');
    if (img) {
      img.addEventListener('click', () => {
        if (this._handleCardClick) {
          this._handleCardClick({ name: this.#text, link: this.#imageUrl });
        }
      });
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


  // Devuelve el elemento card listo para usar
  getCardElement() {
    return this.#element;
  }
}

export default Card;
