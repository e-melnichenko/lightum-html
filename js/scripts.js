"use strict";

$(document).ready(function () {
  initVideo();
  initTaskForm();
  initResultForm();
  AOS.init({
    disable: false,
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
    offset: 120,
    delay: 0,
    duration: 400,
    easing: 'ease',
    once: false,
    mirror: false,
    anchorPlacement: 'top-bottom'
  });
  var parallaxScroll = new Rellax('.parallax-scroll', {
    center: true,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false
  });
  var parallaxInstance = undefined;

  var parallaxInit = function parallaxInit() {
    var screenWidth = $(window).width();
    var parallaxBlocks = document.querySelectorAll('.parallax');
    parallaxBlocks.forEach(function (parallax) {
      if (screenWidth > 899 && parallax !== null) {
        var _parallaxInstance = new Parallax(parallax);
      }
    });
  };

  parallaxInit();
  var coursesSlider = new Swiper('.courses-slider .swiper-container', {
    slidesPerView: 'auto',
    loop: false,
    spaceBetween: 50
  });
  var coursesCategoriesSlider = new Swiper('.courses-categories-slider .swiper-container', {
    slidesPerView: 'auto',
    loop: false,
    spaceBetween: 50
  });
  var starterSlider = new Swiper('.starter-slider .swiper-container', {
    slidesPerView: 'auto',
    loop: false,
    spaceBetween: 35
  });
  var concentrateSlider = new Swiper('.concentrate-slider .swiper-container', {
    slidesPerView: 'auto',
    loop: false,
    spaceBetween: 30,
    breakpoints: {
      992: {
        spaceBetween: 5
      }
    }
  });
  var panelTabsSlider = new Swiper('.lk-panel-tabs .swiper-container', {
    slidesPerView: 'auto',
    loop: false // allowTouchMove: true,
    // breakpoints: {
    //     1260: {
    //         allowTouchMove: false,
    //     },
    // }

  });
  var lessonSlider = new Swiper('.js-lesson-slider', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    on: {
      slideChange: function slideChange() {
        $(this.$el).find('.js-video-container').each(function () {
          $(this).find('.js-video').get(0).pause();
          $(this).removeClass('_playing');
          $(this).closest('.js-lesson-slider').removeClass('_playing');
        });
      }
    }
  });
  $('body').on('click', '[data-toggle="categories-list"]', function () {
    $(this).next('.categories-list').slideToggle();
  });
  $('body').on('click', '[data-action="change-lk-list"]', function () {
    var selectedList = $(this).data('tabs-name');
    $('[data-action="change-lk-list"], .lk-panel-pages__item').removeClass('active');
    $(this).addClass('active');
    $("#".concat(selectedList)).addClass('active');
  });
  $('body').on('click', '[data-action="close-message"]', function () {
    $(this).parent('.message').hide();
  });

  var dragElementImg = function dragElementImg() {
    if (document.getElementById("comparison-change")) {
      var positionImg = document.getElementById("comparison-change").offsetLeft;

      if (positionImg <= 0 || positionImg >= $(window).width()) {
        $('#comparison-change img').addClass('center');
      } else {
        $('#comparison-change img').removeClass('center');
      }

      ;
    }
  };

  dragElementImg();

  function dragElement(elmnt) {
    if (elmnt) {
      var dragMouseDown = function dragMouseDown(e) {
        e = e || window.event;
        pos2 = e.clientX;
        document.onmouseout = closeDragElement;
        document.onmousemove = elementDrag;
      };

      var elementDrag = function elementDrag(e) {
        e = e || window.event;
        elmnt.style.left = e.clientX + 'px';
        $('.comparison__block_last').css('width', "".concat(e.clientX, "px"));
      };

      var dragTouchDown = function dragTouchDown(e) {
        e = e || window.event;
        pos2 = e.touches[0].clientX;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementTouchDrag;
      };

      var elementTouchDrag = function elementTouchDrag(e) {
        e = e || window.event;
        pos1 = pos2 - e.touches[0].clientX;
        pos2 = e.touches[0].clientX;
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
        $('.comparison__block_last').css('width', "".concat(elmnt.offsetLeft - pos1, "px"));
        dragElementImg();
      };

      var closeDragElement = function closeDragElement() {
        document.onmouseup = null;
        document.ontouchend = null;
        document.onmousemove = null;
        document.ontouchmove = null;
      };

      var pos1 = 0,
          pos2 = 0;
      document.getElementById("comparison-container").onmouseover = dragMouseDown;
      elmnt.ontouchstart = dragTouchDown;
      ;
    }

    ;
  }

  ;
  dragElement(document.getElementById("comparison-change"));

  function initVideo() {
    $('.js-play').on('click', function () {
      var $container = $(this).closest('.js-video-container');
      $container.find('.js-video').get(0).play();
      $container.addClass('_playing');
      $container.closest('.js-lesson-slider').addClass('_playing');
    });
    $('.js-video').on('ended', function () {
      $(this).closest('.js-video-container').removeClass('_playing').closest('.js-lesson-slider').removeClass('_playing');
    });
    $('.js-video').on('click', function () {
      var $container = $(this).closest('.js-video-container');
      if (!$container.hasClass('_playing')) return;
      this.pause();
      $container.removeClass('_playing').closest('.js-lesson-slider').removeClass('_playing');
    });
  }

  function initTaskForm() {
    $('body').on('change', '.js-task-input', checkAnswer);

    function checkAnswer() {
      var $form = $(this).closest('.js-task-form');
      var data = new FormData($form[0]);
      $.ajax({
        data: data,
        url: $form[0].action,
        processData: false,
        success: function success(data) {
          var dataMock = {
            res: {
              correctInputValue: '3',
              answer: "\u0418\u0432\u0430\u043D \u0433\u0440\u043E\u0437\u043D\u044B\u0439 \u043B\u044E\u0431\u0438\u043B \u0446\u0438\u0444\u0440\u044B 1 8 5 \u0438 \u0434\u0430\u0442\u0443 \u0441\u043C\u0435\u0440\u0442\u0438 \u0432\u044B\u0431\u0440\u0430\u043B \u043B\u0438\u0447\u043D\u043E.<br> \u041C\u044B \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u043B\u0438 \u044D\u0442\u043E \u043D\u0430 \u0443\u0440\u043E\u043A\u0435 \u043F\u0440\u043E \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u0441\u043C\u0443\u0442\u043D\u043E\u0433\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0438 "
            }
          };
          renderAnswer(dataMock.res);
        }
      });

      function renderAnswer(_ref) {
        var correctInputValue = _ref.correctInputValue,
            answer = _ref.answer;
        $form.find('.js-task-input').each(function () {
          var inputClass = this.value === correctInputValue ? '_correct' : '_wrong';
          $(this).addClass(inputClass);
        });
        $form.find('.js-answer').html("<p class=\"task__answer\">".concat(answer, "</p>"));
      }
    }
  }

  function initResultForm() {
    $('.js-result-form').on('submit', function (e) {
      e.preventDefault();
      var form = this;
      var data = new FormData(form);
      $.ajax({
        data: data,
        url: form.action,
        processData: false,
        success: function success() {
          form.reset();
          alert('Ваш вопрос отправлен преподавателю');
        },
        error: function error() {
          alert('Что-то пошло не так');
        }
      });
    });
  }
});