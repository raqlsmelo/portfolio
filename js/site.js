/* ===================================================================
 * Raquel Melo — portfolio behaviour (no dependencies)
 * ------------------------------------------------------------------- */

(function () {

    "use strict";

    var doc = document.documentElement,
        reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        $ = function (sel, root) { return (root || document).querySelector(sel); },
        $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

    doc.classList.add('js');


    /* Intro: name reveal once per session
     * ---------------------------------------------------- */
    (function intro() {
        var seen = false;
        try { seen = sessionStorage.getItem('intro-seen') === '1'; } catch (e) {}
        if (seen || reduceMotion) return;

        doc.classList.add('js-intro');
        try { sessionStorage.setItem('intro-seen', '1'); } catch (e) {}
        setTimeout(function () { doc.classList.remove('js-intro'); }, 3300);
    })();


    /* Language (PT in the page, EN from js/i18n.js)
     * ---------------------------------------------------- */
    (function i18n() {
        var KEY = 'portfolio-lang',
            nodes = $$('[data-i18n]'),
            dict = (window.I18N && window.I18N.en) || {},
            meta = (window.I18N && window.I18N.meta) || {};

        nodes.forEach(function (el) { el.dataset.i18nPt = el.innerHTML; });

        function detect() {
            var fromUrl = (location.search.match(/[?&]lang=(pt|en)\b/) || [])[1];
            if (fromUrl) return fromUrl;
            try {
                var saved = localStorage.getItem(KEY);
                if (saved === 'pt' || saved === 'en') return saved;
            } catch (e) {}
            return (navigator.language || 'pt').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
        }

        function set(next) {
            nodes.forEach(function (el) {
                var html = next === 'en' ? dict[el.dataset.i18n] : el.dataset.i18nPt;
                if (html !== undefined) el.innerHTML = html;
            });
            if (meta[next]) {
                doc.setAttribute('lang', meta[next].htmlLang);
                document.title = meta[next].title;
                var d = $('meta[name="description"]');
                if (d) d.setAttribute('content', meta[next].description);
            }
            $$('.lang__btn').forEach(function (b) {
                var on = b.dataset.lang === next;
                b.classList.toggle('is-active', on);
                b.setAttribute('aria-pressed', on);
            });
            try { localStorage.setItem(KEY, next); } catch (e) {}
        }

        $$('.lang__btn').forEach(function (b) {
            b.addEventListener('click', function () { set(b.dataset.lang); });
        });

        set(detect());
    })();


    /* Header background after scrolling
     * ---------------------------------------------------- */
    (function header() {
        var h = $('.header');
        function update() { h.classList.toggle('is-scrolled', window.scrollY > 40); }
        window.addEventListener('scroll', update, { passive: true });
        update();
    })();


    /* Scroll-triggered reveals
     * ---------------------------------------------------- */
    (function reveals() {
        var hero = $('.hero');
        var items = $$('.reveal');

        if (reduceMotion || !('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('is-in'); });
            hero.classList.add('is-in');
            return;
        }

        // the hero title rises after the intro (or right away)
        setTimeout(function () { hero.classList.add('is-in'); }, doc.classList.contains('js-intro') ? 2700 : 150);

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        items.forEach(function (el) { io.observe(el); });
    })();


    /* Card videos play only while on screen
     * ---------------------------------------------------- */
    (function inviewVideos() {
        var videos = $$('video.js-inview');
        if (!videos.length) return;

        if (reduceMotion || !('IntersectionObserver' in window)) return;

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var v = entry.target;
                if (entry.isIntersecting) {
                    var p = v.play();
                    if (p && p.catch) p.catch(function () {});
                } else {
                    v.pause();
                }
            });
        }, { threshold: 0.35 });

        videos.forEach(function (v) { io.observe(v); });
    })();

    // the hero showreel is decorative: respect reduced motion
    if (reduceMotion) {
        var heroVideo = $('.hero__video');
        if (heroVideo) { heroVideo.removeAttribute('autoplay'); heroVideo.pause(); }
    }


    /* Dialogs: case studies and the showreel
     * ---------------------------------------------------- */
    function openDialog(d) {
        if (!d) return;
        if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
        doc.style.overflow = 'hidden';
    }

    function closeDialog(d) {
        $$('video', d).forEach(function (v) { v.pause(); });
        if (typeof d.close === 'function') d.close(); else d.removeAttribute('open');
    }

    $$('dialog').forEach(function (d) {
        d.addEventListener('close', function () {
            $$('video', d).forEach(function (v) { v.pause(); });
            doc.style.overflow = '';
        });
        // click on the backdrop closes
        d.addEventListener('click', function (e) { if (e.target === d) closeDialog(d); });
        $$('.case__close', d).forEach(function (b) {
            b.addEventListener('click', function () { closeDialog(d); });
        });
    });

    $$('.card__open').forEach(function (b) {
        b.addEventListener('click', function () { openDialog(document.getElementById(b.dataset.case)); });
    });

    $$('.js-reel').forEach(function (b) {
        b.addEventListener('click', function () {
            var reel = $('#reel');
            openDialog(reel);
            var v = $('video', reel), p = v.play();
            if (p && p.catch) p.catch(function () {});
        });
    });


    /* Lightbox for case galleries
     * ---------------------------------------------------- */
    (function lightbox() {
        var box = $('.lightbox'), img = $('img', box), caption = $('.lightbox__caption', box),
            list = [], index = 0;

        function show(i) {
            index = (i + list.length) % list.length;
            img.src = list[index].href;
            img.alt = list[index].alt;
            caption.textContent = list[index].alt + '  ·  ' + (index + 1) + ' / ' + list.length;
        }

        function close() { box.hidden = true; img.src = ''; }

        $$('.case__gallery').forEach(function (g) {
            var links = $$('a', g);
            links.forEach(function (a, i) {
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    list = links.map(function (l) { return { href: l.getAttribute('href'), alt: ($('img', l) || {}).alt || '' }; });
                    show(i);
                    box.hidden = false;
                });
            });
        });

        $('.lightbox__close', box).addEventListener('click', close);
        $('.lightbox__nav--prev', box).addEventListener('click', function () { show(index - 1); });
        $('.lightbox__nav--next', box).addEventListener('click', function () { show(index + 1); });
        box.addEventListener('click', function (e) { if (e.target === box) close(); });

        document.addEventListener('keydown', function (e) {
            if (box.hidden) return;
            if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
            if (e.key === 'ArrowLeft') show(index - 1);
            if (e.key === 'ArrowRight') show(index + 1);
        }, true);
    })();


    /* Volleyball scoreboard demo (fictional teams)
     * ---------------------------------------------------- */
    (function volleyDemo() {
        var vb = $('.vb');
        if (!vb) return;

        var stage = $('.vb-stage'),
            home = $('.js-vb-home'), away = $('.js-vb-away'),
            setsHome = $('.js-vb-sets-home');

        var steps = [
            { home: 23, away: 21 },
            { home: 23, away: 22 },
            { home: 24, away: 22, module: true },
            { home: 25, away: 22, module: true, bug: true },
            { home: 0,  away: 0,  setsHome: 2 },
            { home: 22, away: 21, setsHome: 1 }
        ];

        function show(s) {
            home.textContent = s.home;
            away.textContent = s.away;
            if (s.setsHome) setsHome.textContent = s.setsHome;
            vb.classList.toggle('has-module', !!s.module);
            stage.classList.toggle('has-bug', !!s.bug);
        }

        if (reduceMotion) { show({ home: 24, away: 22, module: true }); return; }

        var i = 0;
        setInterval(function () { show(steps[i]); i = (i + 1) % steps.length; }, 1600);
    })();


    /* Footer year
     * ---------------------------------------------------- */
    $$('.js-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

})();
