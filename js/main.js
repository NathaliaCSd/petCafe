(function ($) {
    "use strict";
    //menu
    var windows = $(window);
    var stick = $(".header-sticky");
    windows.on('scroll', function () {
        var scroll = windows.scrollTop();
        if (scroll < 245) {
            stick.removeClass("sticky");
        } else {
            stick.addClass("sticky");
        }
    });



    //slider carousel
    $(".slider-wrapper").owlCarousel({
        loop:true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 2500,
        items: 1,
        nav: true,
        navText: ["<i class='zmdi zmdi-chevron-left'></i>", "<i class=' zmdi zmdi-chevron-right'></i>"],
        dots: true,
        responsive: {
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    //testiomonial carousel
    $('.testimonial-carousel').owlCarousel({
        loop: true,
        margin: 0,
        dots: true,
        nav:false,
        animateOut: 'slideOutDown',
        animateIn: 'slideInDown',
        autoplay: false,
        smartSpeed: 3000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    //blog carousel
    $(".blog-carousel").owlCarousel({
        loop: true,
        items:3,
        dots: false,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            480:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });

    //JQuery meanMenu
    $('.main-menu nav').meanmenu({
        meanScreenWidth: "991",
        meanMenuContainer: '.mobile-menu'
    });

    //Mail Chimp
    $('#mc-form').ajaxChimp({
        language: 'en',
        callback: mailChimpResponse,
        url: 'http://blahblah.us1.list-manage.com/subscribe/post?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh9'
    })

    function mailChimpResponse(resp){
        if(resp.result == 'success'){
            $('.mailchimp-success').html(''+resp.msg).fadeIn(900);
            $('.mailchimp-error').fadeOut(400);
        }else if(resp.result == 'error'){
            $('.mailchimp-error').html(''+resp.msg).fadeIn(900);
        }
    }

    //counter up 
    $('.counter').counterUp({
        delay: 70,
        time:5000
    });


    //scrollUp
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    new WOW().init();

    $('.datepicker').datepicker();

})(jQuery);