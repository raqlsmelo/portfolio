# Raquel Melo — Portfólio / Portfolio

🇧🇷 Portfólio de **Raquel Melo**: motion design, broadcast design e os sistemas de grafismo ao vivo por trás dele.
🇺🇸 Portfolio of **Raquel Melo**: motion design, broadcast design and the live graphics systems behind them.

Site estático, sem build e sem dependências. / Static site, no build step, no dependencies.

## Identidade / Identity — RM/

- **Cores por função:** grafite `#111315` (fundo), off-white `#F2F0E9` (páginas editoriais), lime `#C6FF3D` (o que está ao vivo / ações), cobalt `#365CFF` (dados e links, só sobre off-white), vermelho tally `#FF4B3E` (só REC / ON AIR).
- **Tipografia:** Archivo condensada 800 (títulos, números, placares), Instrument Sans (leitura), JetBrains Mono (rótulos de sistema, timecode).
- **Linguagem:** códigos de projeto (RM—01), marcas de corte, fluxo de sinal, régua de timecode com playhead que acompanha a rolagem.
- **Movimento:** entra em corte, ease-out `cubic-bezier(.2,.7,.1,1)`, títulos sobem de uma máscara; nada fica em loop sem motivo, e tudo para com `prefers-reduced-motion`.

## Idiomas / Languages

Botão **PT | EN** no topo, idioma do navegador ou link direto com `?lang=en` / `?lang=pt`.
O português fica no `index.html`; o inglês fica em `js/i18n.js`, com as mesmas chaves `data-i18n`.

## Estrutura / Structure

- `index.html` — página e textos em português: barra de sistema, hero com monitor de programa, faixa "No ar em", projetos com filtro, cadeia de sinal, sobre e contato. Os cases completos ficam nos `<dialog class="case">` no fim do arquivo.
- `css/site.css` — a identidade RM/ inteira (tokens no `:root`).
- `js/site.js` — idioma, animações de rolagem, vídeos que tocam só na tela, cases, lightbox, a demo do placar de vôlei e a mesa de operação interativa (`#volei-desk`), com os mesmos atalhos da operação real.
- `js/i18n.js` — textos em inglês.
- `videos/showreel.mp4` — showreel do topo; `videos/projects/` — vídeos dos projetos.
- `images/projects/` — imagens e miniaturas dos cases.

## Adicionar um projeto / Adding a project

1. Mídias em `images/projects/<projeto>/` e `videos/projects/`.
2. Em `index.html`, copie um `<article class="card">` (`data-cats` com as disciplinas do filtro; `card--full`, `card--7` ou `card--5` para a largura) e um `<dialog class="case">` com o mesmo `id` usado em `data-case`.
3. Dê uma chave `data-i18n` nova a cada texto e adicione o inglês em `js/i18n.js`.
