"use strict";

//Variables
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
const popupProfile = document.querySelector(".popup-profile");
const formProfileElement = document.querySelector(".popup-profile__form");
const btnProfileOpenPopup = document.querySelector(".profile__edit-btn");
const btnProfileClosePopup = document.querySelector(".popup-profile__exit-btn");

const popupCard = document.querySelector(".popup-card");
const formCardElement = document.querySelector(".popup-card__form");
const btnCardOpenPopup = document.querySelector(".profile__add-btn");
const btnCardClosePopup = document.querySelector(".popup-card__exit-btn");

const cardContainer = document.querySelector(".cards__list");

//Add Event Listeners
btnProfileOpenPopup.addEventListener("click", () => openPopup(popupProfile));
btnProfileClosePopup.addEventListener("click", () => closePopup(popupProfile));
btnCardOpenPopup.addEventListener("click", () => openPopup(popupCard));
btnCardClosePopup.addEventListener("click", () => closePopup(popupCard));

formProfileElement.addEventListener("submit", handleProfileFormSubmit);
formCardElement.addEventListener("submit", handleCardFormSubmit);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!popupProfile.classList.contains("popup_hidden")) {
      closePopup(popupProfile);
    }
    if (!popupCard.classList.contains("popup_hidden")) {
      closePopup(popupCard);
    }
  }
});

//Funciones
function openPopup(popupTarget) {
  popupTarget.classList.remove("popup_hidden");
}

function closePopup(popupTarget) {
  popupTarget.classList.add("popup_hidden");
}

function like(target) {
  target.classList.toggle("cards__like-btn--active");
}

function trash(target) {
  target.closest(".cards__card").remove();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector(".popup-profile__form-input-name");
  const jobInput = document.querySelector(".popup-profile__form-input-about");

  const nameDOM = document.querySelector(".profile__name");
  const jobDOM = document.querySelector(".profile__role");

  nameDOM.textContent = nameInput.value;
  jobDOM.textContent = jobInput.value;

  closePopup(popupProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const placeInput = document.querySelector(".popup-card__form-input-place");
  const urlInput = document.querySelector(".popup-card__form-input-url");

  addCard(placeInput.value, urlInput.value);

  placeInput.value = "";
  urlInput.value = "";

  closePopup(popupCard);
}

function addCard(cardPlace, cardImage) {
  const cardTemplate = document.querySelector("#cards__template").content;
  const cardElement = cardTemplate
    .querySelector(".cards__card")
    .cloneNode(true);

  const btnLike = cardElement.querySelector(".cards__like-btn");
  btnLike.addEventListener("click", (e) => {
    like(e.currentTarget);
  });

  const btnTrash = cardElement.querySelector(".cards__trash-btn");
  btnTrash.addEventListener("click", (e) => {
    trash(e.currentTarget);
  });

  const btnOpen = cardElement.querySelector(".cards__image");
  btnOpen.addEventListener("click", (e) => {
    const cardWindow = cardElement.querySelector(".cards__window");
    openPopup(cardWindow);
  });

  const btnClose = cardElement.querySelector(".cards__exit-btn");
  btnClose.addEventListener("click", (e) => {
    closePopup(e.currentTarget.closest(".cards__window"));
  });

  const cardWindow = cardElement.querySelector(".cards__window");
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopup(cardWindow);
    }
  });

  //Experimento cerrar al dar click fuera de la imagen:
  // cardWindow.addEventListener("click", (e) => {
  //   if (e.target === cardWindow) {
  //     closePopup(cardWindow);
  //   }
  // });

  cardElement.querySelector(".cards__title").textContent = cardPlace;
  cardElement.querySelector(".cards__window-caption").textContent = cardPlace;

  cardElement.querySelector(".cards__image").setAttribute("src", cardImage);
  cardElement
    .querySelector(".cards__image")
    .setAttribute("alt", `Imagen de ${cardPlace}`);

  cardElement
    .querySelector(".cards__window-img")
    .setAttribute("src", cardImage);

  cardElement
    .querySelector(".cards__window-img")
    .setAttribute("alt", `Imagen de ${cardPlace}`);

  cardContainer.prepend(cardElement);
}

//Ejecución Inicial
initialCards.forEach((card) => {
  addCard(card.name, card.link);
});
