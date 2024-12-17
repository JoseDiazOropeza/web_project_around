"use strict";

const popup = document.querySelector(".popup");

const formElement = document.querySelector(".popup__form");

const btnOpenPopup = document.querySelector(".profile__edit-btn");
const btnClosePopup = document.querySelector(".popup__exit-btn");

const openPopup = function () {
  popup.classList.remove("popup_hidden");
};

const closePopup = function () {
  popup.classList.add("popup_hidden");
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector(".popup__form-input-name");
  let jobInput = document.querySelector(".popup__form-input-about");

  let nameDOM = document.querySelector(".profile__name");
  let jobDOM = document.querySelector(".profile__role");

  nameDOM.textContent = nameInput.value;
  jobDOM.textContent = jobInput.value;

  closePopup();
}

btnOpenPopup.addEventListener("click", openPopup);
btnClosePopup.addEventListener("click", closePopup);

formElement.addEventListener("submit", handleProfileFormSubmit);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !popup.classList.contains("popup_hidden")) {
    closePopup();
  }
});
