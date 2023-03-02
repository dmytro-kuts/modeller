/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper, { Navigation, Autoplay, Parallax } from 'swiper';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import '../../scss/base/swiper.scss';
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
  // Список слайдерів
  // Перевіряємо, чи є слайдер на сторінці

  if (document.querySelector('.companies__slider')) {
    // Вказуємо склас потрібного слайдера
    // Створюємо слайдер
    new Swiper('.companies__slider', {
      // Вказуємо склас потрібного слайдера
      // Підключаємо модулі слайдера
      // для конкретного випадку
      modules: [Navigation, Autoplay],
      observer: true,
      observeParents: true,
      slidesPerView: 10,
      spaceBetween: 40,
      centeredSlides: true,
      loopedSlides: 4,
      slidesPerView: 'auto',
      loop: true,
      speed: 10000,
      autoplay: {
        enabled: true,
        delay: 1,
      },
      //touchRatio: 0,
      //simulateTouch: false,
      // loop: true,
      //preloadImages: false,
      //lazy: true,

      /*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

      // Пагінація
      /*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

      // Скроллбар
      /*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

      // Кнопки "вліво/вправо"
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
      /*
			// Брейкпоінти
			breakpoints: {
				319: {
					slidesPerView: 1.4,
					spaceBetween: 24,
				},
				768: {
					slidesPerView: 2.2,
					spaceBetween: 24,
				},
				992: {
					slidesPerView: 3.3,
					spaceBetween: 24,
				},
				1240: {
					slidesPerView: 4.4,
					spaceBetween: 24,
				},
			},*/
      // Події
      on: {},
    });
  }
  if (document.querySelector('.stories__slider')) {
    // Вказуємо склас потрібного слайдера
    // Створюємо слайдер
    new Swiper('.stories__slider', {
      // Вказуємо склас потрібного слайдера
      // Підключаємо модулі слайдера
      // для конкретного випадку
      modules: [Navigation, Autoplay, Parallax],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 60,
      centeredSlides: true,
      loopedSlides: 3,
      autoHeight: true,
      // slidesPerView: 'auto',
      loop: true,
      speed: 800,
      parallax: true,
      // autoplay: {
      //   enabled: true,
      //   delay: 1,
      // },
      // Кнопки "вліво/вправо"
      navigation: {
        prevEl: '.controls-stories__arrow_prev',
        nextEl: '.controls-stories__arrow_next',
      },
      // Події
      on: {},
    });
  }
  if (document.querySelector('.team__slider')) {
    // Вказуємо склас потрібного слайдера
    // Створюємо слайдер
    new Swiper('.team__slider', {
      // Вказуємо склас потрібного слайдера
      // Підключаємо модулі слайдера
      // для конкретного випадку
      modules: [Navigation, Autoplay],
      observer: true,
      observeParents: true,
      slidesPerView: 5.5,
      spaceBetween: 24,
      // autoHeight: true,
      loopedSlides: 7,
      loop: true,
      speed: 10000,
      autoplay: {
        enabled: true,
        delay: 1,
      },
      // Брейкпоінти
      breakpoints: {
        319: {
          slidesPerView: 1.4,
          spaceBetween: 20,
          autoHeight: true,
        },
        418: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        600: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 24,
        },
        1260: {
          slidesPerView: 5.2,
          spaceBetween: 24,
        },
      },
      // Події
      on: {},
    });
  }
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
  let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: {
          enabled: true,
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false,
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
}

window.addEventListener('load', function (e) {
  // Запуск ініціалізації слайдерів
  initSliders();
  // Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
  //initSlidersScroll();
});
