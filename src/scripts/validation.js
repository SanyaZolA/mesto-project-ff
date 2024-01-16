import {formAddFoto} from './index.js';


export const isValid = (formEditProfile, inputProfile) => {
  if (inputProfile.validity.patternMismatch) {
    inputProfile.setCustomValidity(inputProfile.dataset.errorMessage);
    } else {
    inputProfile.setCustomValidity("");
  }

  if (!inputProfile.validity.valid) {
    showInputError(formEditProfile, inputProfile, inputProfile.validationMessage);
  } else {
    hideInputError(formEditProfile, inputProfile);
  }
}; 

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputProfile) => {
    return !inputProfile.validity.valid;
  })
}; 

export const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled');
  }
}; 


export const showInputError = (formEditProfile, inputProfile, errorMessage) => {
  const errorElement = formEditProfile.querySelector(`.${inputProfile.id}-error`);
  inputProfile.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
};

export const hideInputError = (formEditProfile, inputProfile) => {
  const errorElement = formEditProfile.querySelector(`.${inputProfile.id}-error`);
  inputProfile.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

export const setEventListeners = (formEditProfile) => {
  const buttonElement = formEditProfile.querySelector('.popup__button');
  const buttonElementFoto = formAddFoto.querySelector('.popup__button');
  const inputList = Array.from(formEditProfile.querySelectorAll('.popup__input'));
  toggleButtonState(inputList, buttonElementFoto);
  inputList.forEach((inputProfile) => {
    inputProfile.addEventListener('input', () => {
      isValid(formEditProfile, inputProfile);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formEditProfile) => {
    formEditProfile.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  });

  formList.forEach(formEditProfile => {
    setEventListeners(formEditProfile);
  })
};

