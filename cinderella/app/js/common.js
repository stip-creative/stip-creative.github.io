var carousel = $('.mainWrapper .carousel');
var overlayCarousel = $('.overlay .carousel');
var viewport = $('meta[name="viewport"]');
var menu = $('.menu');

function destroyCarousel() {
    if (carousel.hasClass('slick-initialized')) {
        carousel.slick('destroy');
    }      
    $(".carouselItem").removeAttr("tabindex");
    setTimeout(function() {
        $('.slick-list.draggable.slick-slide').remove()
    }, 100);
}

function initSlider () {
    destroyCarousel();
	carousel.slick({
        infinite: true,
        slidesToShow: 3,
        nextArrow: '.carousel-next',
        prevArrow: '.carousel-prev',
        responsive: [
            {
              breakpoint: 1320,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 1250,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 880,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
            {
                breakpoint: 610,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                }
              }
          ]
    });
    $('.carouselWrapper').removeClass('mobileCarouselWrapper');
    $('.carousel-next').removeClass('bigButton');
	$('.carousel-prev').removeClass('bigButton');
}

function initVerticaSlider () {
    destroyCarousel();
	carousel.slick({
		swipe: true,
		swipeToSlide: true,
		infinite: true,
		slidesToShow: 2,
		nextArrow: '.carousel-next',
        prevArrow: '.carousel-prev',
    });
    $('.carouselWrapper').addClass('mobileCarouselWrapper');
	$('.carousel-next').addClass('bigButton');
	$('.carousel-prev').addClass('bigButton');
}

function initHorizontaSlider () {
    destroyCarousel();
	carousel.slick({
		swipe: true,
		swipeToSlide: true,
		infinite: true,
        slidesToShow: 3,
        nextArrow: '.carousel-next',
        prevArrow: '.carousel-prev',
    });
    $('.carouselWrapper').removeClass('mobileCarouselWrapper');
    $('.carousel-next').removeClass('bigButton');
	$('.carousel-prev').removeClass('bigButton');
}

function initOverlaySlider () {
	overlayCarousel.slick({
		swipe: true,
		swipeToSlide: true,
		infinite: true,
		slidesToShow: 1,
		nextArrow: '.overlayCarouselBtn.next',
        prevArrow: '.overlayCarouselBtn.prev',
    });
    if (isMobileDevice()) {
        $('.overlay .carouselWrapper').addClass('mobileWrapper');
    }
}

function verticalView () {
    viewport.attr("content", 'width=1200,user-scalable=no');
    menu.addClass('horizontalMenu');
    initVerticaSlider();
}

function horizontalView () {
    viewport.attr("content", 'width=1350,user-scalable=no');
    menu.removeClass('horizontalMenu');
    initHorizontaSlider();
}

function isMobileDevice () {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
} 

function main () {
    if (!overlayCarousel.hasClass('slick-initialized')) initOverlaySlider();
    if (!isMobileDevice()) return initSlider();
    if (window.orientation !== 90 && window.orientation !== -90) {
        return verticalView();
    };
    return horizontalView();
}

$(document).ready(main);
$(window).on("orientationchange",main);

$(window).on("load",function() {
	$('.preloader').addClass('hidePreloader');
});

$(carousel).find(".carouselItem").on("click",function() {
    var slickIndex = $(this).data('slick-index');
    overlayCarousel.slick('slickGoTo', slickIndex, true);
	$(".overlay").addClass('show');
});

$(".overlay").on("click",function() {
	$(".overlay").removeClass('show');
});

$(".overlayCarouselBtn").on("click", function(e) {
    e.stopPropagation();
});
