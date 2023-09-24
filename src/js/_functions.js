// Данный файл - лишь снипеты готовых компонентов.

// Подключение свайпера
// import Swiper, { Navigation, Pagination } from 'swiper';

// Swiper.use([Navigation, Pagination]);

// const mySwiper = new Swiper('.swiper__test', {

//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// })


// Подключение маски 
// import Inputmask from "inputmask";
// var selector = document.querySelectorAll("input[type='tel']");
// if (selector) {
//     selector.forEach((el) => {
//         var im = new Inputmask("+7(999)-999-99-99");
//         im.mask(selector);
//     })
// }

// Подключение плагина кастом-скролла
// import 'simplebar';
// Array.prototype.forEach.call(
//     document.querySelectorAll('.feedback__descr'),
//     (el) => new SimpleBar(el)
//   );

// Якорный переход
// import SmoothScroll from 'smooth-scroll'
// var scroll = new SmoothScroll('a[href*="#"]', {
//     speed: 300
// });

// валидатор
// import JustValidate from 'just-validate';
// import Inputmask from "inputmask";
// var selector = document.querySelectorAll("input[type='tel']");
// if (selector) {
//     selector.forEach((el) => {
//         var im = new Inputmask("+7(999)-999-99-99");
//         im.mask(selector);
//     })
//   }

// const validator = new JustValidate('.form');
// validator
//   .addField(document.querySelector('.input-name'), [
//     {
//       rule: 'required',
//       value:true,
//       errorMessage: 'Вы не ввели имя',
//     },
//   ])
//   .addField(document.querySelector('.input-email'), [
//     {
//       rule: 'required',
//       value:true,
//       errorMessage: 'Вы не ввели e-mail',
//     },
//     {
//       rule: 'email',
//     },
//   ])
//   .addField(document.querySelector('.input-tel'), [
//     {
//       rule: 'required',
//       value:true,
//       errorMessage: 'Вы не ввели телефон',
//     },
//   ])