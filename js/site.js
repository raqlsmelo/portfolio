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

    $$('.card__open, .card__try').forEach(function (b) {
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


    /* Interactive volleyball desk (fictional teams)
     * Same shortcuts as the real Operação Vôlei desk.
     * ---------------------------------------------------- */
    (function volleyDesk() {
        var dialog = $('#volei-desk');
        if (!dialog) return;

        var TEXT = {
            pt: { setPoint: 'PONTO DO SET', matchPoint: 'PONTO DO JOGO', set: 'FIM DO {n}º SET', match: 'FIM DE JOGO',
                  rali: 'SUPER RALI', bloqueio: 'SUPER BLOQUEIO', ataque: 'SUPER ATAQUE',
                  logPoint: 'Ponto {t}: {h} × {a}', logSet: '{t} vence o {n}º set', logMatch: '{t} vence o jogo por {h} sets a {a}',
                  logUndo: 'Desfeito', logBoard: 'Placar {s}', on: 'no ar', off: 'fora do ar', logClear: 'Tudo fora do ar',
                  home: 'CASA', away: 'VISITANTE', logReset: 'Novo jogo', logNoSet: 'Para fechar o set, um time precisa estar na frente' },
            en: { setPoint: 'SET POINT', matchPoint: 'MATCH POINT', set: 'END OF SET {n}', match: 'FULL TIME',
                  rali: 'SUPER RALLY', bloqueio: 'SUPER BLOCK', ataque: 'SUPER ATTACK',
                  logPoint: 'Point {t}: {h} × {a}', logSet: '{t} wins set {n}', logMatch: '{t} wins the match {h} sets to {a}',
                  logUndo: 'Undone', logBoard: 'Scoreboard {s}', on: 'on air', off: 'off air', logClear: 'Everything off air',
                  home: 'HOME', away: 'AWAY', logReset: 'New match', logNoSet: 'To close the set, one team has to be ahead' }
        };

        function t(key, vars) {
            var lang = doc.getAttribute('lang') === 'en' ? 'en' : 'pt',
                str = TEXT[lang][key];
            Object.keys(vars || {}).forEach(function (k) { str = str.replace('{' + k + '}', vars[k]); });
            return str;
        }

        var el = {
            board: $('.js-desk-board', dialog), module: $('.js-desk-module', dialog),
            stage: $('.desk__stage', dialog), bug: $('.js-desk-bug-text', dialog),
            ph: $('.js-desk-pts-h', dialog), pa: $('.js-desk-pts-a', dialog),
            sh: $('.js-desk-sets-h', dialog), sa: $('.js-desk-sets-a', dialog),
            nh: $('.js-desk-name-h', dialog), na: $('.js-desk-name-a', dialog),
            ih: $('.js-desk-input-h', dialog), ia: $('.js-desk-input-a', dialog),
            log: $('.js-desk-log', dialog)
        };

        var state, history, bugTimer, flashTimer;

        function fresh() {
            return { h: 0, a: 0, setsH: 0, setsA: 0, board: true, over: false, flash: null };
        }

        function name(side) {
            var v = (side === 'h' ? el.ih : el.ia).value.trim().toUpperCase();
            return v || t(side === 'h' ? 'home' : 'away');
        }

        // volleyball: sets to 25 (the 5th to 15), best of 5
        function target() { return state.setsH + state.setsA === 4 ? 15 : 25; }

        function leader() { return state.h > state.a ? 'h' : state.a > state.h ? 'a' : null; }

        function moduleText() {
            if (state.flash) return state.flash;
            var lead = leader();
            if (!lead || state.over) return '';
            var pts = lead === 'h' ? state.h : state.a;
            if (pts < target() - 1) return '';
            var leadSets = lead === 'h' ? state.setsH : state.setsA;
            return leadSets === 2 ? t('matchPoint') : t('setPoint');
        }

        function render() {
            el.ph.textContent = state.h;
            el.pa.textContent = state.a;
            el.sh.textContent = state.setsH;
            el.sa.textContent = state.setsA;
            el.nh.textContent = name('h');
            el.na.textContent = name('a');
            el.ih.placeholder = t('home');
            el.ia.placeholder = t('away');
            var mod = moduleText();
            if (mod) el.module.textContent = mod;
            el.board.classList.toggle('has-module', !!mod && state.board);
            el.board.classList.toggle('is-off', !state.board);
        }

        function log(msg) { el.log.textContent = msg; }

        function save() {
            history.push(JSON.stringify(state));
            if (history.length > 50) history.shift();
        }

        function flash(text, ms) {
            state.flash = text;
            clearTimeout(flashTimer);
            flashTimer = setTimeout(function () { state.flash = null; render(); }, ms || 2600);
        }

        function point(side) {
            if (state.over) return;
            save();
            state[side]++;
            state.board = true;
            log(t('logPoint', { t: name(side), h: state.h, a: state.a }));
        }

        function bug(kind) {
            el.bug.textContent = t(kind);
            el.stage.classList.remove('has-bug');
            void el.stage.offsetWidth;   // restart the pop-in
            el.stage.classList.add('has-bug');
            clearTimeout(bugTimer);
            bugTimer = setTimeout(function () { el.stage.classList.remove('has-bug'); }, 2400);
        }

        var actions = {
            h: function () { point('h'); },
            a: function () { point('a'); },
            set: function () {
                var lead = leader();
                if (!lead || state.over) { log(t('logNoSet')); return; }
                save();
                var n = state.setsH + state.setsA + 1;
                if (lead === 'h') state.setsH++; else state.setsA++;
                state.h = 0;
                state.a = 0;
                if (state.setsH === 3 || state.setsA === 3) {
                    state.over = true;
                    flash(t('match'), 4000);
                    log(t('logMatch', { t: name(lead), h: Math.max(state.setsH, state.setsA), a: Math.min(state.setsH, state.setsA) }));
                } else {
                    flash(t('set', { n: n }));
                    log(t('logSet', { t: name(lead), n: n }));
                }
            },
            undo: function () {
                if (!history.length) return;
                state = JSON.parse(history.pop());
                state.flash = null;
                log(t('logUndo'));
            },
            board: function () {
                state.board = !state.board;
                log(t('logBoard', { s: state.board ? t('on') : t('off') }));
            },
            rali: function () { bug('rali'); },
            bloqueio: function () { bug('bloqueio'); },
            ataque: function () { bug('ataque'); },
            clear: function () {
                state.board = false;
                state.flash = null;
                el.stage.classList.remove('has-bug');
                log(t('logClear'));
            },
            reset: function () {
                state = fresh();
                history = [];
                log(t('logReset'));
            }
        };

        function run(act) {
            if (!actions[act]) return;
            actions[act]();
            render();
            var key = $('.desk__key[data-act="' + act + '"]', dialog);
            if (key) {
                key.classList.add('is-pressed');
                setTimeout(function () { key.classList.remove('is-pressed'); }, 160);
            }
        }

        var KEYS = { q: 'h', e: 'a', o: 'set', x: 'undo', '1': 'board', r: 'rali', b: 'bloqueio', a: 'ataque', ' ': 'clear', n: 'reset' };

        document.addEventListener('keydown', function (e) {
            if (!dialog.open || e.ctrlKey || e.metaKey || e.altKey) return;
            if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
            var act = KEYS[e.key.toLowerCase()];
            if (!act) return;
            e.preventDefault();
            run(act);
        });

        $$('.desk__key', dialog).forEach(function (b) {
            b.addEventListener('click', function () { run(b.dataset.act); });
        });

        [el.ih, el.ia].forEach(function (input) { input.addEventListener('input', render); });
        $$('.lang__btn').forEach(function (btn) { btn.addEventListener('click', render); });

        state = fresh();
        history = [];
        render();
    })();


    /* Footer year
     * ---------------------------------------------------- */
    $$('.js-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

})();
