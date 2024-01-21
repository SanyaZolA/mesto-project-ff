import { openPopup } from "./modal";
import { DelCard, addLike, removeLike } from "./api.js"
// //----------------------------------НАХОЖДЕНИЕ МЕСТА РАСПОЛОЖЕНИЕ ЛИСТА В HTML И ЭЛЕМЕНТ КАРТОЧКИ-------------------------------
export const cardTemplate = document.querySelector('#card-template').content; // переменная получает данные из блока HTML template
export const placesList = document.querySelector('.places__list');            // вешаем элемент списка на переменную.
export const popupZoom = document.querySelector('.popup_type_image');        // присваивание элементов для открытия картинки.  
const profileID = 'a957d1ac9ff1d691d674dad2';

// //----------------------------------НАХОЖДЕНИЕ КАРТИНОК/ТЕКСТА ДЛЯ ЗУМА----------------------------------------------------------------
export const imageZoom = popupZoom.querySelector('.popup__image');          // для зума ищем элемент картинки
export const signatureZoom = popupZoom.querySelector('.popup__caption');    // для зума ищем элемент подписи


export function createNewPost(item, name, link, likes, _id) {
  const onePost = cardTemplate.cloneNode(true);
  const postImage = onePost.querySelector(".card__image");
  const likeСounter = onePost.querySelector(".card__like-counter");

  postImage.src = link;
  postImage.alt = name;

  likeСounter.textContent = likes.length;
  onePost.querySelector(".card__title").textContent = name;

  const buttonDelete = onePost.querySelector(".card__delete-button");
  const likeButton = onePost.querySelector(".card__like-button");

  likeButton.addEventListener("click", (evt) => {
    likeCard(evt, _id, likeСounter)});

  if (isOwnerCard(item.owner._id, buttonDelete, profileID)) {
    buttonDelete.addEventListener("click", (evt) => {
      deleteCard(evt, _id);
    })}

  likeCheck(item.likes, likeButton);

  postImage.addEventListener("click", openZoomPopup);
  return onePost;
}

function isOwnerCard(cardOwnerId, button, _id) {
    if (cardOwnerId !== _id) {
      button.classList.add("card__delete-button-hide");
    }
    return true;
  };

function deleteCard(evt, cardID) {
  DelCard(cardID).then(() => evt.target.closest(".card").remove());
}

export function openZoomPopup(evt) {
  // функция для открытия зума
  imageZoom.src = evt.target.src; // берет ссылку из определенного поста (кликнутого);
  imageZoom.alt = evt.target.alt; // берет ссылку из определенного поста (кликнутого);
  signatureZoom.textContent = evt.target.alt; // берет текст для зума из определенного поста (кликнутого);
  openPopup(popupZoom); // и собственно открываем.
}

export function likeCard(evt, id, likecounter) {
  if (
    evt.target.classList.contains("card__like-button") &&
    !evt.target.classList.contains("card__like-button_is-active")
  ) {
    addLike(id)
      .then()
      .then((res) => {
        likecounter.textContent = res.likes.length;
        evt.target.classList.add("card__like-button_is-active");
      });
  } else {
    removeLike(id).then((res) => {
      likecounter.textContent = res.likes.length;
      evt.target.classList.remove("card__like-button_is-active");
    });
  }
}

// лайки остаются после обновления страницы
function likeCheck(item, likeButton) {
  item.forEach(function (element) {
    if (element._id === profileID) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
}