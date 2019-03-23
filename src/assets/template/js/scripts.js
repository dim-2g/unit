$(function() {

    initCategorySlider();
    initMainSlider();
    initSlySpecial();
    initCollapseFilterBrand();
    initGalleryCardSlider();
    //initSlyAlsoBuy();
    initAlsoBuySlider();
    initMainPartnersSlider();
    initMainViewedSlider();
    setClickableCatalogMenu();
    initProductSimilarSlider();
    initProductViewedSlider();
    initInnerPartnersSlider();
    initSidebarSlider();
    switchCatalogView();

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

    $('.toggle-footer-menu').on('click', function () {
        $('.footer-menu').slideToggle();
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
        e.preventDefault();
        e.stopPropagation();
        var selector = '.cart-top';
        $(selector).toggleClass('open');
    });

    $('body.clickable-catalog-menu').on('click', '.catalog-burger', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var link = $(this);
        link.closest('.menu-catalog').toggleClass('open');
    });

    $('body.clickable-catalog-menu').on('click', '[data-menu-parent]', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var li = $(this);
        li.closest('.menu-catalog').addClass('open-first-level');

        $('[data-menu-parent]').find('a').removeClass('active');
        li.find('a').addClass('active');
    });

    $('body').on('click', '.catalog-filter__collapse', function(e) {
        e.preventDefault();
        collapseLink = $(this);
        collapseLink.closest('.catalog-filter__body').find('.catalog-filter__item').show();
        collapseLink.hide();
    });

    $('body').on('click', '.js-product-widget-toggle', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var widget = $(this).closest('.product-widget');
        widget.toggleClass('open');
    });

    $('body').on('click', '.js-pseudo-widget-toggle', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var widget = $(this).closest('.pseudo-widget');
        widget.toggleClass('open');
    });

    $('body').on('click', '.catalog-category__name', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var card = $(this).closest('.catalog-category__card');
        card.toggleClass('open');
    });


    $('body').on('click', '.catalog-filter-button, .sidebar-close', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var sidebar = $('.catalog__sidebar');
        var overlay = $('.overlay-light');

        if (sidebar.hasClass('open')) {
            sidebar.removeClass('open');
            setTimeout(function() { overlay.hide(); }, 300);

        } else {
            sidebar.addClass('open');
            overlay.show();
        }
    });




    $("[data-menu-parent]").hover(function () {
        $('[data-menu-childs]').removeClass('active');
        var menuParent = $(this).attr('data-menu-parent');
        $('[data-menu-childs="'+menuParent+'"]').addClass('active');
    }, 
    function () {
        //$('[data-menu-childs]').removeClass('active');
    });


    $(document).on('change','.attach-invoice__input',function(){
        var file=$(this).val();
        file=file.replace(/\\/g,"/").split('/').pop();
        $('.attach-invoice__filename').text('Файл: '+file);
    });

    $('body').append('<a href="#top" class="to-top"></a>');
    $(".to-top").hide().click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    initSortSelect();
    $('body').on('change', '.mse2_sort_select', function(e){
        e.preventDefault();
        mse2Config.sort = $(this).val();
        mSearch2.submit();
        initSortSelect();
        return false;
    });

    $('body').on('click', '[data-ms2form-submit]', function(e) {
        e.preventDefault();
        var parent = $(this).attr('data-ms2form-submit');
        $(this).closest(parent).find('form.ms2_form').trigger('submit');
    });

    $('body').on('click', '.product-options__more-link', function(e){
        e.preventDefault();
        var target = $('[data-tab=".xtab-options"]');
        target.trigger('click');
        $('html, body').animate({ scrollTop: target.offset().top}, 800);
    });

});

initSortSelect = function() {
    var textForSortSelect = $('.mse2_sort_select option:selected').text();
    $('.catalog-sort__select').text(textForSortSelect);
};


initGalleryCardSlider = function() {
    var selector = '.product__main-images';
    var selectorPreviews = '.product__previews';
    $(selector).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: selectorPreviews,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    dots: false,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    dots: true,
                }
            },
            {
                breakpoint: 450,
                settings: {
                    dots: false,
                }
            }
        ]
    });

    //setArrows(selector);
    $(selector).on('breakpoint', function(event, slick, direction){
        //setArrows(selector);
    });
    $(selectorPreviews).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: selector,
        dots: false,
        focusOnSelect: true,
        arrows: false,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 750,
                settings: {
                    vertical: false
                }
            }
        ]
    });
};

