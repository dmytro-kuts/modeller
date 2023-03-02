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

