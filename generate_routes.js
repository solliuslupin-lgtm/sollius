const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexHtmlPath = path.join(rootDir, 'index.html');
const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Load Games Database for Static Pre-Rendering & Schema
let gamesCode = fs.readFileSync(path.join(rootDir, 'games_data.js'), 'utf8')
  .replace(/^\uFEFF/, '')
  .replace('const SOLLIUS_GAMES_DATABASE =', 'global.SOLLIUS_GAMES_DATABASE =');
eval(gamesCode);

// Ensure 404.html matches index.html
fs.writeFileSync(path.join(rootDir, '404.html'), baseHtml, 'utf8');
console.log('Generated 404.html');

const ROUTES = [
  {
    tab: 'remover',
    folder: 'remover-fundo',
    path: '/remover-fundo',
    title: 'Removedor de Fundo com IA Grátis e Ilimitado | SOLLIUS',
    desc: 'Remova o fundo de qualquer imagem automaticamente sem enviar fotos para servidores. Processamento 100% local, seguro e gratuito.',
    schemaType: 'DesignApplication',
    ratingCount: '1540'
  },
  {
    tab: 'curriculo',
    folder: 'curriculo-ats',
    path: '/curriculo-ats',
    title: 'Criador de Currículos Padrão ATS Gratuito | SOLLIUS',
    desc: 'Crie currículos modernos aprovados por robôs de RH (Gupy, Workday) com formatação A4 perfeita e acessibilidade visual.',
    schemaType: 'BusinessApplication',
    ratingCount: '2190'
  },
  {
    tab: 'cartao',
    folder: 'cartao-de-visita',
    path: '/cartao-de-visita',
    title: 'Criador de Cartão de Visita de Elite com QR Code | SOLLIUS',
    desc: 'Crie artes gráficas de frente e verso com temas de luxo em 300 DPI e QR Code automático integrado.',
    schemaType: 'DesignApplication',
    ratingCount: '980'
  },
  {
    tab: 'assinar-pdf',
    folder: 'assinar-pdf',
    path: '/assinar-pdf',
    title: 'Assinar PDF no Navegador 100% Privado | SOLLIUS',
    desc: 'Assine contratos e procurações diretamente no seu computador sem enviar documentos para a nuvem.',
    schemaType: 'UtilitiesApplication',
    ratingCount: '3420'
  },
  {
    tab: 'limpar-gps',
    folder: 'limpar-gps',
    path: '/limpar-gps',
    title: 'Limpador de GPS & Metadados EXIF de Fotos | SOLLIUS',
    desc: 'Elimine coordenadas de GPS e dados de identificação da câmera de suas fotos antes de publicar na web.',
    schemaType: 'SecurityApplication',
    ratingCount: '870'
  },
  {
    tab: 'converter',
    folder: 'compressor-imagem',
    path: '/compressor-imagem',
    title: 'Compressor & Conversor de Imagens em Lote WebP | SOLLIUS',
    desc: 'Comprima e converta imagens para WebP, PNG e JPG reduzindo até 90% do tamanho com download em ZIP.',
    schemaType: 'UtilitiesApplication',
    ratingCount: '4120'
  },
  {
    tab: 'pdf',
    folder: 'pdf-studio',
    path: '/pdf-studio',
    title: 'PDF Studio: Juntar PDFs e Fotos para PDF | SOLLIUS',
    desc: 'Mescle múltiplos PDFs e boletos em ordem ou transforme imagens em PDF único de graça sem filas.',
    schemaType: 'UtilitiesApplication',
    ratingCount: '2860'
  },
  {
    tab: 'tags',
    folder: 'gerador-tags-virais',
    path: '/gerador-tags-virais',
    title: 'Gerador de Tags Virais & Click Magnet para YouTube e TikTok | SOLLIUS',
    desc: 'Gere tags otimizadas para o YouTube Studio, fórmulas de títulos de alto clique e hashtags para TikTok.',
    schemaType: 'SocialNetworkingApplication',
    ratingCount: '1650'
  },
  {
    tab: 'qrcode',
    folder: 'gerador-qrcode',
    path: '/gerador-qrcode',
    title: 'Gerador de QR Code Pro Vitalício sem Expiração | SOLLIUS',
    desc: 'Crie QR Codes personalizados para Pix, links, WhatsApp e Wi-Fi que nunca expiram e sem mensalidade.',
    schemaType: 'UtilitiesApplication',
    ratingCount: '1980'
  },
  {
    tab: 'texto',
    folder: 'formatador-texto',
    path: '/formatador-texto',
    title: 'Text Studio: Contador e Limpador de Linhas | SOLLIUS',
    desc: 'Remova linhas duplicadas, conte caracteres e palavras e formate textos online com 1 clique.',
    schemaType: 'UtilitiesApplication',
    ratingCount: '730'
  },
  {
    tab: 'recorder',
    folder: 'gravador-de-tela',
    path: '/gravador-de-tela',
    title: 'Gravador de Tela e Áudio Gratuito sem Instalação | SOLLIUS',
    desc: 'Grave sua tela, gameplay ou tutoriais com microfone e áudio interno direto pelo navegador.',
    schemaType: 'MultimediaApplication',
    ratingCount: '1430'
  },
  {
    tab: 'transcritor',
    folder: 'transcritor-de-audio',
    path: '/transcritor-de-audio',
    title: 'Transcritor de Voz IA com Contexto & Sugestões de Dúvidas | SOLLIUS',
    desc: 'Transcreva gravações, podcasts e reuniões de até 2 horas com detecção inteligente de palavras duvidosas, compreensão de tema e exportação SRT.',
    schemaType: 'AudioApplication',
    ratingCount: '1280'
  },
  {
    tab: 'office',
    folder: 'conversor-documentos',
    path: '/conversor-documentos',
    title: 'Conversor Office & PDF Studio (Word & Excel) Gratuito | SOLLIUS',
    desc: 'Converta planilhas Excel (XLSX, CSV) e documentos Word (DOCX) em PDF A4, JSON e HTML 100% no navegador sem instalar programas.',
    schemaType: 'OfficeApplication',
    ratingCount: '1120'
  },
  {
    tab: 'jogos',
    folder: 'jogos',
    path: '/jogos',
    title: 'Jogos Online Grátis no Navegador | SOLLIUS Games Arcade',
    desc: 'Jogue +40 jogos online grátis sem download nem cadastro no celular e PC. Corrida 3D, Motos, Ação FPS, Puzzles, Retrô e Esportes instantâneos.',
    schemaType: 'GameApplication',
    ratingCount: '4890'
  }
];

