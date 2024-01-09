export function openPopup(popup) {                                                        // функция для открытия.
  popup.classList.add('popup_is-opened')                                                  // добавляем класс
  document.addEventListener('keydown', closePopupEsc);                                    // включаем слушатель для нажатия клавиши
  document.addEventListener('click', closePopupOverlay);
};       

export function closePopup(popup) {                                                       // функция закрытия
  popup.classList.remove('popup_is-opened')                                               // убираем класс
  document.removeEventListener('keydown', closePopupEsc);                                 // включаем слушатель для нажатия клавиши
  document.removeEventListener('click', closePopupOverlay);
};                     

export function closePopupEsc(evt) {                                                      // функция закрытия по Esc
  if (evt.key === 'Escape') {                                                             // "если нажатие на Esc"
    const popup = document.querySelector('.popup_is-opened');                             // поиск класса
    closePopup(popup);                                                                    // закрываем попап
  }
}

export function closePopupOverlay(evt) {                                                  // функция закрытия по оверлей      
  if (evt.target.classList.contains('popup_is-opened')) {                                 // если на нажитии есть класс
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);      
  }
};