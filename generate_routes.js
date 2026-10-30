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
    tab: 'tutoriais',
    folder: 'tutoriais',
    path: '/tutoriais/',
    title: 'Tutoriais & Guias de PC Fraco e Emulação | SOLLIUS Tech',
    desc: 'Tutoriais práticos passo a passo para PC fraco: configurações de emuladores (RPCS3, PCSX2), otimização de FPS, remoção de lag e links de download.',
    schemaType: 'CollectionPage',
    ratingCount: '3890'
  },
  {
    tab: 'gow3-pc-fraco',
    folder: 'tutoriais/god-of-war-3-pc-fraco',
    path: '/tutoriais/god-of-war-3-pc-fraco/',
    title: 'God of War 3 no PC Fraco: Como Rodar a 60 FPS no RPCS3 [Guia Definitivo + Download] | SOLLIUS',
    desc: 'Guia completo passo a passo para rodar God of War 3 no PC fraco utilizando o emulador RPCS3. Baixe o preset de configuração, patches de 60 FPS e resolva travamentos.',
    schemaType: 'HowTo',
    ratingCount: '4820'
  },

  {
    tab: 'remover',
    folder: 'remover-fundo',
    path: '/remover-fundo/',
    title: 'Removedor de Fundo com IA Grátis e Ilimitado | SOLLIUS',
    desc: 'Remova o fundo de qualquer imagem automaticamente sem enviar fotos para servidores. Processamento 100% local, seguro e gratuito.',
    schemaType: 'DesignApplication',
    ratingCount: '1540'
  },
  {
    tab: 'curriculo',
    folder: 'curriculo-ats',
    path: '/curriculo-ats/',
    title: 'Criador de Currículos Padrão ATS Gratuito | SOLLIUS',
    desc: 'Crie currículos modernos aprovados por robôs de RH (Gupy, Workday) com formatação A4 perfeita e acessibilidade visual.',
    schemaType: 'BusinessApplication',
    ratingCount: '2190'
  },
  {
    tab: 'cartao',
    folder: 'cartao-de-visita',
    path: '/cartao-de-visita/',
    title: 'Criador de Cartão de Visita de Elite com QR Code | SOLLIUS',
    desc: 'Crie artes gráficas de frente e verso com temas de luxo em 300 DPI e QR Code automático integrado.',
    schemaType: 'DesignApplication',
    ratingCount: '980'
  },
  {
    tab: 'assinar-pdf',
    folder: 'assinar-pdf',
    path: '/assinar-pdf/',
    title: 'Assinar PDF no Navegador 100% Privado | SOLLIUS',
    desc: 'Assine contratos e procurações diretamente no seu computador sem enviar documentos para a nuvem.',
    schemaType: 'UtilitiesApplication',
    ratingCount: '3420'
  },
  {
    tab: 'limpar-gps',
    folder: 'limpar-gps',
    path: '/limpar-gps/',
    title: 'Limpador de GPS & Metadados EXIF de Fotos | SOLLIUS',
    desc: 'Elimine coordenadas de GPS e dados de identificação da câmera de suas fotos antes de publicar na web.',
    schemaType: 'SecurityApplication',
    ratingCount: '870'
  },
  {
    tab: 'converter',
    folder: 'compressor-imagem',
    path: '/compressor-imagem/',
    title: 'Compressor & Conversor de Imagens em Lote WebP | SOLLIUS',
    desc: 'Comprima e converta imagens para WebP, PNG e JPG reduzindo até 90% do tamanho com download em ZIP.',
    schemaType: 'UtilitiesApplication',
    ratingCount: '4120'
  },
  {
    tab: 'pdf',
    folder: 'pdf-studio',
    path: '/pdf-studio/',
    title: 'PDF Studio: Juntar PDFs e Fotos para PDF | SOLLIUS',
    desc: 'Mescle múltiplos PDFs e boletos em ordem ou transforme imagens em PDF único de graça sem filas.',
    schemaType: 'UtilitiesApplication',
    ratingCount: '2860'
  },
  {
    tab: 'tags',
    folder: 'gerador-tags-virais',
    path: '/gerador-tags-virais/',
    title: 'Gerador de Tags Virais & Click Magnet para YouTube e TikTok | SOLLIUS',
    desc: 'Gere tags otimizadas para o YouTube Studio, fórmulas de títulos de alto clique e hashtags para TikTok.',
    schemaType: 'SocialNetworkingApplication',
    ratingCount: '1650'
  },
  {
    tab: 'qrcode',
    folder: 'gerador-qrcode',
    path: '/gerador-qrcode/',
    title: 'Gerador de QR Code Pro Vitalício sem Expiração | SOLLIUS',
    desc: 'Crie QR Codes personalizados para Pix, links, WhatsApp e Wi-Fi que nunca expiram e sem mensalidade.',
    schemaType: 'UtilitiesApplication',
    ratingCount: '1980'
  },
  {
    tab: 'texto',
    folder: 'formatador-texto',
    path: '/formatador-texto/',
    title: 'Text Studio: Contador e Limpador de Linhas | SOLLIUS',
    desc: 'Remova linhas duplicadas, conte caracteres e palavras e formate textos online com 1 clique.',
    schemaType: 'UtilitiesApplication',
    ratingCount: '730'
  },
  {
    tab: 'recorder',
    folder: 'gravador-de-tela',
    path: '/gravador-de-tela/',
    title: 'Gravador de Tela e Áudio Gratuito sem Instalação | SOLLIUS',
    desc: 'Grave sua tela, gameplay ou tutoriais com microfone e áudio interno direto pelo navegador.',
    schemaType: 'MultimediaApplication',
    ratingCount: '1430'
  },
  {
    tab: 'transcritor',
    folder: 'transcritor-de-audio',
    path: '/transcritor-de-audio/',
    title: 'Transcritor de Voz IA com Contexto & Sugestões de Dúvidas | SOLLIUS',
    desc: 'Transcreva gravações, podcasts e reuniões de até 2 horas com detecção inteligente de palavras duvidosas, compreensão de tema e exportação SRT.',
    schemaType: 'AudioApplication',
    ratingCount: '1280'
  },
  {
    tab: 'office',
    folder: 'conversor-documentos',
    path: '/conversor-documentos/',
    title: 'Conversor Office & PDF Studio (Word & Excel) Gratuito | SOLLIUS',
    desc: 'Converta planilhas Excel (XLSX, CSV) e documentos Word (DOCX) em PDF A4, JSON e HTML 100% no navegador sem instalar programas.',
    schemaType: 'OfficeApplication',
    ratingCount: '1120'
  },
  {
    tab: 'jogos',
    folder: 'jogos',
    path: '/jogos/',
    title: 'Jogos Online Grátis no Navegador | SOLLIUS Games Arcade',
    desc: 'Jogue +40 jogos online grátis sem download nem cadastro no celular e PC. Corrida 3D, Motos, Ação FPS, Puzzles, Retrô e Esportes instantâneos.',
    schemaType: 'GameApplication',
    ratingCount: '4890'
  },
  {
    tab: 'programas',
    folder: 'programas',
    path: '/programas/',
    title: 'Programas e Softwares Gratuitos para PC | SOLLIUS Desktop Studio',
    desc: 'Baixe o instalador oficial para Windows 10 e 11. Conheça o Sollarys Ultra Compressor v1.02 com multithread e auto-atualização contínua.',
    schemaType: 'SoftwareApplication',
    ratingCount: '1850'
  },
  {
    tab: 'compressor-pc',
    folder: 'sollius-compressor',
    path: '/sollius-compressor/',
    title: 'Sollarys Ultra Compressor v1.02 para Windows | Download Oficial Grátis',
    desc: 'Baixe o Sollarys Ultra Compressor v1.02 para Windows 11 e 10 (64-bit). Motor multithread ultrarrápido, barra de progresso com %, pausa/retomada e auto-atualização silenciosa.',
    schemaType: 'SoftwareApplication',
    ratingCount: '2340'
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

function buildProgramasJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sollius.com.br/programas/#webpage",
        "url": "https://sollius.com.br/programas/",
        "name": "Programas e Softwares Gratuitos para PC | SOLLIUS Desktop Studio",
        "description": "Baixe o instalador oficial para Windows 10 e 11. Conheça o Sollarys Ultra Compressor v1.02 com multithread e auto-atualização contínua.",
        "inLanguage": "pt-BR"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://sollius.com.br/programas/#compressor",
        "name": "Sollarys Ultra Compressor",
        "operatingSystem": "Windows 10, Windows 11 (64-bit)",
        "applicationCategory": "UtilitiesApplication",
        "softwareVersion": "1.02",
        "fileSize": "18.5 MB",
        "downloadUrl": "https://sollius.com.br/downloads/Sollarys-1.02-Setup-Windows-x64.exe",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "BRL"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "1850",
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    ]
  }, null, 2);
}

function buildDedicatedCompressorJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sollius.com.br/sollius-compressor/#webpage",
        "url": "https://sollius.com.br/sollius-compressor/",
        "name": "Sollarys Ultra Compressor v1.02 para Windows | Download Oficial Grátis",
        "description": "Baixe o Sollarys Ultra Compressor v1.02 para Windows 11 e 10 (64-bit). Motor multithread ultrarrápido, barra de progresso com %, pausa/retomada e auto-atualização silenciosa.",
        "inLanguage": "pt-BR"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://sollius.com.br/sollius-compressor/#software",
        "name": "Sollarys Ultra Compressor",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Windows 11, Windows 10 (64-bit)",
        "fileSize": "18.5 MB",
        "softwareVersion": "1.02",
        "releaseDate": "2026-10-29",
        "downloadUrl": "https://sollius.com.br/downloads/Sollarys-1.02-Setup-Windows-x64.exe",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "BRL"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.95",
          "ratingCount": "2340",
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    ]
  }, null, 2);
}


function buildGow3TutorialJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sollius.com.br/tutoriais/god-of-war-3-pc-fraco/#webpage",
        "url": "https://sollius.com.br/tutoriais/god-of-war-3-pc-fraco/",
        "name": "God of War 3 no PC Fraco: Como Rodar a 60 FPS no RPCS3 [Guia Definitivo + Download]",
        "description": "Guia completo passo a passo para rodar God of War 3 no PC fraco utilizando o emulador RPCS3. Baixe o preset de configuração, patches de 60 FPS e resolva travamentos.",
        "inLanguage": "pt-BR"
      },
      {
        "@type": "HowTo",
        "@id": "https://sollius.com.br/tutoriais/god-of-war-3-pc-fraco/#howto",
        "name": "Como Rodar God of War 3 no RPCS3 em PC Fraco a 60 FPS",
        "description": "Aprenda a configurar o emulador RPCS3 com renderização Vulkan, patches de 60 FPS, FSR upscaling e ajuste de SPU Block Size para jogar God of War 3 sem travamentos em computadores modestos.",
        "totalTime": "PT15M",
        "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "BRL",
          "value": "0"
        },
        "tool": [
          { "@type": "HowToTool", "name": "Emulador RPCS3 (Vulkan)" },
          { "@type": "HowToTool", "name": "Firmware Oficial Sony PS3 (PS3UPDAT.PUP)" },
          { "@type": "HowToTool", "name": "Pacote de Patches 60 FPS e No-Blur" }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Instalar o Firmware Oficial no RPCS3",
            "text": "Abra o RPCS3, vá em File -> Install Firmware e selecione o arquivo PS3UPDAT.PUP baixado.",
            "url": "https://sollius.com.br/tutoriais/god-of-war-3-pc-fraco/#step-1"
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Adicionar o Jogo à Biblioteca",
            "text": "Clique em File -> Add Games e aponte para a pasta com os arquivos do God of War 3.",
            "url": "https://sollius.com.br/tutoriais/god-of-war-3-pc-fraco/#step-2"
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Configurar Gráficos e CPU",
            "text": "Crie uma configuração customizada definindo Vulkan, SPU Block Size em Mega e Wake-Up Delay em 200 microssegundos.",
            "url": "https://sollius.com.br/tutoriais/god-of-war-3-pc-fraco/#step-3"
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Ativar Patches de 60 FPS e Desativar Sombras",
            "text": "Em Game Patches, ative Unlock FPS, Disable Motion Blur e Disable Depth of Field.",
            "url": "https://sollius.com.br/tutoriais/god-of-war-3-pc-fraco/#step-4"
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Iniciar e Compilar Shaders",
            "text": "Inicie o jogo e aguarde a compilação inicial de shaders PPU para jogar a 60 FPS.",
            "url": "https://sollius.com.br/tutoriais/god-of-war-3-pc-fraco/#step-5"
          }
        ]
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
  } else if (r.tab === 'programas' || r.tab === 'compressor-pc') {
    html = html.replace('class="header-nav-btn active" data-tab="hub"', 'class="header-nav-btn" data-tab="hub"');
    html = html.replace('class="header-nav-btn" data-tab="programas"', 'class="header-nav-btn active" data-tab="programas"');
  } else if (r.tab === 'tutoriais' || r.tab === 'gow3-pc-fraco') {
    html = html.replace('class="header-nav-btn active" data-tab="hub"', 'class="header-nav-btn" data-tab="hub"');
    html = html.replace('class="header-nav-btn" data-tab="tutoriais"', 'class="header-nav-btn active" data-tab="tutoriais"');
  }

  // ========================================================
  // CRITICAL SEO FIX 3: SCHEMA.ORG DEDICADO POR ROTA
  // ========================================================
  const customSchema = r.tab === 'jogos' ? buildGamesJsonLd() : 
                       (r.tab === 'programas' ? buildProgramasJsonLd() : 
                       (r.tab === 'compressor-pc' ? buildDedicatedCompressorJsonLd() : 
                       (r.tab === 'gow3-pc-fraco' ? buildGow3TutorialJsonLd() : buildToolJsonLd(r))));
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

