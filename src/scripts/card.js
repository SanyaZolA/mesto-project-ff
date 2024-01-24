import { delCard, addLike, removeLike } from "./api.js";

// //----------------------------------НАХОЖДЕНИЕ МЕСТА РАСПОЛОЖЕНИЕ ЛИСТА В HTML И ЭЛЕМЕНТ КАРТОЧКИ-------------------------------
export const cardTemplate = document.querySelector("#card-template").content; // переменная получает данные из блока HTML template
export const placesList = document.querySelector(".places__list"); // вешаем элемент списка на переменную.

export function createNewPost(
  item,
  name,
  link,
  likes,
  _id,
  userID,
  openZoomPopup
) {
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
    likeCard(evt, _id, likeСounter);
  });

  if (isOwnerCard(item.owner._id, buttonDelete, userID)) {
    buttonDelete.addEventListener("click", (evt) => {
      deleteCard(evt, _id);
    });
  }

  likesCheck(item.likes, likeButton, userID);

  postImage.addEventListener("click", openZoomPopup);
  return onePost;
}

function isOwnerCard(cardOwnerId, button, _id) {
  if (cardOwnerId !== _id) {
    button.classList.add("card__delete-button-hide");
  }
  return true;
}

function deleteCard(evt, cardID) {
  delCard(cardID)
    .then(() => evt.target.closest(".card").remove())
    .catch((err) => {
      console.log(err);
    });
}

function likeCard(evt, id, likecounter) {
  if (
    evt.target.classList.contains("card__like-button") &&
    !evt.target.classList.contains("card__like-button_is-active")
  ) {
    addLike(id)
      .then((res) => {
        likecounter.textContent = res.likes.length;
        evt.target.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    removeLike(id)
      .then((res) => {
        likecounter.textContent = res.likes.length;
        evt.target.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// лайки остаются после обновления страницы
function likesCheck(item, likeButton, userID) {
  item.forEach(function (element) {
    if (element._id === userID) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
}
