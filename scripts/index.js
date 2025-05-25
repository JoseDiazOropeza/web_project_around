"use strict";

//==========================================================================
// SECCIÓN DE VARIABLES GLOBALES Y TARJETAS INICIALES
// ==========================================================================
const initialCards = [
  {
    name: "Grand Canyon National Park, AZ, USA",
    link: "https://images.unsplash.com/photo-1495242024181-f22bd6b31f3f",
  },
  {
    name: "Joshua Tree National Park, CA, USA",
    link: "https://images.unsplash.com/photo-1601953758964-2dac9a22241d",
  },
  {
    name: "Lake Union, WA, USA",
    link: "https://images.unsplash.com/photo-1642827387986-b8594e28b5a9",
  },
  {
    name: "Sequoia National Park, CA, USA",
    link: "https://images.unsplash.com/photo-1562868996-8c589d115978",
  },
  {
    name: "Yellowstone National Park, WY, USA",
    link: "https://images.unsplash.com/photo-1550347778-473e0058577c",
  },
  {
    name: "Yosemite Valley, CA, USA",
    link: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
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
  errorClass: "popup__error_visible"
};

// --- Event Listeners para el envío de Formularios ---
formProfileElement.addEventListener("submit", handleProfileFormSubmit);
formCardElement.addEventListener("submit", handleCardFormSubmit);

// --- Event Listener Global para la tecla "Escape" ---
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Selecciona cualquier popup abierto (perfil, tarjeta o imagen)
    const openedPopup = document.querySelector(
      ".popup:not(.popup_hidden), .popup-profile:not(.popup_hidden), .popup-card:not(.popup_hidden), .cards__window:not(.popup_hidden)"
    );
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
});

// --- Inicializa la validación modular para todos los formularios ---
const profileValidator = new FormValidator(validationConfig, formProfileElement);
profileValidator.enableValidation();
const cardValidator = new FormValidator(validationConfig, formCardElement);
cardValidator.enableValidation();


//==========================================================================
// SECCIÓN DE DEFINICIÓN DE FUNCIONES
// =========================================================================

// --- Modifica el estado de Like ---
function like(target) {
  target.classList.toggle("cards__like-btn--active");
}

// --- Elimina tarjeta ---
function trash(target) {
  target.closest(".cards__card").remove();
}

// --- Opera el boton submit de Editar perfil ---
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  if (formProfileElement.checkValidity()) {
    const nameDOM = document.querySelector(".profile__name");
    const jobDOM = document.querySelector(".profile__role");

    nameDOM.textContent = nameInput.value;
    jobDOM.textContent = jobInput.value;

    closePopup(popupProfile);
  }
}

// --- Opera el boton submit de Nuevo Lugar ---
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  if (formCardElement.checkValidity()) {
    addCard(placeInput.value, urlInput.value);
    formCardElement.reset();
    closePopup(popupCard);
  }
}

import Card from './card.js';
import FormValidator from './formValidator.js';
import { openPopup, closePopup, handleClickOutside, clearFormErrors } from './utils.js';

// --- Añade nueva tarjeta al DOM usando la clase Card ---
function addCard(cardPlace, cardImage) {
  const card = new Card({ text: cardPlace, imageUrl: cardImage }, '#cards__template');
  cardContainer.prepend(card.getCardElement());
}

//==========================================================================
// SECCIÓN DE INICIACIÓN DEL PROGRAMA
// ==========================================================================

// --- Ejecución Inicial ---
initialCards.forEach((card) => {
  addCard(card.name, card.link);
});