initCollapseFilterBrand = function() {
    maxShowFilterItems = 12;
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

initSlyAlsoBuy = function() {
    var $frame = $('.also-buy__frame');
    var $wrap  = $frame.parents('.also-buy');
    $frame.sly({
        horizontal: 1,
        itemNav: 'centered',
        smart: 1,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        startAt: 0,
        scrollBy: 0,
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
                        arrows: false,
                        vertical: false,
                        dots: false,
                        slidesToShow: 2,
                        initialSlide: 2,
                        slidesToScroll: 3,
                        centerMode: true,
                        centerPadding: '70px',
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        arrows: false,
                        vertical: false,
                        dots: false,
                        slidesToShow: 1,
                        initialSlide: 1,
                        slidesToScroll: 3,
                        centerMode: true,
                        centerPadding: '70px',
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

var isInitSidebarSlider = false;
initSidebarSlider  = function() {
    var selector = '.sidebar-slider-js';
    if (!isInitSidebarSlider) {
        $(selector).slick({
            'autoplay': false,
            'arrows': true,
            'dots': false,
            'slidesToShow': 1,
            'slidesToScroll': 1,
            'fade': false,
            'appendArrows': $('.sidebar-slider__nav'),
            'prevArrow': '<span class="sidebar-slider__prev" aria-label="Previous" type="button"></span>',
            'nextArrow': '<span class="sidebar-slider__next" aria-label="Next" type="button"></span>',
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
        isInitSidebarSlider = true;
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

var isInitMainPartnersSlider = false;
initMainPartnersSlider = function() {
    selector = '.main-partners-slider';
    if ($(window).width()<750) {
        if (!isInitMainPartnersSlider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': true,
                'dots': false,
                'slidesToShow': 2,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': true,
                'adaptiveHeight': true,
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
                            arrows: false,
                            vertical: false,
                            dots: false,
                            slidesToShow: 2,
                            initialSlide: 2,
                            slidesToScroll: 3,
                            centerMode: true,
                            centerPadding: '70px',
                        }
                    },
                    {
                        breakpoint: 450,
                        settings: {
                            arrows: false,
                            vertical: false,
                            dots: false,
                            slidesToShow: 1,
                            initialSlide: 1,
                            slidesToScroll: 3,
                            centerMode: true,
                            centerPadding: '100px',
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            arrows: false,
                            vertical: false,
                            dots: false,
                            slidesToShow: 1,
                            initialSlide: 1,
                            slidesToScroll: 3,
                            centerMode: true,
                            centerPadding: '80px',
                        }
                    },
                    {
                        breakpoint: 330,
                        settings: {
                            arrows: false,
                            vertical: false,
                            dots: false,
                            slidesToShow: 1,
                            initialSlide: 1,
                            slidesToScroll: 3,
                            centerMode: true,
                            centerPadding: '60px',
                        }
                    }
                ]
            });
            isInitMainPartnersSlider = true;
        }
    } else {
        if (isInitMainPartnersSlider) {
            $(selector).slick('unslick');
            isInitMainPartnersSlider = false;
        }
    }
};


var isInitInnerPartnersSlider = false;
initInnerPartnersSlider = function() {
    selector = '.inner-partners-slider';
    if ($(window).width()<750) {
        if (!isInitInnerPartnersSlider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': true,
                'dots': false,
                'slidesToShow': 2,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': true,
                'adaptiveHeight': true,
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
                            arrows: false,
                            vertical: false,
                            dots: false,
                            slidesToShow: 2,
                            initialSlide: 2,
                            slidesToScroll: 3,
                            centerMode: true,
                            centerPadding: '70px',
                        }
                    },
                    {
                        breakpoint: 450,
                        settings: {
                            arrows: false,
                            vertical: false,
                            dots: false,
                            slidesToShow: 1,
                            initialSlide: 1,
                            slidesToScroll: 3,
                            centerMode: true,
                            centerPadding: '100px',
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            arrows: false,
                            vertical: false,
                            dots: false,
                            slidesToShow: 1,
                            initialSlide: 1,
                            slidesToScroll: 3,
                            centerMode: true,
                            centerPadding: '80px',
                        }
                    },
                    {
                        breakpoint: 330,
                        settings: {
                            arrows: false,
                            vertical: false,
                            dots: false,
                            slidesToShow: 1,
                            initialSlide: 1,
                            slidesToScroll: 3,
                            centerMode: true,
                            centerPadding: '60px',
                        }
                    }
                ]
            });
            isInitInnerPartnersSlider = true;
        }
    } else {
        if (isInitInnerPartnersSlider) {
            $(selector).slick('unslick');
            isInitInnerPartnersSlider = false;
        }
    }
};

var isInitMainViewedSlider = false;
initMainViewedSlider = function() {
    selector = '.main-viewed-slider';
    if ($(window).width()<1000) {
        if (!isInitMainViewedSlider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': false,
                'dots': false,
                'slidesToShow': 2,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': true,
                'adaptiveHeight': true,
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
                            arrows: false,
                            vertical: false,
                            dots: false,
                            slidesToShow: 2,
                            initialSlide: 2,
                            slidesToScroll: 3,
                            centerMode: true,
                            centerPadding: '70px',
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            arrows: false,
                            vertical: false,
                            dots: false,
                            slidesToShow: 1,
                            initialSlide: 1,
                            slidesToScroll: 3,
                            centerMode: true,
                            centerPadding: '60px',
                        }
                    }
                ]
            });
            isInitMainViewedSlider = true;
        }
    } else {
        if (isInitMainViewedSlider) {
            $(selector).slick('unslick');
            isInitMainViewedSlider = false;
        }
    }
};

