/* ===================================================================
 * Bilingual support (PT / EN)
 *
 * Portuguese text lives in index.html and is read from the page on load.
 * English text lives in the dictionary below, keyed by data-i18n.
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";

    var STORAGE_KEY = 'portfolio-lang';

    var meta = {
        pt: {
            htmlLang: 'pt-BR',
            title: 'Raquel Melo — Design, Motion & Desenvolvimento',
            description: 'Portfólio de Raquel Melo: mais de 10 anos de videografismo ao vivo na TV Globo, motion design, UX/UI e desenvolvimento web.'
        },
        en: {
            htmlLang: 'en',
            title: 'Raquel Melo — Design, Motion & Development',
            description: 'Portfolio of Raquel Melo: 10+ years of live broadcast graphics at TV Globo, motion design, UX/UI and web development.'
        }
    };

    var en = {
        'nav.intro': 'Hello!',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.works': 'Work',
        'nav.contact': 'Contact',

        'intro.hello': 'Hi! I\'m Raquel Melo.',
        'intro.title': 'Designer, <br> Motion Graphics <br> Artist & Passionate <br> <span class="intro-text__accent">Developer.</span>',
        'intro.lead': 'I turn information into images — from live on-air graphics at TV Globo to interfaces and websites that bring design and code together.',
        'intro.ctaWorks': 'See projects',
        'intro.ctaContact': 'Get in touch',
        'intro.scroll': 'Scroll for more',

        'hl.years': 'years of live broadcast graphics at TV Globo',
        'hl.eventsNumber': 'World Cups',
        'hl.events': 'men\'s and women\'s, plus Elections and Rock in Rio',
        'hl.degrees': 'degrees: Drawing (UFRJ), Audiovisual Production and a postgrad in Full Stack',
        'hl.learning': 'curiosity — currently studying Software Engineering',

        'about.heading': 'About me',
        'about.lead': 'I\'ve been working in audiovisual production for over 10 years, right where design, motion and technology meet. I hold a degree in Audiovisual Production, a postgraduate degree in Full Stack Web Development, and I\'m currently studying Software Engineering.',
        'about.p1': 'At TV Globo, Brazil\'s largest broadcaster, I design and operate real-time graphics for live broadcasts — Elections, the men\'s and women\'s FIFA World Cups, Rock in Rio, newscasts, variety shows and Big Brother Brasil (BBB).',
        'about.p2': 'My day-to-day toolkit includes Adobe (After Effects, Premiere, Photoshop, Illustrator), DaVinci Resolve, Chyron Lyric and Viz, plus Figma, WordPress and Elementor. I code in JavaScript, Python, Java and VBScript — languages I use to automate and build interfaces for the production systems I work with.',
        'about.p3': 'I love projects where I need to think like a designer and solve like a developer. If you have a challenge like that, let\'s talk.',

        'exp.heading': 'Work & Education',
        'exp.job1.time': 'April 2022 - Present',
        'exp.job1.role': 'Broadcast Graphics Editor',
        'exp.job1.desc': 'Animation and visual effects with After Effects, Premiere, Photoshop and Illustrator. Real-time graphics for live broadcasts with Chyron Lyric, Viz Artist and Viz Trio.',
        'exp.job2.time': 'May 2012 - March 2022',
        'exp.job2.role': 'Broadcast Graphics Operator',
        'exp.job2.desc': 'Created and operated graphics, animations and visual elements integrated into on-air content: infographics, logos, titles and transitions — keeping content informative, engaging and professionally presented.',

        'edu.se.time': 'In progress',
        'edu.se.title': 'Software Engineering',
        'edu.se.degree': 'Bachelor\'s degree',
        'edu.se.desc': 'Deepening my foundations in software engineering, architecture and quality to build more robust digital products.',
        'edu.pos.time': 'September 2022 - March 2023',
        'edu.pos.school': 'Anhanguera University',
        'edu.pos.degree': 'Postgraduate Degree in Full Stack Web Development',
        'edu.pos.desc': 'Web architecture, front-end and back-end frameworks, DevOps culture, big data and cloud computing integration, and managing development teams with industry best practices.',
        'edu.av.time': 'August 2016 - June 2020',
        'edu.av.school': 'Estácio University',
        'edu.av.degree': 'Bachelor\'s in Audiovisual Production',
        'edu.av.desc': 'End-to-end production of audiovisual programs: scriptwriting, location scouting and executive production.',
        'edu.ufrj.time': 'August 2004 - August 2009',
        'edu.ufrj.school': 'Federal University of Rio de Janeiro (UFRJ)',
        'edu.ufrj.degree': 'Teaching Degree in Art Education | Drawing',
        'edu.ufrj.desc': 'Plane and projective geometry and their application to different graphic representation techniques.',

        'skills.heading': 'Skills',
        'skills.desc': 'There\'s always something new to learn.',
        'skills.motion.title': 'Broadcast Graphics | Motion Design',
        'skills.motion.desc': 'Real-time graphics with Chyron Lyric and Viz for major events, newscasts and live shows.',
        'skills.adobe.title': 'Editing & Post-production',
        'skills.adobe.desc': 'Animation, compositing, editing and image retouching with advanced command of the Adobe suite.',
        'skills.dev.title': 'Full Stack Web Development',
        'skills.dev.desc': 'Front-end with HTML, CSS, JavaScript and React, plus applications and automations for production workflows.',
        'skills.ux.title': 'UX/UI & Prototyping',
        'skills.ux.desc': 'Interfaces designed for people working under pressure: Figma prototypes and websites built with WordPress and Elementor.',
        'skills.time.title': 'Time Management & Optimization',
        'skills.time.desc': 'Organizing and streamlining workflows — essential in live broadcasting, where every second counts.',
        'skills.learn.title': 'Continuous Learning',
        'skills.learn.desc': 'Passionate about new technologies and trends in design, development and audiovisual production.',

        'works.heading': 'Work',
        'works.desc': 'More motion, design and web work.',
        'projects.heading': 'Featured projects',
        'projects.desc': 'Live broadcast graphics systems I designed, animated and coded — from After Effects to air.',

        'apu.kicker': 'Elections 2026 · Broadcast',
        'apu.lead': 'A system that wires the vote-count database straight into the graphics that go on air. The operator picks an office and a location on a panel, and lower thirds, full screens and maps come out filled with official data — no manual typing.',
        'apu.f1': 'Viz Trio operator panel with 10 rows: red when on air, green when in preview',
        'apu.f2': '4 graphic templates: lower third, voter-turnout screen, map of all 27 states and party map',
        'apu.f3': 'Viz Pilot templates sharing the same rules, for the rundown system',
        'apu.f4': 'Real-world rules: a Senate race with 2 winners becomes two lower thirds, runoffs, ties broken by absolute votes, and rehearsal data that never leaks to air',
        'apu.f5': 'A single PostgreSQL layer with query auditing, plus manuals and a quick guide for the operators',
        'apu.s1': 'states',
        'apu.n2': '~4,800',
        'apu.s2': 'lines of VBScript',
        'apu.s3': 'operator',
        'apu.caption': 'Results shown in the images are fictitious rehearsal data — not official results.',

        'fut.badge': 'New',
        'fut.kicker': 'In development · 2026 · v0.2',
        'fut.lead': 'A live football operator interface built on the Operação Vôlei foundation. Score, clock, match report, line-ups and credits are run from a desk in the browser, and the graphics are a transparent web page that goes into any video software.',
        'fut.f1': 'Score counted from the match report: every goal is an event with player, minute, penalty or own goal, so the score and the report never disagree',
        'fut.f2': 'A per-period clock that starts at the right mark and keeps running into stoppage time — an event at 47 minutes of the first half shows as 45+2',
        'fut.f3': 'One event column per team: goal, yellow, red, substitution and penalty, with the player picked from the line-up',
        'fut.f4': 'VAR, penalty shoot-out and event modules, plus credits, stats, standings and fixtures',
        'fut.f5': 'Events leave the air on their own after a configurable time, X undoes the last event, and saved matches let the game be prepared ahead',
        'fut.s1': 'browser source over the video',
        'fut.s2': 'stoppage time counted automatically',
        'fut.s3': 'undoes the last event',
        'fut.caption': 'The system\'s real graphics, recorded from the app\'s own showcase with a fictional match and league. Click the images to enlarge.',
        'volei.kicker': 'Personal project · 2026 · v4.1',
        'volei.lead': 'A complete live graphics system for volleyball — artwork, match logic and operator desk — written from scratch in HTML, CSS and JavaScript and shipped as a single executable. The graphics are web pages with a transparent background, so the system is platform-agnostic: it goes on air through any switcher or playout that accepts a web page as a source.',
        'volei.platforms': 'Runs on',
        'volei.platformsAny': '+ any web page source',
        'volei.f1': 'Scoreboard with sets, partial scores, side switching and undo, plus 11 modules that attach to it',
        'volei.f2': '6 credit lower thirds, full-screen tables and 3 animated bugs with sound',
        'volei.f3': 'Browser-based operator desk with two-handed keyboard shortcuts — plus direct control through the API on vMix',
        'volei.f4': 'Typography measured in the browser and pixel-diff regression tests with Playwright',
        'volei.f5': 'Zero-dependency Node server synced over Server-Sent Events, packaged as an .exe that runs with no install',
        'volei.n1': '~3,700',
        'volei.s1': 'lines of code',
        'volei.s2': 'production dependencies',
        'volei.s3': 'scoreboard modules',
        'volei.caption': 'An HTML/CSS simulation with fictional teams: the scoreboard takes points from the desk shortcuts, shows the set-point module and the animated bug.',
        'volei.demoBug': 'SUPER RALLY',
        'volei.demoModule': 'SET POINT',
        'volei.demoHome': 'HOME',
        'volei.demoAway': 'AWAY',
        'volei.keyHome': 'home point',
        'volei.keyAway': 'away point',
        'volei.keySet': 'close set',
        'volei.keyOut': 'take out',

        'feat.kicker': 'Personal software · 2026',
        'feat.s1': 'export formats',
        'feat.s2': 'closed source, licensed',
        'feat.s3': 'runs with no install',
        'feat.lead': 'Software I built to take After Effects graphics straight to air. Designers animate in After Effects; Tarja turns the piece into HTML and runs it live.',
        'feat.f1': 'After Effects script that reads Essential Graphics rigs and exports animation, text and alignment',
        'feat.f2': 'Browser-based editor with a timeline, properties panel and warnings for safe area and overflowing text',
        'feat.f3': 'Live operator panel and output for vMix and OBS',
        'feat.f4': 'Exports to HTML, SPX Graphics, CasparCG and NewBlue Captivate',
        'feat.f5': 'Desktop app with ffmpeg video conversion, digitally signed licenses and automated tests',
        'feat.demoRole': 'Designer &amp; Developer',
        'feat.caption': 'A lower third animated with nothing but HTML and CSS — the kind of piece Tarja Studio produces.',
        'works.filter.all': 'All',
        'works.filter.motion': 'Motion & Video',
        'works.filter.brand': 'Branding',
        'works.filter.web': 'Web',
        'works.gabi.title': 'Set Designer — Logo & Website',
        'works.gabi.caption': 'Logo design and portfolio website.',
        'works.estudio.title': 'Logo Board',
        'works.estudio.cat': 'Estúdio Escola de TV — Illustrator | Photoshop',
        'works.estudio.caption': 'Logo and visual identity for print and digital.',

        'contact.heading': 'Shall we create something together?',
        'contact.desc': 'Open to new projects, partnerships and opportunities — in Brazil or abroad. <a href="mailto:raqlsmelo@gmail.com">Send me an email</a>.',
        'contact.phone': 'Phone / WhatsApp',
        'contact.online': 'Online'
    };

    var $nodes = $('[data-i18n]');

    // keep the original Portuguese markup so we can switch back
    $nodes.each(function() {
        $(this).data('i18n-pt', $(this).html());
    });

    function storedLang() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }

    function detectLang() {
        var fromUrl = (window.location.search.match(/[?&]lang=(pt|en)\b/) || [])[1];
        if (fromUrl) return fromUrl;

        var saved = storedLang();
        if (saved === 'pt' || saved === 'en') return saved;

        var browser = (navigator.language || 'pt').toLowerCase();
        return browser.indexOf('pt') === 0 ? 'pt' : 'en';
    }

    function setLang(lang) {
        $nodes.each(function() {
            var $el = $(this),
                key = $el.data('i18n'),
                html = lang === 'en' ? en[key] : $el.data('i18n-pt');

            if (html !== undefined) $el.html(html);
        });

        document.documentElement.setAttribute('lang', meta[lang].htmlLang);
        document.title = meta[lang].title;
        $('meta[name="description"]').attr('content', meta[lang].description);

        $('.lang-switch__btn').each(function() {
            var active = $(this).data('lang') === lang;
            $(this).toggleClass('is-active', active).attr('aria-pressed', active);
        });

        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

        // let other components (e.g. masonry) react to the new text sizes
        $(document).trigger('i18n:change', [lang]);
    }

    $('.lang-switch__btn').on('click', function() {
        setLang($(this).data('lang'));
    });

    setLang(detectLang());

})(jQuery);
