/* ===================================================================
 * Epitome - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : ''   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    var ssPreloader = function() {
        
        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');
        
        });
    };


   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var ssMenuOnScrolldown = function() {
        
        var hdr = $('.s-header'),
            hdrTop = $('.s-header').offset().top;

        $WIN.on('scroll', function() {

            if ($WIN.scrollTop() > hdrTop) {
                hdr.addClass('sticky');
            }
            else {
                hdr.removeClass('sticky');
            }

        });
    };


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    var ssMobileMenu = function() {

        var toggleButton = $('.header-menu-toggle'),
            nav = $('.header-nav-wrap');

        toggleButton.on('click', function(event){
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function() {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle(); 
            }
        });

    };

   /* Highlight the current section in the navigation bar
    * ------------------------------------------------------ */
    var ssWaypoints = function() {

        var sections = $(".target-section"),
            navigation_links = $(".header-main-nav li a");

        sections.waypoint( {

            handler: function(direction) {

                var active_section;

                active_section = $('section#' + this.element.id);

                if (direction === "up") active_section = active_section.prevAll(".target-section").first();

                var active_link = $('.header-main-nav li a[href="#' + active_section.attr("id") + '"]');

                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");

            },

            offset: '25%'

        });
        
    };


   /* Masonry
    * ---------------------------------------------------- */ 
    var ssMasonryFolio = function () {
        
        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick:not(.is-hidden)',
                resize: true
            });
        });

        // re-layout when the language changes the height of the cards
        $(document).on('i18n:change', function() {
            if (containerBricks.data('masonry')) containerBricks.masonry('layout');
        });

    };


   /* Works filter
    * ---------------------------------------------------- */
    var ssWorksFilter = function() {

        var containerBricks = $('.masonry'),
            buttons = $('.works-filter__btn');

        buttons.on('click', function() {
            var filter = $(this).data('filter');

            buttons.removeClass('is-active');
            $(this).addClass('is-active');

            $('.masonry__brick').each(function() {
                var categories = ($(this).data('category') || '').split(' '),
                    visible = filter === '*' || categories.indexOf(filter) !== -1;

                $(this).toggleClass('is-hidden', !visible);
            });

            if (containerBricks.data('masonry')) {
                containerBricks.masonry('reloadItems').masonry('layout');
            }
        });

    };


   /* photoswipe
    * ----------------------------------------------------- */
    var ssPhotoswipe = function() {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio').has('.thumb-link');

        // get items
        $folioItems.each( function(i) {

            var $folio = $(this),
                $thumbLink =  $folio.find('.thumb-link'),
                $title = $folio.find('.item-folio__title'),
                $caption = $folio.find('.item-folio__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width  = $size[0],
                $height = $size[1];
        
            var item = {
                src  : $href,
                w    : $width,
                h    : $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        // bind click event
        $folioItems.each(function(i) {

            $(this).find('.thumb-link').on('click', function(e) {
                e.preventDefault();
                var options = {
                    index: i,
                    showHideOpacity: true
                }

                // initialize PhotoSwipe
                var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });
    };


   /* Project galleries (lightbox per project)
    * ----------------------------------------------------- */
    var ssProjectGalleries = function() {
        var $pswp = $('.pswp')[0];

        $('.featured').each(function() {
            var $links = $(this).find('.js-pswp'),
                items = [];

            $links.each(function() {
                var size = $(this).data('size').split('x');
                items.push({
                    src   : $(this).attr('href'),
                    w     : size[0],
                    h     : size[1],
                    title : $(this).attr('title')
                });
            });

            $links.each(function(i) {
                $(this).on('click', function(e) {
                    e.preventDefault();
                    var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, { index: i, showHideOpacity: true });
                    lightBox.init();
                });
            });
        });
    };


   /* Autoplay muted project videos only while they are on screen
    * ----------------------------------------------------- */
    var ssAutoplayVideos = function() {
        var videos = document.querySelectorAll('video.js-autoplay'),
            reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!videos.length || reduceMotion || !('IntersectionObserver' in window)) {
            Array.prototype.forEach.call(videos, function(v) { v.controls = true; });
            return;
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                var video = entry.target;
                if (entry.isIntersecting) {
                    var playing = video.play();
                    if (playing && playing.catch) playing.catch(function() { video.controls = true; });
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.4 });

        Array.prototype.forEach.call(videos, function(v) { observer.observe(v); });
    };


   /* Volleyball scoreboard demo (fictional teams)
    * ----------------------------------------------------- */
    var ssScoreDemo = function() {
        var $vb = $('.vb');
        if (!$vb.length) return;

        var $home = $('.js-vb-home'), $away = $('.js-vb-away'),
            $setsHome = $('.js-vb-sets-home'), $setsAway = $('.js-vb-sets-away'),
            $stage = $('.vb-stage'),
            reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // each step: key pressed, then the resulting state
        var steps = [
            { key: 'q', home: 23, away: 21 },
            { key: 'e', home: 23, away: 22 },
            { key: 'q', home: 24, away: 22, module: true },
            { key: 'q', home: 25, away: 22, module: true, bug: true },
            { key: 'o', home: 0,  away: 0,  setsHome: 2 },
            { key: null, home: 22, away: 21, setsHome: 1 }
        ];

        function show(step) {
            $('.vb-key').removeClass('is-pressed');
            if (step.key) $('.js-vb-key-' + step.key).addClass('is-pressed');

            $home.text(step.home);
            $away.text(step.away);
            if (step.setsHome) $setsHome.text(step.setsHome);
            $setsAway.text(1);

            $vb.toggleClass('has-module', !!step.module);
            $stage.toggleClass('has-bug', !!step.bug);
        }

        if (reduceMotion) {
            show({ key: null, home: 24, away: 22, module: true });
            return;
        }

        var i = 0;
        setInterval(function() {
            show(steps[i]);
            i = (i + 1) % steps.length;
        }, 1600);
    };


   /* slick slider
    * ------------------------------------------------------ */
    var ssSlickSlider = function() {
        
        $('.testimonials__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            fade: true,
            cssEase: 'linear'
        });
    };


   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* Alert Boxes
    * ------------------------------------------------------ */
    var ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };


   /* Animate On Scroll
    * ------------------------------------------------------ */
    var ssAOS = function() {
        
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };


   /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {

        ssPreloader();
        ssMenuOnScrolldown();
        ssMobileMenu();
        ssWaypoints();
        ssMasonryFolio();
        ssWorksFilter();
        ssPhotoswipe();
        ssProjectGalleries();
        ssAutoplayVideos();
        ssScoreDemo();
        ssSlickSlider();
        ssSmoothScroll();
        ssAlertBoxes();
        ssAOS();

        $('.js-year').text(new Date().getFullYear());

    })();

})(jQuery);