var isInitProductViewedSlider = false;
initProductViewedSlider = function() {
    selector = '.product-viewed-slider';
    if ($(window).width()<1000) {
        if (!isInitProductViewedSlider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': false,
                'dots': false,
                'slidesToShow': 2,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': true,
                'adaptiveHeight': true,
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
                            arrows: false,
                            vertical: false,
                            dots: false,
                            slidesToShow: 2,
                            initialSlide: 2,
                            slidesToScroll: 3,
                            centerMode: true,
                            centerPadding: '70px',
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            arrows: false,
                            vertical: false,
                            dots: false,
                            slidesToShow: 1,
                            initialSlide: 1,
                            slidesToScroll: 3,
                            centerMode: true,
                            centerPadding: '60px',
                        }
                    }
                ]
            });
            isInitProductViewedSlider = true;
        }
    } else {
        if (isInitProductViewedSlider) {
            $(selector).slick('unslick');
            isInitProductViewedSlider = false;
        }
    }
};

var isInitProductSimilarSlider = false;
initProductSimilarSlider = function() {
    selector = '.product-similar-slider';
    if ($(window).width()<1410) {
        if (!isInitProductSimilarSlider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': false,
                'dots': false,
                'slidesToShow': 4,
                'slidesToScroll': 1,
                'initialSlide': 0,
                'infinite': true,
                'adaptiveHeight': true,
                'responsive': [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2,
                            dots: true,
                        }
                    },
                    {
                        breakpoint: 1000,
                        settings: {
                            slidesToShow: 2,
                            dots: true,
                        }
                    },
                    {
                        breakpoint: 750,
                        settings: {
                            arrows: false,
                            vertical: false,
                            dots: true,
                            slidesToShow: 1,
                            initialSlide: 0,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
            isInitProductSimilarSlider = true;
        }
    } else {
        if (isInitProductSimilarSlider) {
            $(selector).slick('unslick');
            isInitProductSimilarSlider = false;
        }
    }
};

var isInitAlsoBuySlider = false;
initAlsoBuySlider = function() {
    selector = '.also-buy-slider';

    if (!isInitAlsoBuySlider) {
        $(selector).slick({
            'autoplay': false,
            'arrows': true,
            'dots': false,
            'slidesToShow': 4,
            'slidesToScroll': 1,
            'initialSlide': 1,
            'infinite': true,
            'adaptiveHeight': true,
            'appendArrows': $('.also-buy__frame'),
            'prevArrow': '<a href="#" class="prev also-buy__arrow" aria-label="Previous" type="button"></a>',
            'nextArrow': '<a href="#" class="next also-buy__arrow" aria-label="Next" type="button"></a>',
            'responsive': [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        arrows: false,
                        vertical: false,
                        dots: true,
                        slidesToShow: 1,
                        initialSlide: 1,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        arrows: false,
                        vertical: false,
                        dots: true,
                        slidesToShow: 1,
                        initialSlide: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
        isInitAlsoBuySlider = true;
    }

};


setClickableCatalogMenu = function() {
    var width = $(window).width();
    if (width<1000) {
        $('body').addClass('clickable-catalog-menu');
    } else {
        $('body').removeClass('clickable-catalog-menu');
    }
};

switchCatalogView = function() {
    var width = $(window).width();
    var switchElementToList = $('[data-tpl="1"]');
    var switchElementToGrid = $('[data-tpl="0"]');
    if (switchElementToList.length > 0) {
        if (switchElementToList.hasClass('active') && (width < 720)) {
            switchElementToGrid.trigger('click');
        }
    }
};

var doit;
$(window).resize(function(){
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
});

function resizedw(){
    var width = $(window).width();
    //console.log('Перестроить слайдеры');
    switchCatalogView();
    initCategorySlider();
    initMainSlider();
    initSlySpecial();
    initCollapseFilterBrand();
    initGalleryCardSlider();
    initAlsoBuySlider();
    initMainPartnersSlider();
    setClickableCatalogMenu();
    initProductSimilarSlider();
    initProductViewedSlider();
    initInnerPartnersSlider();
    initSidebarSlider();

}

$(document).scroll(function(){
    //setFixedHeader();
    var scrollTop = $(this).scrollTop();
    initUpButton(scrollTop);
});

initUpButton = function(scrollTop) {
    if (scrollTop > 200) {
        $('.to-top').fadeIn();
    } else {
        $('.to-top').fadeOut();
    }
}

