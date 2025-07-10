
// Clase Section para renderizar listas de elementos en un contenedor
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Renderiza todos los elementos usando la función renderer
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  // Agrega un elemento del DOM al contenedor
  addItem(element) {
    this._container.prepend(element);
  }
}
