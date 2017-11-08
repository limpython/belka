$(document).ready(function () {

    var $menuToggle = $('#js-menu-toggle'),
        $menu = $('#js-header__menu'),
        $menuItem = $('.js-menu__item'),
        $routesList = $('#js-routes__list'),
        $galleryList = $('#js-gallery__list'),
        $reviewsList = $('#js-reviews__list'),
        $upward = $('#js-upward'),
        $pricesSelectGroup = $('.js-prices__select-group'),
        $pricesSelectToggle = $('.js-prices__select-toggle'),

        sliderSettings = {
            routes: {
                mobileFirst: true,
                slidesToShow: 1,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 3,
                            autoplay: true,
                            autoplaySpeed: 5000,
                            pauseOnFocus: false
                        }

                    },
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 5,
                            arrows: false,
                            draggable: false,
                            swipe: false,
                            initialSlide: 0,
                            autoplay: true,
                            autoplaySpeed: 5000,
                            pauseOnFocus: false
                        }

                    }
                ]
            },
            reviews: {
                mobileFirst: true,
                slidesToShow: 1,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 3,
                            autoplay: true,
                            autoplaySpeed: 5000,
                            pauseOnFocus: false
                        }

                    }
                ]
            },
            gallery: {
                mobileFirst: true,
                slidesToShow: 1,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 3,
                            arrows: false,
                            draggable: false,
                            swipe: false,
                            initialSlide: 0
                        }

                    }
                ]
            }
        };

    $menuToggle.on('click', function () {
        $menu.toggleClass('header__menu--active');
    });

    $menuItem.on('click', function (event) {
        var top = $($(this).attr('href')).offset().top - 20;

        $menuItem.removeClass('menu__item--active');
        $(this).addClass('menu__item--active');

        event.preventDefault();
        $('html, body').animate({
            scrollTop: top
        }, 1000);

        $menu.removeClass('header__menu--active');
    });

    $upward.on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    $pricesSelectToggle.on('click', function (event) {
        var activeClass = 'prices__select-group--active',
            $closestGroup = $(this).closest($pricesSelectGroup);

        event.preventDefault();

        if ($closestGroup.hasClass(activeClass)) {
            $closestGroup.removeClass(activeClass);
        } else {
            $pricesSelectGroup.removeClass(activeClass);
            $closestGroup.addClass(activeClass);
        }
    });

    $routesList.slick(sliderSettings.routes);
    $galleryList.slick(sliderSettings.gallery);
    $reviewsList.slick(sliderSettings.reviews);

});
