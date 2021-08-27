$(document).ready(function () {
    initVideo();

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

    let parallaxScroll = new Rellax('.parallax-scroll', {
        center: true,
        wrapper: null,
        round: true,
        vertical: true,
        horizontal: false,
    });

    let parallaxInstance = undefined;
    let parallaxInit = () => {

        let screenWidth = $(window).width();
        let parallaxBlocks = document.querySelectorAll('.parallax');
        
        parallaxBlocks.forEach(parallax => {
            if (screenWidth > 899 && parallax !== null) {
                let parallaxInstance = new Parallax(parallax);
            }
        });
        
    };
    parallaxInit();

    let coursesSlider = new Swiper('.courses-slider .swiper-container', {
        slidesPerView: 'auto',
        loop: false,
        spaceBetween: 50,
    });

    let coursesCategoriesSlider = new Swiper('.courses-categories-slider .swiper-container', {
        slidesPerView: 'auto',
        loop: false,
        spaceBetween: 50,
    });

    let starterSlider = new Swiper('.starter-slider .swiper-container', {
        slidesPerView: 'auto',
        loop: false,
        spaceBetween: 35,
    });

    let concentrateSlider = new Swiper('.concentrate-slider .swiper-container', {
        slidesPerView: 'auto',
        loop: false,
        spaceBetween: 30,
        breakpoints: {
            992: {
              spaceBetween: 5
            }
        }
    });

    let panelTabsSlider = new Swiper('.lk-panel-tabs .swiper-container', {
        slidesPerView: 'auto',
        loop: false,
        // allowTouchMove: true,
        // breakpoints: {
        //     1260: {
        //         allowTouchMove: false,
        //     },
        // }
    });

    const lessonSlider = new Swiper('.js-lesson-slider', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        on: {
            slideChange() {
                $(this.$el).find('.js-video-container').each(function() {
                    $(this).find('.js-video').get(0).pause();
                    $(this).removeClass('_playing');
                })
            }
        }
    })

    $('body').on('click', '[data-toggle="categories-list"]', function() {
        $(this).next('.categories-list').slideToggle();
    });

    $('body').on('click', '[data-action="change-lk-list"]', function() {
        let selectedList = $(this).data('tabs-name');
        $('[data-action="change-lk-list"], .lk-panel-pages__item').removeClass('active');
        $(this).addClass('active');
        $(`#${selectedList}`).addClass('active');
    });

    $('body').on('click', '[data-action="close-message"]', function() {
        $(this).parent('.message').hide();
    });

    let dragElementImg = () => {
        if ( document.getElementById("comparison-change") ) {
            let positionImg = document.getElementById("comparison-change").offsetLeft;

            if ( positionImg <= 0 || positionImg >= $(window).width() ) {
                $('#comparison-change img').addClass('center');
            } else {
                $('#comparison-change img').removeClass('center')
            };
        }
    };
    dragElementImg();

    function dragElement(elmnt) {
        if (elmnt) {
            var pos1 = 0, pos2 = 0;
            document.getElementById("comparison-container").onmouseover = dragMouseDown;
            
            function dragMouseDown(e) {
                e = e || window.event;
                pos2 = e.clientX;
                document.onmouseout = closeDragElement;
                document.onmousemove = elementDrag;
            }
            
            function elementDrag(e) {
                e = e || window.event;
                elmnt.style.left = e.clientX + 'px';
                $('.comparison__block_last').css('width', `${e.clientX}px`)
            }

            elmnt.ontouchstart = dragTouchDown;

            function dragTouchDown(e) {
                e = e || window.event;
                pos2 = e.touches[0].clientX;
                document.ontouchend = closeDragElement;
                document.ontouchmove = elementTouchDrag;
            }

            function elementTouchDrag(e) {
                e = e || window.event;
                pos1 = pos2 - e.touches[0].clientX;
                pos2 = e.touches[0].clientX;
                elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
                $('.comparison__block_last').css('width', `${elmnt.offsetLeft - pos1}px`);
                dragElementImg();
            }
            
            function closeDragElement() {
                document.onmouseup = null;
                document.ontouchend = null;
                document.onmousemove = null;
                document.ontouchmove = null;
            };
        };
    };
    dragElement(document.getElementById("comparison-change"));

    function initVideo() {
        $('.js-play').on('click', function() {
            const $container = $(this).closest('.js-video-container');
            $container.find('.js-video').get(0).play();
            $container.addClass('_playing')
        })

        $('.js-video').on('ended', function() {
            $(this).closest('.js-video-container').removeClass('_playing')
        })

        $('.js-video').on('click', function() {
            const $container = $(this).closest('.js-video-container');
            if(!$container.hasClass('_playing')) return

            this.pause();
            $container.removeClass('_playing');
        })
    }
});