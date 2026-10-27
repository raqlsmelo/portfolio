# Raquel Melo — Portfólio / Portfolio

🇧🇷 Portfólio pessoal de **Raquel Melo** — designer, videografista e desenvolvedora.
Mais de 10 anos de videografismo ao vivo na TV Globo, motion design, UX/UI e desenvolvimento web.

🇺🇸 Personal portfolio of **Raquel Melo** — designer, motion graphics artist and developer.
10+ years of live broadcast graphics at TV Globo, motion design, UX/UI and web development.

## Idiomas / Languages

O site é bilíngue (PT/EN). O idioma é escolhido pelo botão **PT | EN** no topo, pelo idioma
do navegador ou pelo link `?lang=en` / `?lang=pt`.

The site is bilingual (PT/EN). Pick the language with the **PT | EN** switch in the header,
or link directly with `?lang=en` / `?lang=pt`.

## Como adicionar um projeto / Adding a project

1. Coloque as imagens em `images/portfolio/`.
2. Em `index.html`, copie um bloco `masonry__brick` da seção `#works` e ajuste:
   - `data-category`: `motion`, `ui`, `brand` e/ou `web` (separados por espaço);
   - `href` e `data-size` (largura x altura) da imagem grande, e `src` da miniatura;
   - os textos em português, cada um com uma chave `data-i18n` nova.
3. Adicione a tradução em inglês dessas chaves em `js/i18n.js`.

## Estrutura / Structure

- `index.html` — página (texto em português)
- `js/i18n.js` — traduções em inglês e troca de idioma
- `js/main.js` — menu, masonry, filtros de trabalhos, lightbox
- `css/custom.css` — estilos novos sobre o template (`css/main.css`)
