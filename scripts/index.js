// =============================================================================
// DATOS INICIALES
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

// =============================================================================
// SELECCIÓN DE ELEMENTOS DEL DOM
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

// --- Galería y Plantilla de Tarjetas ---
const cardsContainer = document.querySelector(".cards-gallery");
const cardTemplate = document.querySelector("#card-template").content;

// =============================================================================
// FUNCIONES
// =============================================================================

// --- Abre un modal o pop-up ---
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

// --- Cierra un modal o pop-up ---
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

// --- Cierra el modal activo si se presiona la tecla 'Escape' ---
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// --- Crea un elemento de tarjeta a partir de datos y una plantilla ---
function createCard(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = `Fotografía de ${data.name}`;
  cardTitle.textContent = data.name;

  // Asignamos los eventos a los botones y a la imagen de la tarjeta
  likeButton.addEventListener("click", handleLikeButtonClick);
  deleteButton.addEventListener("click", () => cardElement.remove());
  cardImage.addEventListener("click", () =>
    openImagePopup(data.name, data.link)
  );

  return cardElement;
}

// --- Abre el modal de visualización de imagen con los datos correspondientes ---
function openImagePopup(name, link) {
  popupImage.src = link;
  popupImage.alt = `Imagen ampliada de ${name}`;
  popupCaption.textContent = name;
  openPopup(imagePopupElement);
}

// --- Maneja el clic en el botón "Me gusta", alternando su estado activo ---
function handleLikeButtonClick(evt) {
  evt.currentTarget.classList.toggle("card__like-button--active");
}

// --- Maneja el envío del formulario de "Editar Perfil" ---
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  closePopup(editProfilePopupElement);
}

// --- Maneja el envío del formulario de "Agregar Tarjeta" ---
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: titleInput.value,
    link: imageUrlInput.value,
  };
  const cardElement = createCard(newCardData);
  cardsContainer.prepend(cardElement);
  closePopup(addCardPopupElement);
  addCardForm.reset();
}

// =============================================================================
// EJECUCIÓN INICIAL Y CONEXIÓN DE EVENTOS
// =============================================================================

// --- Carga inicial de tarjetas ---
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardsContainer.append(cardElement);
});

// --- Conexión de Eventos (Event Listeners) ---

// Evento para abrir el modal de Editar Perfil
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent.trim();
  aboutInput.value = profileSubtitle.textContent.trim();
  openPopup(editProfilePopupElement);
});

// Evento para abrir el modal de Agregar Tarjeta
profileAddButton.addEventListener("click", () => {
  addCardForm.reset(); // Limpia el formulario antes de abrirlo
  openPopup(addCardPopupElement);
});

// Eventos para cerrar los modales con sus respectivos botones 'X'
editProfileCloseButton.addEventListener("click", () =>
  closePopup(editProfilePopupElement)
);
addCardCloseButton.addEventListener("click", () =>
  closePopup(addCardPopupElement)
);
imagePopupCloseButton.addEventListener("click", () =>
  closePopup(imagePopupElement)
);

// Eventos para manejar el envío de cada formulario
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Lógica para cerrar cualquier modal al hacer clic en el fondo oscuro
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});
