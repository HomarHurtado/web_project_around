// 1. Elementos del DOM para la sección de perfil
const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__info_title");
const profileSubtitle = document.querySelector(".profile__info_subtitle");

// 2. Elementos del DOM para la ventana modal (popup de edición de perfil)
const popupElement = document.querySelector("#edit-profile-popup");
const popupCloseButton = popupElement.querySelector(".popup__close-button");
const popupForm = popupElement.querySelector(".popup__form");

// 3. Campos del formulario dentro de la ventana modal
const nameInput = popupForm.querySelector("#name-input");
const aboutInput = popupForm.querySelector("#about-input");

// -----------------------------------------------------------
// Funciones
// -----------------------------------------------------------

// Función para abrir la ventana modal
function openPopup() {
  // Llenar los campos del formulario con los valores actuales del perfil
  nameInput.value = profileTitle.textContent.trim();
  aboutInput.value = profileSubtitle.textContent.trim();

  // Añadir la clase que muestra el popup
  popupElement.classList.add("popup_opened");
}

// Función para cerrar la ventana modal
function closePopup() {
  // Remover la clase que muestra el popup
  popupElement.classList.remove("popup_opened");
}

// Manipulador (handler) de entrega del formulario
function handleProfileFormSubmit(evt) {
  // Esta línea impide que el navegador entregue el formulario en su forma predeterminada (recargar la página).
  evt.preventDefault();

  // Obtener los nuevos valores de cada campo
  const newName = nameInput.value;
  const newAbout = aboutInput.value;

  // Insertar los nuevos valores en los elementos del perfil
  profileTitle.textContent = newName;
  profileSubtitle.textContent = newAbout;

  // Cerrar la ventana modal después de guardar los cambios
  closePopup();
}

// -----------------------------------------------------------
// Conectar manipuladores de eventos
// -----------------------------------------------------------

// 1. Conectar el botón de edición de perfil para abrir el popup
profileEditButton.addEventListener("click", openPopup);

// 2. Conectar el botón de cerrar del popup
popupCloseButton.addEventListener("click", closePopup);

// 3. Conectar el manipulador de entrega al formulario del popup
popupForm.addEventListener("submit", handleProfileFormSubmit);
