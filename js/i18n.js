/* ===================================================================
 * English copy, keyed by data-i18n.
 * Portuguese lives in index.html and is read from the page on load.
 * ------------------------------------------------------------------- */

window.I18N = {
    meta: {
        pt: {
            htmlLang: 'pt-BR',
            title: 'Raquel Melo — Motion, Broadcast Design & Código',
            description: 'Raquel Melo: mais de 10 anos de grafismo ao vivo na TV Globo. Motion design, sistemas de grafismo para transmissão e desenvolvimento web.'
        },
        en: {
            htmlLang: 'en',
            title: 'Raquel Melo — Motion, Broadcast Design & Code',
            description: 'Raquel Melo: 10+ years of live on-air graphics at TV Globo. Motion design, live broadcast graphics systems and web development.'
        }
    },

    en: {
        'nav.work': 'Work',
        'nav.process': 'Process',
        'nav.about': 'About',
        'nav.contact': 'Contact',

        'hero.eyebrow': 'Motion · Broadcast Design · Code',
        'hero.l1': 'On-air graphics',
        'hero.l2': 'that can’t miss.',
        'hero.lead': '10+ years of live on-air graphics at TV Globo, Brazil’s largest broadcaster. Now I also build the systems behind them.',
        'hero.ctaWork': 'See the work',
        'hero.ctaReel': 'Watch the showreel',

        'trust.label': 'My work has aired on',
        'trust.wc': 'FIFA World Cup',
        'trust.wwc': 'FIFA Women’s World Cup',
        'trust.elections': 'Brazilian Elections',

        'num.years': 'years live on TV',
        'num.states': 'states, 1 operator, 1 election night',
        'num.systems': 'in-house graphics systems',
        'num.install': 'installs: opens with a double-click',

        'work.eyebrow': 'Selected work',
        'work.title': 'From brief to air.',

        'card.open': 'View case',
        'card.new': 'New · in development',
        'card.liveDemo': 'Live HTML demo',

        'meta.role': 'Role',
        'meta.tools': 'Tools',
        'meta.runs': 'Runs on',
        'meta.anyBrowser': 'any browser source',
        'meta.scale': 'Scale',
        'meta.exports': 'Exports to',

        'case.problem': 'Problem',
        'case.solution': 'Solution',
        'case.impact': 'Impact',

        'fut.kicker': 'Personal project · 2026',
        'fut.role': 'Design, animation and development',
        'fut.value': 'A full match on air with a double-click.',
        'fut.c.problem': 'Smaller football broadcasts need a broadcaster-grade score, clock, match report, line-ups and credits — without a costly license, one specific piece of software, or someone typing the score and the report separately.',
        'fut.c.s1': 'The score is counted from the match report: every goal is an event with player and minute, so the two never disagree',
        'fut.c.s2': 'A per-period clock that runs into stoppage time — an event at 47 minutes of the first half shows as 45+2',
        'fut.c.s3': 'One event column per team, plus VAR, penalties, credits, stats and tables, all on keyboard shortcuts',
        'fut.c.s4': 'The graphics are a transparent web page: they go into OBS, vMix, SPX or any browser source',
        'fut.c.impact': 'A complete football graphics package that fits in one folder, opens with a double-click and ties the client to no vendor. In development, at version 0.2.',
        'fut.c.note': 'Recorded from the app’s own showcase, with fictional teams, players and league.',

        'apu.kicker': 'Elections 2026 · TV',
        'apu.value': '27 states. 1 operator. Zero typing.',
        'apu.role': 'System, business rules and operator training',
        'apu.scale': '27 states · 4 templates · ~4,800 lines of VBScript',
        'apu.c.problem': 'On election night, results change every minute across 27 states and several offices. Typing name, party, percentage and ballots counted into each graphic is slow — and one wrong number on air is seen by the whole country.',
        'apu.c.s1': 'A Viz Trio panel: the operator picks office and location, and lower thirds, full screens and maps come out filled with official data',
        'apu.c.s2': '4 graphic templates — lower third, voter-turnout screen, map of all 27 states and party map — plus Viz Pilot templates sharing the same rules',
        'apu.c.s3': 'Real-world rules: a Senate race with 2 winners becomes two lower thirds, runoffs, ties broken by absolute votes, and rehearsal data that never leaks to air',
        'apu.c.s4': 'A single PostgreSQL layer that audits every query, plus a manual and a one-page quick guide for the desk',
        'apu.c.impact': 'One operator covers 27 states without typing a single result. Red rows on air and green rows in preview show at a glance what the audience is seeing.',
        'apu.c.note': 'Results shown in the images are fictitious rehearsal data.',

        'volei.kicker': 'Personal project · v4',
        'volei.value': 'Broadcaster-grade graphics in one folder. On air in 30 seconds.',
        'volei.role': 'Design, animation and development',
        'volei.scale': '~3,700 lines · 0 dependencies · 11 modules',
        'volei.demoBug': 'SUPER RALLY',
        'volei.demoModule': 'SET POINT',
        'volei.demoHome': 'HOME',
        'volei.demoAway': 'AWAY',
        'volei.c.problem': 'Live volleyball graphics need a correct score, entries within seconds and zero install friction — the broadcast machine is borrowed and the network is closed. Off-the-shelf tools charge licenses, lock the graphics in a proprietary editor and, when they break, they break on air.',
        'volei.c.s1': 'A scoreboard with sets, partial scores, side switching and undo, plus 11 attached modules, 6 credit lower thirds and 3 animated bugs with sound',
        'volei.c.s2': 'A browser-based operator desk with shortcuts designed for both hands',
        'volei.c.s3': 'A zero-dependency Node server synced over Server-Sent Events: one-frame latency, no database, no cloud',
        'volei.c.s4': 'Typography measured in the browser and pixel-diff regression tests with Playwright — the tilde on “Ã” never clips again',
        'volei.c.impact': 'A broadcaster-grade graphics package that fits in one folder, starts in 30 seconds with a double-click and plugs into any switcher that accepts a web page.',
        'volei.c.note': 'The original graphics show real teams and athletes, so the card shows an HTML simulation with fictional teams.',

        'tarja.kicker': 'Personal software',
        'tarja.value': 'Animate in After Effects. Go live. Rebuild nothing.',
        'tarja.role': 'Product, design and development',
        'tarja.demoRole': 'Motion &amp; Broadcast Design',
        'tarja.c.problem': 'Designers animate the lower third in After Effects, but to go on air it is usually rebuilt in the playout system — doubling the work and losing animation detail along the way.',
        'tarja.c.s1': 'An After Effects script that reads Essential Graphics rigs and exports animation, text and alignment',
        'tarja.c.s2': 'A browser-based editor with a timeline, properties and warnings for safe area and overflowing text',
        'tarja.c.s3': 'A live operator panel and output for vMix and OBS; exports to HTML, SPX Graphics, CasparCG and NewBlue Captivate',
        'tarja.c.s4': 'A desktop app with ffmpeg video conversion, digitally signed licenses and protected code',
        'tarja.c.impact': 'The same piece leaves After Effects and goes on air in four different formats, with no rework. A licensable product, ready to sell.',

        'prece.kicker': 'Lyric video · Motion',
        'prece.role': 'Motion design and editing',
        'prece.value': 'The lyrics become the picture.',
        'prece.c.problem': 'For a song release, the video needed lyrics that were part of the narrative — not a caption laid over the picture.',
        'prece.c.s1': 'Kinetic typography synced to the voice, with key words highlighted in color',
        'prece.c.s2': 'Textures, particles and overlays that keep the song’s intimate tone',
        'prece.c.s3': 'Edited and finished, delivered ready for the streaming platforms',



        'process.eyebrow': 'How I work',
        'process.title': 'Four steps, no improvising on air.',
        'step1.t': 'Understand the operation',
        'step1.d': 'Who runs it, how fast, and what can never fail.',
        'step2.t': 'Design and animate',
        'step2.d': 'Figma and After Effects, with type measured to fit any name.',
        'step3.t': 'Build',
        'step3.d': 'HTML/CSS, Viz, JavaScript, Node and VBScript, wired straight to the data.',
        'step4.t': 'Test and deliver',
        'step4.d': 'Automated tests, rehearsal, manual and training.',

        'about.eyebrow': 'About',
        'about.title': 'A designer who codes. A developer who animates.',
        'about.p1': 'From drawing at UFRJ to audiovisual: 10+ years of live graphics at TV Globo. With a postgraduate degree in Full Stack and Software Engineering under way, I build the tools the operation needs.',
        'tl.1.when': 'May 2026 — present',
        'tl.1.what': 'Design & Visual Effects Producer I',
        'tl.2.when': 'Apr 2022 — Apr 2026',
        'tl.2.what': 'Broadcast Graphics Editor',
        'tl.3.when': 'May 2012 — Mar 2022',
        'tl.3.what': 'Broadcast Graphics Operator',

        'cta.eyebrow': 'Freelance · remote · EN / PT',
        'cta.title': 'Let’s get your project on air.',
        'cta.lead': 'Graphics for live streams and broadcasts, motion, and OBS and vMix overlays. Tell me what you need and when it goes live.',
        'cta.email': 'Send an email',
        'cta.tz': 'Rio de Janeiro · UTC−3',

        'tarja.badge': 'Licensable product · v2.0',
        'edu': 'Software Engineering (in progress) · Postgraduate in Full Stack Development · Audiovisual Production · Drawing, UFRJ',
        'footer.top': 'Back to top ↑'
    }
};
