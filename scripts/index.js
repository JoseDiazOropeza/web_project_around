"use strict";

//==========================================================================
// SECCIÓN DE VARIABLES GLOBALES Y TARJETAS INICIALES
// ==========================================================================

import Card from "./card.js";
import FormValidator from "./formValidator.js";
import Section from "../components/section.js";
import Popup from "../components/popup.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userInfo.js";
import {
  openPopup,
  closePopup,
  handleClickOutside,
  clearFormErrors,
} from "./utils.js";

const initialCards = [
  {
    name: "Grand Canyon National Park, AZ, USA",
    link: "./images/6.photo-tim-XC8upJgGYg0-unsplash.jpg",
  },
  {
    name: "Joshua Tree National Park, CA, USA",
    link: "./images/5.lindsay-doyle-s6fBJzk0AU0-unsplash.jpg",
  },
  {
    name: "Lake Union, WA, USA",
    link: "./images/4.finn-w8ckd_hpM4s-unsplash.jpg",
  },
  {
    name: "Sequoia National Park, CA, USA",
    link: "./images/3.javier-quesada-kKfxchkH3L4-unsplash.jpg",
  },
  {
    name: "Yellowstone National Park, WY, USA",
    link: "./images/2.laila-skalsky-TzBdOQ-ek7M-unsplash.jpg",
  },
  {
    name: "Yosemite Valley, CA, USA",
    link: "./images/1.johannes-andersson-UCd78vfC8vU-unsplash.jpg",
  },
];

// --- Selección de Elementos del DOM para el Popup de Perfil ---
const popupProfile = document.querySelector(".popup-profile");
const formProfileElement = document.querySelector(".popup-profile__form");
const btnProfileOpenPopup = document.querySelector(".profile__edit-btn");
const btnProfileClosePopup = document.querySelector(".popup-profile__exit-btn");
const nameInput = formProfileElement.querySelector(
  ".popup-profile__form-input-name"
);
const jobInput = formProfileElement.querySelector(
  ".popup-profile__form-input-about"
);

// --- Selección de Elementos del DOM para el Popup de Añadir Tarjeta ---
const popupCard = document.querySelector(".popup-card");
const formCardElement = document.querySelector(".popup-card__form");
const btnCardOpenPopup = document.querySelector(".profile__add-btn");
const btnCardClosePopup = document.querySelector(".popup-card__exit-btn");
const placeInput = formCardElement.querySelector(
  ".popup-card__form-input-place"
);
const urlInput = formCardElement.querySelector(".popup-card__form-input-url");

const cardContainer = document.querySelector(".cards__list");

//==========================================================================
// SECCIÓN DE ASIGNACIÓN DE EVENT LISTENERS
//==========================================================================

// --- Event Listeners para el Popup de Perfil ---
btnProfileOpenPopup.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile__name").textContent;
  jobInput.value = document.querySelector(".profile__role").textContent;
  openPopup(popupProfile);
});
btnProfileClosePopup.addEventListener("click", () => closePopup(popupProfile));

// --- Event Listeners para el Popup de Añadir Tarjeta ---
btnCardOpenPopup.addEventListener("click", () => {
  formCardElement.reset();
  openPopup(popupCard);
});
btnCardClosePopup.addEventListener("click", () => closePopup(popupCard));

// Configuración de validación reutilizable
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// --- Event Listeners para el envío de Formularios ---
// Se agregan con los métodos de las clases PopupWithForm

// --- Inicializa la validación modular para todos los formularios ---
const profileValidator = new FormValidator(
  validationConfig,
  formProfileElement
);
profileValidator.enableValidation();
const cardValidator = new FormValidator(validationConfig, formCardElement);
cardValidator.enableValidation();

// Instancia UserInfo para manejar datos de usuario
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__role'
});

// Instancia PopupWithForm para perfil
const popupProfileForm = new PopupWithForm('.popup-profile', (data) => {
  userInfo.setUserInfo({ name: data['form__name'], job: data['form__role'] });
  popupProfileForm.close();
});
popupProfileForm.setEventListeners();

// Instancia PopupWithForm para nueva tarjeta
const popupCardForm = new PopupWithForm('.popup-card', (data) => {
  addCard(data['form__place'], data['form__url']);
  popupCardForm.close();
  cardValidator.disableSubmit();
});
popupCardForm.setEventListeners();

// Instancia global para el popup de imagen
const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners();

// --- Añade nueva tarjeta al DOM usando la clase Card ---
function addCard(cardPlace, cardImage) {
  const card = new Card(
    { text: cardPlace, imageUrl: cardImage },
    "#cards__template",
    (data) => popupWithImage.open(data)
  );
  cardContainer.prepend(card.getCardElement());
}

// --- Renderizar las tarjetas iniciales usando Section ---
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => addCard(item.name, item.link)
}, '.cards__list');
cardSection.renderItems();

// --- Listeners para abrir popups ---
btnProfileOpenPopup.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  formProfileElement.elements['form__name'].value = user.name;
  formProfileElement.elements['form__role'].value = user.job;
  popupProfileForm.open();
});

btnCardOpenPopup.addEventListener('click', () => {
  formCardElement.reset();
  popupCardForm.open();
});


//==========================================================================
// SECCIÓN DE INICIACIÓN DEL PROGRAMA
// ==========================================================================