function buildStaticGamesGridHtml() {
  return SOLLIUS_GAMES_DATABASE.map(g => {
    return `
      <div class="game-card" role="button" tabindex="0" onclick="openGamePlayer('${g.id}')" aria-label="Jogar ${g.title}">
        <div class="game-thumb-wrapper">
          <img src="${g.thumb}" alt="${g.title}" class="game-thumb-img" loading="lazy" width="512" height="384" onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80'">
          <span class="game-card-badge">${g.categoryLabel.split(' ')[0]} ${g.category.toUpperCase()}</span>
          <button class="game-card-fav-btn" onclick="toggleGameFavorite('${g.id}', event)" title="Salvar nos Favoritos" aria-label="Favoritar">
            🤍
          </button>
        </div>
        <div class="game-info">
          <h3 class="game-title" title="${g.title}">${g.title}</h3>
          <div class="game-meta-row">
            <span>⭐ ${g.rating} (${g.plays})</span>
            <span>⚡ 100% Grátis</span>
          </div>
          <p class="tool-desc" style="font-size: 0.82rem; margin-bottom: 0.75rem; -webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;">
            ${g.desc}
          </p>
          <button class="game-play-btn" onclick="openGamePlayer('${g.id}')">
            <span>▶ Jogar Agora</span>
          </button>
        </div>
      </div>`;
  }).join('\n');
}

function buildGamesJsonLd() {
  const items = SOLLIUS_GAMES_DATABASE.map((g, idx) => ({
    "@type": "ListItem",
    "position": idx + 1,
    "item": {
      "@type": "VideoGame",
      "name": g.title,
      "description": g.desc,
      "image": g.thumb,
      "url": `https://sollius.com.br/jogos#${g.id}`,
      "gamePlatform": ["Web Browser", "Mobile Phone", "Tablet", "PC"],
      "applicationCategory": "GameApplication",
      "genre": g.categoryLabel,
      "playMode": "SinglePlayer",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "BRL"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": g.rating,
        "ratingCount": "850",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  }));

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://sollius.com.br/jogos/#collection",
        "url": "https://sollius.com.br/jogos",
        "name": "Jogos Online Grátis no Navegador | SOLLIUS Games Arcade",
        "description": "Jogue +40 jogos online grátis sem download nem cadastro no celular e PC. Corrida 3D, Motos, Ação FPS, Puzzles, Retrô e Esportes instantâneos.",
        "inLanguage": "pt-BR"
      },
      {
        "@type": "ItemList",
        "@id": "https://sollius.com.br/jogos/#catalog",
        "name": "Catálogo Completo SOLLIUS Games Arcade",
        "numberOfItems": SOLLIUS_GAMES_DATABASE.length,
        "itemListElement": items
      }
    ]
  }, null, 2);
}

