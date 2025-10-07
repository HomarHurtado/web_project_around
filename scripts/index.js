// =============================================================================
//                                 IMPORTS
// =============================================================================
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

// =============================================================================
//                                DATOS INICIALES
// =============================================================================

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Objeto de configuración para la validación
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// =============================================================================
//                          SELECCIÓN DE ELEMENTOS DEL DOM
// =============================================================================

// --- Perfil ---
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__info_title");
const profileSubtitle = document.querySelector(".profile__info_subtitle");

// --- Modal Editar Perfil ---
const editProfilePopupElement = document.querySelector("#edit-profile-popup");
const editProfileCloseButton = editProfilePopupElement.querySelector(
  ".popup__close-button"
);
const editProfileForm = editProfilePopupElement.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector("#name-input");
const aboutInput = editProfileForm.querySelector("#about-input");

// --- Modal Agregar Tarjeta ---
const addCardPopupElement = document.querySelector("#add-card-popup");
const addCardCloseButton = addCardPopupElement.querySelector(
  ".popup__close-button"
);
const addCardForm = addCardPopupElement.querySelector(".popup__form");
const titleInput = addCardForm.querySelector("#title-input");
const imageUrlInput = addCardForm.querySelector("#img_url");

// --- Modal Visualizar Imagen ---
const imagePopupElement = document.querySelector("#image-popup");
const imagePopupCloseButton = imagePopupElement.querySelector(
  ".popup__close-button"
);
const popupImage = imagePopupElement.querySelector(".popup__image");
const popupCaption = imagePopupElement.querySelector(".popup__image-caption");

// --- Galería ---
const cardsContainer = document.querySelector(".cards-gallery");

// =============================================================================
//                             VALIDACIÓN DE FORMULARIOS
// =============================================================================

// Crea una instancia de FormValidator para cada formulario
const editFormValidator = new FormValidator(validationConfig, editProfileForm);
const addFormValidator = new FormValidator(validationConfig, addCardForm);

// Activa la validación
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// =============================================================================
//                             MANEJO DE TARJETAS
// =============================================================================

// Función para crear una tarjeta y añadirla al DOM
function createNewCard(cardData) {
  const card = new Card(cardData, "#card-template", (name, link) => {
    popupImage.src = link;
    popupImage.alt = `Imagen ampliada de ${name}`;
    popupCaption.textContent = name;
    openPopup(imagePopupElement);
  });

  const cardElement = card.generateCard();
  return cardElement;
}

// Renderiza las tarjetas iniciales
initialCards.forEach((item) => {
  const cardElement = createNewCard(item);
  cardsContainer.append(cardElement);
});

// =============================================================================
//                         MANEJADORES DE EVENTOS (LISTENERS)
// =============================================================================

// --- Evento para abrir el modal de Editar Perfil ---
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent.trim();
  aboutInput.value = profileSubtitle.textContent.trim();
  editFormValidator.resetValidation();
  openPopup(editProfilePopupElement);
});

// --- Evento para abrir el modal de Agregar Tarjeta ---
profileAddButton.addEventListener("click", () => {
  addCardForm.reset();
  addFormValidator.resetValidation();
  openPopup(addCardPopupElement);
});

// --- Eventos para cerrar los modales con sus botones 'X' ---
editProfileCloseButton.addEventListener("click", () =>
  closePopup(editProfilePopupElement)
);
addCardCloseButton.addEventListener("click", () =>
  closePopup(addCardPopupElement)
);
imagePopupCloseButton.addEventListener("click", () =>
  closePopup(imagePopupElement)
);

// --- Evento para manejar el envío del formulario de "Editar Perfil" ---
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  closePopup(editProfilePopupElement);
});

// --- Evento para manejar el envío del formulario de "Agregar Tarjeta" ---
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: titleInput.value,
    link: imageUrlInput.value,
  };
  const cardElement = createNewCard(newCardData);
  cardsContainer.prepend(cardElement);
  closePopup(addCardPopupElement);
});

// --- Lógica para cerrar cualquier modal al hacer clic en el fondo oscuro ---
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
  // Cierre con la tecla Escape
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
});
