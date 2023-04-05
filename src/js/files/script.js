// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';

/* ==============================================================================================
=============================  Menu  ============================================================*/
function menuDropDown() {
  document.addEventListener('click', documentActions);

  function documentActions(e) {
    const targetElement = e.target;
    if (
      (bodyLockStatus && targetElement.closest('.menu__link, .actions-header__button ')) ||
      targetElement.closest('.menu__link span, .actions-header__button span')
    ) {
      const menuItem = targetElement.closest('.menu__item, .actions-header__item');
      if (menuItem.classList.contains('_hover')) {
        menuItem.classList.remove('_hover');
        bodyUnlock();
        document.documentElement.classList.remove('menu-open');
      } else {
        const openMenuItem = document.querySelector('.menu__item._hover');
        if (openMenuItem) {
          openMenuItem.classList.remove('_hover');
        }
        bodyLock();
        menuItem.classList.add('_hover');
        document.documentElement.classList.add('menu-open');
      }
    }
    if (
      !targetElement.closest('.menu__item, .actions-header__item') &&
      document.querySelectorAll('.menu__item._hover, .actions-header__item._hover').length > 0
    ) {
      const openMenuItem = document.querySelector(
        '.menu__item._hover, .actions-header__item._hover',
      );
      openMenuItem.classList.remove('_hover');
      bodyUnlock();
      document.documentElement.classList.remove('menu-open');
    }
  }

  let bodyLockStatus = true;

  let bodyLock = (delay = 500) => {
    let body = document.querySelector('body');
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll('[data-lp]');
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight =
          window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      }
      body.style.paddingRight =
        window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      document.documentElement.classList.add('lock');

      bodyLockStatus = false;
      setTimeout(function () {
        bodyLockStatus = true;
      }, delay);
    }
  };
  let bodyUnlock = (delay = 500) => {
    let body = document.querySelector('body');
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll('[data-lp]');
      setTimeout(() => {
        for (let index = 0; index < lock_padding.length; index++) {
          const el = lock_padding[index];
          el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        document.documentElement.classList.remove('lock');
      }, delay);
      bodyLockStatus = false;
      setTimeout(function () {
        bodyLockStatus = true;
      }, delay);
    }
  };
}
/* =========================== Menu ===================================================================
=======================================================================================================*/
/* ==============================================================================================
=============================  Form  ============================================================*/
function form() {
  const form = document.querySelector('[data-form]');
  const nameInput = document.querySelector('#input_name');
  const emailInput = document.querySelector('#input_email');
  const phoneInput = document.querySelector('#input_phone');
  const messageInput = document.querySelector('#input_question');
  const submitButton = document.querySelector('.form__button');

  const validateName = () => {
    const nameValue = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z]{2,}$/;
    if (nameInput && (nameValue === '' || !nameRegex.test(nameValue))) {
      nameInput.classList.add('_form-error');
      nameInput.previousElementSibling.textContent = nameInput.dataset.error;
    } else if (nameInput) {
      nameInput.classList.remove('_form-error');
      nameInput.previousElementSibling.textContent = '';
    }
    validateForm();
  };

  const validateEmail = () => {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && (emailValue === '' || !emailRegex.test(emailValue))) {
      emailInput.classList.add('_form-error');
      emailInput.previousElementSibling.textContent = emailInput.dataset.error;
    } else if (emailInput) {
      emailInput.classList.remove('_form-error');
      emailInput.previousElementSibling.textContent = '';
    }
    validateForm();
  };

  const validatePhone = () => {
    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^(\+?\d+)?(\s|\()?\d{3}(\s|\))?(\s|\-)?\d{3}(\s|\-)?\d{2}(\s|\-)?\d{2}$/;
    if (phoneInput && phoneValue !== '' && !phoneRegex.test(phoneValue)) {
      phoneInput.classList.add('_form-error');
      phoneInput.previousElementSibling.textContent = phoneInput.dataset.error;
    } else if (phoneInput) {
      phoneInput.classList.remove('_form-error');
      phoneInput.previousElementSibling.textContent = '';
    }
    validateForm();
  };

  const validateMessage = () => {
    const messageValue = messageInput.value.trim();
    if (messageInput && (messageValue.length < 5 || messageValue.length > 200)) {
      messageInput.classList.add('_form-error');
      messageInput.previousElementSibling.textContent = messageInput.dataset.error;
    } else if (messageInput) {
      messageInput.previousElementSibling.textContent = '';
      messageInput.classList.remove('_form-error');
    }
    validateForm();
  };

  const validateForm = () => {
    const requiredInputs = form.querySelectorAll('[data-required]');
    let isAllValid = true;
    requiredInputs.forEach((input) => {
      if (input && input.value.trim() === '') {
        input.classList.add('_form-error');
        input.previousElementSibling.textContent = input.dataset.error;
        isAllValid = false;
      } else if (input && input.classList.contains('_form-error')) {
        isAllValid = false;
      }
    });
    if (isAllValid) {
      submitButton.classList.add('_active');
    } else {
      submitButton.classList.remove('_active');
    }
  };
  if (nameInput) {
    nameInput.addEventListener('input', validateName);
  }
  if (emailInput) {
    emailInput.addEventListener('input', validateEmail);
  }
  if (phoneInput) {
    phoneInput.addEventListener('input', validatePhone);
  }
  if (messageInput) {
    messageInput.addEventListener('input', validateMessage);
  }
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
}
/* ==========================  Form  =====================================================
=========================================================================================*/

/* ===============================================================================
================================ Form Search =========================================================*/
function handleSearch(event) {
  event.preventDefault();

  const searchInput = event.target.querySelector('input[type="text"]');
  const searchQuery = searchInput.value.trim().toLowerCase();
  const spollersAll = document.querySelectorAll('[data-spoller]');
  const spollers = document.querySelectorAll('.spollers__item');

  spollersAll.forEach((spoller) => {
    spoller.classList.remove('_spoller-active');
    spoller.nextElementSibling.hidden = true;
  });

  if (searchQuery !== '') {
    const spollerMatches = Array.from(spollers).filter((spoller) => {
      const spollerTitle = spoller
        .querySelector('.spollers__title')
        .textContent.trim()
        .toLowerCase();
      const spollerText = spoller.querySelector('.spollers__text').textContent.trim().toLowerCase();

      return spollerTitle.includes(searchQuery) || spollerText.includes(searchQuery);
    });

    spollerMatches.forEach((spoller) => {
      spoller.classList.add('_spoller-active');

      const button = spoller.querySelector('.spollers__title');

      if (button && button.nextElementSibling.classList.contains('spollers__text')) {
        button.classList.add('_spoller-active');
        button.nextElementSibling.hidden = false;
      }
    });
    if (spollerMatches.length > 0) {
      const topMatch = spollerMatches[0];
      const topMatchOffset = topMatch.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: topMatchOffset - 100, behavior: 'smooth' });
    }
  }
}
/* =============================== Form Search ================================================
=========================================================================================*/
window.addEventListener('load', function (e) {
  menuDropDown();
  if (document.querySelector('[data-form]')) {
    form();
  }
  if (document.querySelector('.search-topics__search')) {
    const formSearch = document.querySelector('.search-topics__search');
    formSearch.addEventListener('submit', handleSearch);
  }
});
/* ===============================================================================
=========================================================================================*/
