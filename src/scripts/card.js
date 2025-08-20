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

  if (isOwnerCard(item.owner._id, buttonDelete, userID.textContent)) {
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
    if (element._id === userID.textContent) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
}

function* generatePermutations(items) {
    function* doGeneratePermutations(index) {
        if (index === items.length) {
            // возвращаем копию массива после последней перестановки
            yield items.slice(0, items.length);
            return;
        }
        // переставляем элементы в массиве начиная с index
        for (let i = index; i < items.length; i++) {
            // обмениваем значения двух элементов массива
            // при деструктурировании слева мы указываем именно переменные,
            // куда нужно записать элементы справа
            [items[index], items[i]] = [items[i], items[index]];
            // и повторяем перестановки со следующего шага
            // или возвращаем результат, если дошли до конца
            yield* doGeneratePermutations(index + 1);
            // возвращаем элементы на место
            [items[index], items[i]] = [items[i], items[index]];
        }
    }
    yield* doGeneratePermutations(0);
}
const items = [1, 2, 3];
const permutations = generatePermutations(items);
for (let perm of permutations) {
    console.log("Перестановка:", perm);
}
