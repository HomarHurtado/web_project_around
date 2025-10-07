export class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("card__like-button--active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  generateCard() {
    this._element = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = `Fotografía de ${this._name}`;
    this._cardTitle.textContent = this._name;

    this._likeButton.addEventListener("click", () => this._handleLikeClick());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick()
    );
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });

    return this._element;
  }
}
