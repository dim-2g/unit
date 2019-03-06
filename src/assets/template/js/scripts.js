$(function() {

    $('[data-mask]').each(function() {
        input = $(this);
        mask = input.attr('data-mask');
        input.inputmask({"mask": mask});
    });
    
    $('body').on('click', '[data-goto]', function(e) {
        e.preventDefault();
        var selector = $(this).attr('data-goto');
        $('.mobile-menu').slideUp();
        $('html, body').animate({ scrollTop: $(selector).offset().top}, 1200);
    });

    $('.toggle-menu').on('click', function () {
        $('.mobile-menu').slideToggle();
    });

    $('[data-tab]').click(function(){
        console.log('start animate');
        var parent = $(this).parents('.xtab-container');
        var xtab = parent.find('.xtab');
        xtab.stop(true, true);
        parent.find('[data-tab]').removeClass('active');
        $(this).addClass('active');

        var data_tab = $(this).attr('data-tab');
        xtab.animate({"opacity": 0.2}, 300, function() {
            console.log('in animate');
            xtab.removeClass('active');
            xtab.animate({"opacity": 1});
            console.log('in animate 2');
            $(data_tab).addClass('active');
        });
        console.log('stop animate');
        return false;
    }); 

    $('[data-toggle]').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        var selector = $(this).attr('data-toggle');
        console.log('toggle  '+selector);
        $(selector).slideToggle();
        //$(this).toggleClass('active');
    });

    $('[data-cart-toggle]').on('click', function(e) {
        e.stopPropagation();
        var selector = '.cart-top';
        $(selector).toggleClass('open');
    });
    /*
    $('.cart-top.full').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
    });
    */

    $('body').on('click', '.catalog-filter__collapse', function(e) {
        e.preventDefault();
        collapseLink = $(this);
        collapseLink.closest('.catalog-filter__body').find('.catalog-filter__item').show();
        collapseLink.hide();
    });

    $("[data-menu-parent]").hover(function () {
        $('[data-menu-childs]').removeClass('active');
        var menuParent = $(this).attr('data-menu-parent');
        $('[data-menu-childs="'+menuParent+'"]').addClass('active');
    }, 
    function () {
        //$('[data-menu-childs]').removeClass('active');
    });


    initCategorySlider();
    initMainSlider();
    initSlySpecial();
    initCollapseFilterBrand();

});

initCollapseFilterBrand = function() {
    maxShowFilterItems = 10;
    filterBody = $('.catalog-filter__widget--brand .catalog-filter__body');
    collapseLink = $('.catalog-filter__collapse');
    if (filterBody.find('.catalog-filter__item').length > maxShowFilterItems) {
        filterBody.find('.catalog-filter__item').each(function(index) {
            if ((index + 1) > maxShowFilterItems) {
                $(this).hide();
            }
        });
        collapseLink.show();
    }
}

initSlySpecial = function() {
    var $frame = $('.special-goods__frame');
    var $wrap  = $frame.parents('.special-goods__wrap');
    $frame.sly({
        horizontal: 1,
        itemNav: 'centered',
        smart: 1,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        startAt: 0,
        scrollBar: $wrap.find('.special-goods__scrollbar'),
        scrollBy: 1,
        speed: 300,
        elasticBounds: 1,
        easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1,
        activatePageOn: 'click',
        // Buttons
        prevPage: $wrap.find('.prev'),
        nextPage: $wrap.find('.next')
    });
}

var isInitCategorySlider = false;
initCategorySlider = function() {
    selector = '.category-slider';
    if (!isInitCategorySlider) {
        $(selector).slick({
            'autoplay': false,
            'arrows': true,
            'dots': true,
            'slidesToShow': 6,
            'slidesToScroll': 6,
            'initialSlide': 0,
            'infinite': false,
            'responsive': [
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });
        isInitCategorySlider = true;
    }
};

var isInitMainSlider = false;
initMainSlider  = function() {
    var selector = '.main-slider-js';
    if (!isInitMainSlider) {
        $(selector).slick({
            'autoplay': false,
            'arrows': true,
            'dots': false,
            'slidesToShow': 1,
            'slidesToScroll': 1,
            'fade': false,
            'appendArrows': $('.main-slider__nav'),
            'prevArrow': '<span class="main-slider__prev" aria-label="Previous" type="button"></span>',
            'nextArrow': '<span class="main-slider__next" aria-label="Next" type="button"></span>',
            'responsive': [
                {
                    breakpoint: 750,
                    settings: {
                        vertical: false,
                        dots: false,
                    }
                }
            ]
        });
        isInitMainSlider = true;
    }
};

var slider_grateful = false;
initGratefulSlider  = function() {
    if (!slider_grateful) {
        $('.grateful-slider').slick({
            'autoplay': false,
            'arrows': true,
            'dots': false,
            'slidesToShow': 2,
            'slidesToScroll': 1,
            'adaptiveHeight': false,
            'responsive': [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });
        slider_grateful = true;
    }
};

var main_news_slider = false;
initMainNewsSlider = function() {
    selector = '.main-news-slider';
    if ($(window).width()<1000) {
        if (!main_news_slider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': true,
                'dots': false,
                'slidesToShow': 2,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': true,
                'adaptiveHeight': true
            });
            main_news_slider = true;
        }
    } else {
        if (main_news_slider) {
            $(selector).slick('unslick');
            main_news_slider = false;
        }
    }
};

var main_reviews_slider = false;
initMainReviewsSlider = function() {
    selector = '.main-reviews-slider';
    if ($(window).width()<1000) {
        if (!main_reviews_slider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': true,
                'dots': false,
                'slidesToShow': 1,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': true,
                'adaptiveHeight': true
            });
            main_reviews_slider = true;
        }
    } else {
        if (main_reviews_slider) {
            $(selector).slick('unslick');
            main_reviews_slider = false;
        }
    }
};

var slider_about_grateful = false;
initAboutGratefulSlider  = function() {
    if (!slider_about_grateful) {
        $('.about-grateful-slider').slick({
            'autoplay': false,
            'arrows': true,
            'dots': false,
            'slidesToShow': 5,
            'slidesToScroll': 1,
            'adaptiveHeight': false,
            'responsive': [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });
        slider_about_grateful = true;
    }
};

var doit;
$(window).resize(function(){
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
});

function resizedw(){
    var width = $(window).width();

    initCategorySlider();
    initGratefulSlider();
    initMainNewsSlider();
    initMainReviewsSlider();
}


$(document).scroll(function(){
    //setFixedHeader();
});