function buildToolJsonLd(r) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://sollius.com.br${r.path}/#webpage`,
        "url": `https://sollius.com.br${r.path}`,
        "name": r.title,
        "description": r.desc,
        "inLanguage": "pt-BR"
      },
      {
        "@type": "SoftwareApplication",
        "@id": `https://sollius.com.br${r.path}/#app`,
        "name": r.title.split('|')[0].trim(),
        "url": `https://sollius.com.br${r.path}`,
        "applicationCategory": r.schemaType || "UtilitiesApplication",
        "operatingSystem": "All Web Browsers (Chrome, Edge, Safari, Firefox, Android, iOS)",
        "browserRequirements": "Requires HTML5 & JavaScript.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "BRL"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": r.ratingCount || "1200",
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    ]
  }, null, 2);
}

for (const r of ROUTES) {
  const dir = path.join(rootDir, r.folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let html = baseHtml;
  // Replace title
  html = html.replace(/<title>.*?<\/title>/, `<title>${r.title}</title>`);
  // Replace meta description
  html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${r.desc}">`);
  // Replace canonical
  html = html.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="https://sollius.com.br${r.path}">`);
  // Replace og:url
  html = html.replace(/<meta property="og:url" content=".*?">/, `<meta property="og:url" content="https://sollius.com.br${r.path}">`);
  // Replace og:title
  html = html.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${r.title}">`);
  // Replace og:description
  html = html.replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${r.desc}">`);
  // Replace body to set data-initial-tab
  html = html.replace('<body>', `<body data-initial-tab="${r.tab}">`);

  // ========================================================
  // CRITICAL SEO FIX 1: HIDE TAB-HUB & SHOW TARGET TAB STATICALLY
  // ========================================================
  html = html.replace('<div id="tab-hub" class="tab-content">', '<div id="tab-hub" class="tab-content hidden">');
  html = html.replace(`<div id="tab-${r.tab}" class="tab-content hidden">`, `<div id="tab-${r.tab}" class="tab-content">`);

  // ========================================================
  // CRITICAL SEO FIX 2: NAV BUTTON STATE
  // ========================================================
  if (r.tab === 'jogos') {
    html = html.replace('class="header-nav-btn active" data-tab="hub"', 'class="header-nav-btn" data-tab="hub"');
    html = html.replace('class="header-nav-btn" data-tab="jogos"', 'class="header-nav-btn active" data-tab="jogos"');
  }

  // ========================================================
  // CRITICAL SEO FIX 3: SCHEMA.ORG DEDICADO POR ROTA
  // ========================================================
  const customSchema = r.tab === 'jogos' ? buildGamesJsonLd() : buildToolJsonLd(r);
  const schemaInjection = `\n  <!-- SCHEMA.ORG DEDICADO PARA ${r.path} -->\n  <script type="application/ld+json">\n${customSchema}\n  </script>`;
  html = html.replace('</head>', `${schemaInjection}\n</head>`);

  // ========================================================
  // CRITICAL SEO FIX 4: PRE-RENDER ALL 42 GAMES FOR /JOGOS
  // ========================================================
  if (r.tab === 'jogos') {
    const emptyGridRegex = /<div id="games-catalog-grid" class="games-grid"[^>]*>[\s\S]*?<\/div>/;
    const preRenderedGrid = `<div id="games-catalog-grid" class="games-grid" role="region" aria-label="Catálogo de Jogos Online">\n${buildStaticGamesGridHtml()}\n      </div>`;
    html = html.replace(emptyGridRegex, preRenderedGrid);
  }

  const targetFile = path.join(dir, 'index.html');
  fs.writeFileSync(targetFile, html, 'utf8');
  console.log(`Generated route for ${r.path} -> ${targetFile}`);
}

console.log('All routes generated successfully with 100% Pre-rendered SEO and Dedicated Schema!');
