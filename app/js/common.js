$(document).ready(function(){
//zoom product image BEGIN
    $('.zoom').zoom();
//zoom product image END

//rating stars BEGIN
    $('.rateYo').rateYo({
        starSvg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"11\" height=\"10\" viewBox=\"0 0 11 10\"><g><g><path d=\"M5.668 0L7.425 3.14 11 3.82 8.511 6.438l.452 3.561-3.295-1.524-3.294 1.524.451-3.561L.338 3.819l3.573-.678L5.668 0\"/></g></g></svg>",
        spacing: "5px",
        readOnly: true,
        starWidth: "11px",
        ratedFill: "#ffdc2c"
    }).on("rateyo.change", function(e, data) {
        var rating = data.rating;
        $(this).parent().find('.rated').text(rating);
    });
//rating stars END

//slider BEGIN
    $('.js-slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrow: true
    });
//slider END

// show-more BEGIN
    $('.js-show-more').click(function () {
        var btnTitle = this;
        $(this).toggleClass(' active');
        $(this).siblings('.hidden-block').slideToggle(300, function () {
            if ($(this).css('display') == 'block') {
                $(btnTitle).text($(btnTitle).data('change-title'));
            }
            else {
                $(btnTitle).text($(btnTitle).data('title'));
            }
        });
    });
// show-more END

// show-more comment BEGIN
    $('.js-show-more-comment').click(function () {
        var commentWrap = $(this).siblings('.comments__text');
        $(this).toggleClass(' active', 1000, 'easeOutSine');
        $(commentWrap).toggleClass(' show', 1000, 'easeOutSine');
    });
// show-more comment END

// custom-select BEGIN
    $('.js-select').styler();
// custom-select END

// lightbox image BEGIN
    $('.js-image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });
// lightbox image END

// include video BEGIN
    $('.js-popup-youtube, .js-popup-vimeo, .js-popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
// include video END

});