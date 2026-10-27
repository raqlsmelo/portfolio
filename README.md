# Raquel Melo — Portfólio / Portfolio

🇧🇷 Portfólio de **Raquel Melo**: motion design, broadcast design e os sistemas de grafismo ao vivo por trás dele.
🇺🇸 Portfolio of **Raquel Melo**: motion design, broadcast design and the live graphics systems behind them.

Site estático, sem build e sem dependências. / Static site, no build step, no dependencies.

## Idiomas / Languages

Botão **PT | EN** no topo, idioma do navegador ou link direto com `?lang=en` / `?lang=pt`.
O português fica no `index.html`; o inglês fica em `js/i18n.js`, com as mesmas chaves `data-i18n`.

## Estrutura / Structure

- `index.html` — página e textos em português: hero com showreel, barra de clientes, números, projetos, processo, sobre e contato. Os cases completos ficam nos `<dialog class="case">` no fim do arquivo.
- `css/site.css` — visual escuro; cada projeto tem sua cor em `--accent`.
- `js/site.js` — idioma, animações de rolagem, vídeos que tocam só na tela, cases, lightbox e a demo do placar de vôlei.
- `js/i18n.js` — textos em inglês.
- `videos/showreel.mp4` — showreel do topo; `videos/projects/` — vídeos dos projetos.
- `images/projects/` — imagens e miniaturas dos cases.

## Adicionar um projeto / Adding a project

1. Mídias em `images/projects/<projeto>/` e `videos/projects/`.
2. Em `index.html`, copie um `<article class="card">` (a cor do projeto vai em `--accent`; `card--wide` deixa o card em largura total) e um `<dialog class="case">` com o mesmo `id` usado em `data-case`.
3. Dê uma chave `data-i18n` nova a cada texto e adicione o inglês em `js/i18n.js`.