// Alias: /programas/compressor -> /sollius-compressor
// Alias: /sollarys -> /sollius-compressor/
const sollarysDir = path.join(rootDir, 'sollarys');
if (!fs.existsSync(sollarysDir)) fs.mkdirSync(sollarysDir, { recursive: true });
fs.writeFileSync(path.join(sollarysDir, 'index.html'), '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=/sollius-compressor/"><title>Redirecionando para Sollarys Ultra Compressor...</title><link rel="canonical" href="https://sollius.com.br/sollius-compressor/"></head><body><script>window.location.href="/sollius-compressor/";</script></body></html>', 'utf8');

const progCompDir = path.join(rootDir, 'programas', 'compressor');
if (!fs.existsSync(progCompDir)) fs.mkdirSync(progCompDir, { recursive: true });
fs.writeFileSync(path.join(progCompDir, 'index.html'), `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=/sollius-compressor"><title>Redirecionando para Sollarys Ultra Compressor...</title><link rel="canonical" href="https://sollius.com.br/sollius-compressor"></head><body><script>window.location.href='/sollius-compressor';</script></body></html>`, 'utf8');


// Alias: /god-of-war-3-pc-fraco -> /tutoriais/god-of-war-3-pc-fraco/
const gow3AliasDir = path.join(rootDir, 'god-of-war-3-pc-fraco');
if (!fs.existsSync(gow3AliasDir)) fs.mkdirSync(gow3AliasDir, { recursive: true });
fs.writeFileSync(path.join(gow3AliasDir, 'index.html'), '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=/tutoriais/god-of-war-3-pc-fraco/"><title>Redirecionando para Tutorial God of War 3 PC Fraco...</title><link rel="canonical" href="https://sollius.com.br/tutoriais/god-of-war-3-pc-fraco/"></head><body><script>window.location.href="/tutoriais/god-of-war-3-pc-fraco/";</script></body></html>', 'utf8');

console.log('All routes generated successfully with 100% Pre-rendered SEO and Dedicated Schema!');
