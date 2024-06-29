(function ($) {
    "use strict";

    function navbarFixed() {
        var nav_offset_top = $('header').height();

        if ($('.header_area').length) {
            $(window).scroll(function () {
                var scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        }
    }
    navbarFixed();

    document.addEventListener("DOMContentLoaded", function () {
        var navItems = document.querySelectorAll('.nav-item .dropdown-menu a');
        var currentUrl = window.location.pathname;

        navItems.forEach(function (item) {
            if (item.getAttribute('href') === currentUrl) {
                item.classList.add('active');
                item.closest('.nav-item').classList.add('active');
                item.closest('.nav-item.submenu.dropdown').classList.add('active');
            }
        });
    });

    $(document).ready(function () {
        function handleScroll() {
            var scrollPosition = $(window).scrollTop();
            var windowWidth = $(window).width();
    
            if (scrollPosition > 0) {
                if (windowWidth > 1400) {
                    if(!$('.up_arrow').hasClass('fade-in')) {
                        $('.up_arrow').removeClass('fade-out').addClass('fade-in').css('display', 'flex');
                    }
                } else {
                    $('.up_arrow').removeClass('fade-in').addClass('fade-out');
                    setTimeout(function() {
                        if (!$('.up_arrow').hasClass('fade-in')) {
                            $('.up_arrow').css('display', 'none');
                        }
                    }, 1000);
                }
            } else {
                $('.up_arrow').removeClass('fade-in').addClass('fade-out');
                setTimeout(function() {
                    if (!$('.up_arrow').hasClass('fade-in')) {
                        $('.up_arrow').css('display', 'none');
                    }
                }, 1000);
            }
        }
    
        handleScroll();
    
        $(window).scroll(function () {
            handleScroll();
        });
    
        $(window).resize(function () {
            handleScroll();
        });
    
        $('.down_arrow').click(function (e) {
            e.preventDefault();
            var linkHref = $(this).attr('href');
            var headerHeight = 100;
    
            if ($(window).width() < 992) {
                headerHeight = 140;
            }
    
            $('html, body').animate(
                {
                    scrollTop: $(linkHref).offset().top - headerHeight,
                },
                1000,
                function () {
                    handleScroll();
                }
            );
        });
    
        $('.up_arrow').click(function (e) {
            e.preventDefault();
            $('html, body').animate(
                {
                    scrollTop: 0
                },
                1000,
                function () {
                    handleScroll();
                }
            );
        });
    });
})(jQuery);
