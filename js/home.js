(function($){
    "use strict";

    $(document).ready(function () {
        const tooltipContent = `
        <div id="tooltip-dialog-main" class="tooltip-dialog">
            <i id="close-button" class="fas fa-times"></i>
            <span class="special-asterisk" style="font-size: large;"><b>*</b></span> Pro klienty, kteří si u nás objednají nábytek na míru, je cenová kalkulace a grafický návrh zdarma.<br><br>
            V případě, že si přejete obdržet cenovou kalkulaci a grafický návrh před potvrzením zakázky, je za jejich zpracování účtována částka 1 500 Kč s DPH za cenovou kalkulaci a 4 500 Kč s DPH za grafický návrh.<br><br>
            Pokud se následně rozhodnete pro realizaci projektu s námi, budou vám tyto poplatky odečteny z finální ceny zakázky.
        </div>
        `;
        $('body').append(tooltipContent);

        let tooltipSticky = false;

        function showTooltip(target) {
            const offset = target.offset();
            const height = target.outerHeight();
            const tooltipWidth = $('#tooltip-dialog-main').outerWidth();
            const windowWidth = $(window).width();
            let leftPosition = offset.left + (target.width() / 2) - (tooltipWidth / 2);
    
            if (leftPosition < 0) leftPosition = 10;
            if (leftPosition + tooltipWidth > windowWidth) leftPosition = windowWidth - tooltipWidth - 10;
    
            const topPosition = offset.top + height;
    
            $('#tooltip-dialog-main').css({
                top: topPosition,
                left: leftPosition
            }).show();
        }
    
        $('#clickable-main, #tooltip-dialog-main').hover(
            function() {
                showTooltip($('#clickable-main'));
            },
            function() {
                if (!tooltipSticky) {
                    $('#tooltip-dialog-main').hide();
                }
            }
        );
    
        $('#popup-link').click(function (e) {
            e.preventDefault();
            tooltipSticky = true;
            showTooltip($('#clickable-main'));
        });
    
        $('#close-button').click(function() {
            tooltipSticky = false;
            $('#tooltip-dialog-main').hide();
        });

        $(document).keydown(function(e) {
            if (e.key === "Escape") {
                tooltipSticky = false;
                $('#tooltip-dialog-main').hide();
            }
        });

        $(document).click(function(e) {
            if (!$(e.target).closest('#tooltip-dialog-main').length && !$(e.target).closest('#clickable-main').length && tooltipSticky) {
                tooltipSticky = false;
                $('#tooltip-dialog-main').hide();
            }
        });
    });

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    $(".feature_item").hover(
        function() {
            $(this).addClass('hover-effect');
        },
        function() {
            $(this).removeClass('hover-effect');
        }
    );

    $("#cenova-kalkulace").hover(
        function() {
            $('.disclaimer').addClass('hover-effect');
        },
        function() {
            $('.disclaimer').removeClass('hover-effect');
        }
    );

    function testimonialSlider() {
        if ($('.testimonial_slider').length){
            $('.testimonial_slider').owlCarousel({
                loop: true,
                margin: 30,
                items: 2,
                nav: true,
                autoplay: false,
                smartSpeed: 1500,
                dots: true,
                navContainer: '.testimonials_area',
                navText: ['<i class="lnr lnr-arrow-up"></i>', '<i class="lnr lnr-arrow-down"></i>'],
                responsiveClass: true,
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                }
            });
        }
    }
    testimonialSlider();

    function partnerSlide() {
        if ($('.partner_slider').length){
            $('.partner_slider').owlCarousel({
                loop: true,
                margin: 30,
                items: 5,
                nav: false,
                autoplay: false,
                smartSpeed: 1500,
                dots: false,
                responsiveClass: true,
                responsive: {
                    0: { items: 1 },
                    400: { items: 2 },
                    575: { items: 3 },
                    768: { items: 4 },
                    992: { items: 5 },
                }
            });
        }
    }
    partnerSlide();
})(jQuery);
