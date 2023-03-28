// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';

/* ==============================================================================================
=============================  Menu  ============================================================*/

window.onload = function () {
  document.addEventListener('click', documentActions);

  function documentActions(e) {
    const targetElement = e.target;
    if (targetElement.closest('.menu__link') || targetElement.closest('.menu__link span')) {
      const menuItem = targetElement.closest('.menu__item');
      if (menuItem.classList.contains('_hover')) {
        menuItem.classList.remove('_hover');
        document.documentElement.classList.remove('menu-open');
      } else {
        const openMenuItem = document.querySelector('.menu__item._hover');
        if (openMenuItem) {
          openMenuItem.classList.remove('_hover');
        }
        menuItem.classList.add('_hover');
        document.documentElement.classList.add('menu-open');
      }
    }
    if (
      !targetElement.closest('.menu__item') &&
      document.querySelectorAll('.menu__item._hover').length > 0
    ) {
      const openMenuItem = document.querySelector('.menu__item._hover');
      openMenuItem.classList.remove('_hover');
      document.documentElement.classList.remove('menu-open');
    }
  }
};
/* =========================== Menu ===================================================================
=======================================================================================================*/
/* ==============================================================================================
=============================  Form  ============================================================*/
window.onload = function () {
  const form = document.querySelector('[data-form]');
  const nameInput = document.querySelector('#input_name');
  const emailInput = document.querySelector('#input_email');
  const phoneInput = document.querySelector('#input_phone');
  const messageInput = document.querySelector('#input_question');
  const submitButton = document.querySelector('.form__button');



  const validateName = () => {
    const nameValue = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z]{2,}$/;
    if (nameValue === '' || !nameRegex.test(nameValue)) {
      nameInput.classList.add('_form-error');
      nameInput.previousElementSibling.textContent = nameInput.dataset.error;
    } else {
      nameInput.classList.remove('_form-error');
      nameInput.previousElementSibling.textContent = '';
    }
    validateForm();
  };

  const validateEmail = () => {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '' || !emailRegex.test(emailValue)) {
      emailInput.classList.add('_form-error');
      emailInput.previousElementSibling.textContent = emailInput.dataset.error;
    } else {
      emailInput.classList.remove('_form-error');
      emailInput.previousElementSibling.textContent = '';
    }
    validateForm();
  };

  const validatePhone = () => {
    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^(\+?\d+)?(\s|\()?\d{3}(\s|\))?(\s|\-)?\d{3}(\s|\-)?\d{2}(\s|\-)?\d{2}$/;
    if (phoneValue !== '' && !phoneRegex.test(phoneValue)) {
      phoneInput.classList.add('_form-error');
      phoneInput.previousElementSibling.textContent = phoneInput.dataset.error;
    } else {
      phoneInput.classList.remove('_form-error');
      phoneInput.previousElementSibling.textContent = '';
    }
    validateForm();
  };

  const validateMessage = () => {
    const messageValue = messageInput.value.trim();
    if (messageValue.length < 5 || messageValue.length > 200) {
      messageInput.classList.add('_form-error');
      messageInput.previousElementSibling.textContent = messageInput.dataset.error;
    } else {
      messageInput.previousElementSibling.textContent = '';
      messageInput.classList.remove('_form-error');
    }
    validateForm();
  };

  const validateForm = () => {
    const requiredInputs = form.querySelectorAll('[data-required]');
    let isAllValid = true;
    requiredInputs.forEach((input) => {
      if (input.value.trim() === '') {
        input.classList.add('_form-error');
        input.previousElementSibling.textContent = input.dataset.error;
        isAllValid = false;
      } else if (input.classList.contains('_form-error')) {
        isAllValid = false;
      }
    });
    if (isAllValid) {
      submitButton.classList.add('_active');
    } else {
      submitButton.classList.remove('_active');
    }
  };

  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  phoneInput.addEventListener('input', validatePhone);
  messageInput.addEventListener('input', validateMessage);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!submitButton.classList.contains('_active')) {
      return;
    }
    form.classList.add('_sending');
    const formData = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          form.classList.remove('_sending');
          form.classList.add('_success');
          form.reset();
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch(() => {
        form.classList.add('_error');
      });
  });
};
//====================================================================
// window.addEventListener('load', () => {
//   const form = document.querySelector('[data-form]');
//   const submitButton = form.querySelector('.form__button');

//   const validateInput = (input) => {
//     const value = input.value.trim();
//     const regex = input.dataset.regex ? new RegExp(input.dataset.regex) : null;
//     if (value === '' || (regex && !regex.test(value))) {
//       input.classList.add('_form-error');
//       input.previousElementSibling.textContent = input.dataset.error;
//     } else {
//       input.classList.remove('_form-error');
//       input.previousElementSibling.textContent = '';
//     }
//   };

//   const validateForm = () => {
//     const requiredInputs = form.querySelectorAll('[data-required]');
//     let isAllValid = true;
//     requiredInputs.forEach((input) => {
//       if (input.value.trim() === '') {
//         input.classList.add('_form-error');
//         input.previousElementSibling.textContent = input.dataset.error;
//         isAllValid = false;
//       } else if (input.classList.contains('_form-error')) {
//         isAllValid = false;
//       }
//     });
//     if (isAllValid) {
//       submitButton.classList.add('_active');
//     } else {
//       submitButton.classList.remove('_active');
//     }
//   };

//   form.addEventListener('input', (event) => {
//     if (event.target.matches('[data-required]')) {
//       validateInput(event.target);
//       validateForm();
//     }
//   });

//   form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     if (submitButton.classList.contains('_active')) {
//       form.classList.add('_sending');
//       const formData = new FormData(form);
//       fetch(form.action, {
//         method: form.method,
//         body: formData,
//       })
//         .then((response) => {
//           if (response.ok) {
//             form.classList.remove('_sending');
//             form.classList.add('_success');
//             form.reset();
//           } else {
//             throw new Error(response.statusText);
//           }
//         })
//         .catch(() => {
//           form.classList.add('_error');
//         });
//     }
//   });
// });
/* ==========================  Form  =====================================================
=========================================================================================*/
