# Portfólio — Ariane Archanjo

Portfólio profissional de Ariane Archanjo, desenvolvido como um site estático com identidade visual inspirada em interfaces desktop retrô.

[Acessar o portfólio](https://arianearchanjo.github.io/portifolio/)

## Páginas

- `index.html`: apresentação, navegação e contato
- `perfil.html`: perfil, competências e trajetória
- `setor-publico.html`: experiência e soluções para a gestão pública
- `projetos.html`: projetos independentes

## Funcionalidades

- layout responsivo para desktop, tablet e celular
- navegação por barra de tarefas e menu inicial
- carrossel de projetos com controles acessíveis
- painel de acessibilidade com tamanho de texto, alto contraste, redução de movimento e leitura em voz alta
- animações de entrada e relógio local
- HTML semântico e navegação por teclado

## Tecnologias

- HTML5
- CSS3
- JavaScript sem dependências de build
- Font Awesome 6.5.1
- Google Fonts: Pixelify Sans, Space Mono e VT323

## Estrutura

```text
.
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   ├── projects/
│   │   │   ├── project-1.png
│   │   │   ├── project-2.png
│   │   │   ├── project-3.png
│   │   │   └── project-4.png
│   │   ├── avatar-sticker.png
│   │   └── logo.png
│   └── js/
│       └── script.js
├── index.html
├── perfil.html
├── projetos.html
├── setor-publico.html
└── README.md
```

As páginas permanecem na raiz para preservar as URLs publicadas no GitHub Pages. Os arquivos estáticos ficam agrupados em `assets/` por tipo.

## Executar localmente

Não há etapa de instalação ou compilação. Abra `index.html` diretamente no navegador ou inicie um servidor HTTP na raiz do projeto, por exemplo:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Publicação

O projeto é compatível com GitHub Pages e usa somente caminhos relativos. A publicação pode ser configurada a partir da branch principal e da pasta raiz do repositório.
