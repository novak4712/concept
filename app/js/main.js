function nav() {
    $("nav ul li").mouseover(function () {
        $(this).find("ul:first").show();
    });
    $("nav ul li").mouseleave(function () {
        $("nav ul li ul").hide();
    });
    $("nav ul li ul").mouseleave(function () {
        $("nav ul li ul").hide();
    });



    $(".menu__icon").on("click", function () {
        $(this).closest(".menu").toggleClass("menu_state_open");
    });


    $(".menu__links").on('click', ".menu__links-item", function () {
        $(".menu__links-item").each(function () {
            $(this).removeClass("active-item-menu")
        });
        $(this).toggleClass("active-item-menu");
    });


    var menu = $(".nav-header");
    var width = $(window).width();



    $(window).scroll(function() {
        var top = $(this).scrollTop();
        if ( top >= 50 || width < 1200) {
            menu.css({
                'background': '#ffffff',
                'border-bottom':'1px solid #3b3b3b'
            });
        } else if ( top <= 50 || width > 1200) {
                menu.css({
                    'background': 'none',
                    'border-bottom':'none'
                });
        }
    });

}


function sliderDescription() {
    $("#description-slide").owlCarousel({
        items: 1,
        loop: true,
        nav:true,
        navText: ["<img src=\"img/slide-description-left.png\" alt=\"\">","<img src=\"img/slide-description-right.png\" alt=\"\">"]

    });
}
function sliderTop() {
    $("#top-slider").owlCarousel({
        items: 1,
        loop: true,
        nav:true,
        navText: ["<img src=\"img/slide-top-left.png\" alt=\"\">","<img src=\"img/slide-top-right.png\" alt=\"\">"]
    });
    var dots = $("#top-slider .owl-dot").length;
    var index = $("#top-slider .owl-dot.active").index() + 1;
    $('#top-slider .owl-dot:first-child').text(index + "/" + dots);

    $('.owl-next').click(function() {
        var index = $("#top-slider .owl-dot.active").index() + 1;
        $('#top-slider .owl-dot:first-child').text(index + "/" + dots);
    })

    $('.owl-prev').click(function() {
        var index = $("#top-slider .owl-dot.active").index() + 1;
        $('#top-slider .owl-dot:first-child').text(index + "/" + dots);
    })
}


$(document).ready(function () {
    nav();
    sliderDescription();
    sliderTop();
    new WOW().init();



});