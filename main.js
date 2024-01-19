(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o),document.addEventListener("click",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o),document.removeEventListener("click",n)}function o(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function n(e){e.target.classList.contains("popup_is-opened")&&t(document.querySelector(".popup_is-opened"))}var r=document.querySelector("#card-template").content,u=document.querySelector(".places__list"),c=document.querySelector(".popup_type_image"),i=c.querySelector(".popup__image"),a=c.querySelector(".popup__caption");function p(e,t,o,n){var u=r.cloneNode(!0),c=u.querySelector(".card__image"),i=u.querySelector(".card__like-counter");return c.src=t,c.alt=e,i.textContent=o.length,u.querySelector(".card__title").textContent=e,u.querySelector(".card__like-button").addEventListener("click",(function(e){e.target.classList.toggle("card__like-button_is-active")})),u.querySelector(".card__delete-button").addEventListener("click",(function(e){e.target.closest(".places__item").remove()})),c.addEventListener("click",l),u}function l(t){i.src=t.target.src,i.alt=t.target.alt,a.textContent=t.target.alt,e(c)}var s=function(e,t,o){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(o.inputErrorClass),n.classList.remove(o.errorClass),n.textContent=""},d=function(e,t,o){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(o.inactiveButtonClass),t.disabled=!1):(t.disabled=!0,t.classList.add(o.inactiveButtonClass))},f=function(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);o.forEach((function(o){s(e,o,t)})),d(o,n,t)},_=document.querySelector(".content"),m=document.querySelector(".popup_type_edit"),v=document.querySelector(".popup_type_new-card"),y=_.querySelector(".profile__edit-button"),S=_.querySelector(".profile__add-button"),b=document.querySelectorAll(".popup__close-button"),h=m.querySelector(".popup__form"),q=v.querySelector(".popup__form"),C=m.querySelector(".popup__input_type_profile-name"),E=m.querySelector(".popup__input_type_profile-about"),L=v.querySelector(".popup__input_type_card-name"),k=v.querySelector(".popup__input_type_url"),g=_.querySelector(".profile__title"),x=_.querySelector(".profile__description");y.addEventListener("click",(function(){C.value=g.textContent,E.value=x.textContent,e(m),f(m,A)})),S.addEventListener("click",(function(){e(v),f(v,A)})),function(e,t){fetch("https://mesto.nomoreparties.co/v1/wff-cohort-4/users/me",{headers:{authorization:"b3b0551e-0f8f-4027-b8be-a71a8ad7328d"}}).then((function(e){return e.json()})).then((function(o){e.textContent=o.name,t.textContent=o.about}))}(g,x);var A={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};fetch("https://mesto.nomoreparties.co/v1/wff-cohort-4/cards",{method:"GET",headers:{authorization:"b3b0551e-0f8f-4027-b8be-a71a8ad7328d","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){e.forEach((function(e){var t=p(e.name,e.link,e.likes,e._id);u.append(t)}))})),b.forEach((function(e){var o=e.closest(".popup");e.addEventListener("click",(function(){return t(o)}))})),q.addEventListener("submit",(function(e){e.preventDefault(),function(e,t){fetch("https://mesto.nomoreparties.co/v1/wff-cohort-4/cards",{method:"POST",headers:{authorization:"b3b0551e-0f8f-4027-b8be-a71a8ad7328d","Content-Type":"application/json"},body:JSON.stringify({name:e,link:t})})}(L.value,k.value);var o=p(L.value,k.value,_id);u.prepend(o),L.value="",k.value="",t(v)})),h.addEventListener("submit",(function(e){e.preventDefault(),function(e,t){fetch("https://mesto.nomoreparties.co/v1/wff-cohort-4/users/me",{method:"PATCH",headers:{authorization:"b3b0551e-0f8f-4027-b8be-a71a8ad7328d","Content-Type":"application/json"},body:JSON.stringify({name:e,about:t})}).then((function(e){return e.json()}))}(C.value,E.value),g.textContent=C.value,x.textContent=E.value,t(m)})),function(e){var t=Array.from(document.querySelectorAll(e.formSelector));t.forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()}))})),t.forEach((function(t){!function(e,t){var o=e.querySelector(t.submitButtonSelector),n=Array.from(e.querySelectorAll(t.inputSelector));d(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,o):function(e,t,o,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),r.classList.add(n.errorClass),r.textContent=o}(e,t,t.validationMessage,o)}(e,r,t),d(n,o,t)}))}))}(t,e)}))}(A)})();