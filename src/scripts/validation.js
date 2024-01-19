export const showInputError = (form, input, errorMessage, validationConfig) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
};

export const hideInputError = (form, input, validationConfig) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

export const isValid = (form, input, validationConfig) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
    } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, validationConfig);
  } else {
    hideInputError(form, input, validationConfig);
  }
}; 

export const setEventListeners = (form, validationConfig) => {
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  toggleButtonState(inputList, buttonElement, validationConfig);
  
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}; 

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  });
  
  formList.forEach(form => {
    setEventListeners(form, validationConfig);
  })
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}; 

export const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}; 


export const clearValidation = (form, validationConfig) => {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((input) => {
    hideInputError(form, input, validationConfig);
  })
    toggleButtonState(inputList, buttonElement, validationConfig);
}
