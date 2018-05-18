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
                'background': '#ffffff'
            });
        } else if ( top <= 50 || width > 1200) {
                menu.css({
                    'background': 'none'
                });
        }
    });

}


function slider() {
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        nav:true,
        navText: ["<img src=\"img/slide-description-left.png\" alt=\"\">","<img src=\"img/slide-description-right.png\" alt=\"\">"]

    });
}



$(document).ready(function () {
    nav();
    slider();

    new WOW().init();
});