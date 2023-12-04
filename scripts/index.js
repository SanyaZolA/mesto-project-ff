const content = document.querySelector('.content');

// //----------------------------------НАХОЖДЕНИЕ МЕСТА РАСПОЛОЖЕНИЕ ЛИСТА В HTML И ЭЛЕМЕНТ КАРТОЧКИ-------------------------------
const placesList = document.querySelector('.places__list'); // вешаем элемент списка на переменную.
const cardTemplate = document.querySelector('#card-template').content; // переменная получает данные из блока HTML template

// //----------------------------------ФУНКЦИИ СОЗДАНИЯ СПИСКА КАРТИНОК-------------------------------------------------------------------
function createNewPost(postName, imageLink) {
  const onePost = cardTemplate.cloneNode(true);                     // копируем в переменную данные из template в HTML.
  const postImage = onePost.querySelector('.card__image');           // ищем данные класса в template и вешаем его на переменную.
  postImage.src = imageLink;                                           // Элемент фото template получает данные из параментов функции.
  postImage.alt = postName;                                             // Элемент фото template получает данные из параментов функции.
  onePost.querySelector('.card__title').textContent = postName;                         // ищем класс и добавляем туда новый параметр                   
  onePost.querySelector('.card__delete-button').addEventListener('click', (evt) => {evt.target.closest('.places__item').remove()});   // ищем класс и вышаем кнопку удаления
  return onePost;
};

function initializeList(list) {                                     // создаётся список картинок для отображения на странице.
  list.forEach(function (item) {                                    // обход всего списка и для каждого элемента выполняется функция.
    const onePost = createNewPost(item.name, item.link);            // получает название и ссылку. Формируется пост. 6 раз
    placesList.append(onePost);                                    // каждая картинки ставится в начало листа template.
  });
};
initializeList(initialCards);    // сама инициализация предустановленных картинок. Начинается формироваться список при загрузке страницы      