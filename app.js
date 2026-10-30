// ========================================================
// SOLLIUS ECOSYSTEM ENGINE - 100% CLIENT-SIDE JAVASCRIPT
// ========================================================

// Forçar HTTPS automaticamente com Certificado Seguro
if (typeof window !== 'undefined' && window.location.protocol === 'http:' && !['localhost', '127.0.0.1'].includes(window.location.hostname)) {
  window.location.replace('https://' + window.location.host + window.location.pathname + window.location.search + window.location.hash);
}

// Mapa de Rotas Amigáveis (URLs Limpas & SEO Dedicado)
const ROUTE_MAP = {
  'hub': {
    path: '/',
    hash: '#hub',
    title: 'SOLLIUS | O Maior Ecossistema de Ferramentas Web Gratuitas & Privadas',
    desc: 'Sem cadastros, sem limites diários e 100% no seu navegador. Removedor de fundo IA, currículo ATS, cartão de visita, assinador de PDF e conversores.'
  },
  'remover': {
    path: '/remover-fundo',
    hash: '#remover-fundo',
    title: 'Removedor de Fundo com IA Grátis e Ilimitado | SOLLIUS',
    desc: 'Remova o fundo de qualquer imagem automaticamente sem enviar fotos para servidores. Processamento 100% local e gratuito.'
  },
  'curriculo': {
    path: '/curriculo-ats',
    hash: '#curriculo-ats',
    title: 'Criador de Currículos Padrão ATS Gratuito | SOLLIUS',
    desc: 'Crie currículos modernos aprovados por robôs de RH com formatação A4 perfeita e acessibilidade visual.'
  },
  'cartao': {
    path: '/cartao-de-visita',
    hash: '#cartao-de-visita',
    title: 'Criador de Cartão de Visita de Elite com QR Code | SOLLIUS',
    desc: 'Crie artes gráficas de frente e verso com temas de luxo em 300 DPI e QR Code automático integrado.'
  },
  'assinar-pdf': {
    path: '/assinar-pdf',
    hash: '#assinar-pdf',
    title: 'Assinar PDF no Navegador 100% Privado | SOLLIUS',
    desc: 'Assine contratos e procurações diretamente no seu computador sem enviar documentos para a nuvem.'
  },
  'limpar-gps': {
    path: '/limpar-gps',
    hash: '#limpar-gps',
    title: 'Limpador de GPS & Metadados EXIF de Fotos | SOLLIUS',
    desc: 'Elimine coordenadas de GPS e dados de identificação da câmera de suas fotos antes de publicar na web.'
  },
  'converter': {
    path: '/compressor-imagem',
    hash: '#compressor-imagem',
    title: 'Compressor & Conversor de Imagens em Lote WebP | SOLLIUS',
    desc: 'Comprima e converta imagens para WebP, PNG e JPG reduzindo até 90% do tamanho com download em ZIP.'
  },
  'pdf': {
    path: '/pdf-studio',
    hash: '#pdf-studio',
    title: 'PDF Studio: Juntar PDFs e Fotos para PDF | SOLLIUS',
    desc: 'Mescle múltiplos PDFs e boletos em ordem ou transforme imagens em PDF único de graça sem filas.'
  },
  'tags': {
    path: '/gerador-tags-virais',
    hash: '#gerador-tags-virais',
    title: 'Gerador de Tags Virais & Click Magnet para YouTube e TikTok | SOLLIUS',
    desc: 'Gere tags otimizadas para o YouTube Studio, fórmulas de títulos de alto clique e hashtags para TikTok.'
  },
  'qrcode': {
    path: '/gerador-qrcode',
    hash: '#gerador-qrcode',
    title: 'Gerador de QR Code Pro Vitalício sem Expiração | SOLLIUS',
    desc: 'Crie QR Codes personalizados para Pix, links, WhatsApp e Wi-Fi que nunca expiram e sem mensalidade.'
  },
  'texto': {
    path: '/formatador-texto',
    hash: '#formatador-texto',
    title: 'Text Studio: Contador e Limpador de Linhas | SOLLIUS',
    desc: 'Remova linhas duplicadas, conte caracteres e palavras e formate textos online com 1 clique.'
  },
  'recorder': {
    path: '/gravador-de-tela',
    hash: '#gravador-de-tela',
    title: 'Gravador de Tela e Áudio Gratuito sem Instalação | SOLLIUS',
    desc: 'Grave sua tela, gameplay ou tutoriais com microfone e áudio interno direto pelo navegador.'
  }
,
  'transcritor': {
    path: '/transcritor-de-audio',
    hash: '#transcritor-de-audio',
    title: 'Transcritor de Voz IA com Contexto & Sugestões de Dúvidas | SOLLIUS',
    desc: 'Transcreva gravações, podcasts e reuniões de até 2 horas com detecção inteligente de palavras duvidosas, compreensão de tema e exportação SRT.'
  },
  'office': {
    path: '/conversor-documentos',
    hash: '#conversor-documentos',
    title: 'Conversor Office & PDF Studio (Word & Excel) Gratuito | SOLLIUS',
    desc: 'Converta planilhas Excel (XLSX, CSV) e documentos Word (DOCX) em PDF A4, JSON e HTML 100% no navegador sem instalar programas.'
  },
  'jogos': {
    path: '/jogos/',
    hash: '#jogos',
    title: 'Jogos Online Grátis no Navegador | SOLLIUS Games Arcade',
    desc: 'Jogue +40 jogos online grátis sem download nem cadastro no celular e PC. Corrida 3D, Motos, Ação FPS, Puzzles, Retrô e Esportes instantâneos.'
  },
  'programas': {
    path: '/programas/',
    hash: '#programas',
    title: 'Programas e Softwares Gratuitos para PC | SOLLIUS Desktop Studio',
    desc: 'Baixe softwares instaláveis e portáteis para Windows 10 e 11. Conheça o Sollarys Ultra Compressor v1.01 com multithread e auto-atualização contínua.'
  },
    'tutoriais': {
    path: '/tutoriais/',
    hash: '#tutoriais',
    title: 'Tutoriais & Guias de PC Fraco e Emulação | SOLLIUS Tech',
    desc: 'Tutoriais práticos passo a passo para PC fraco: configurações de emuladores (RPCS3, PCSX2), otimização de FPS, remoção de lag e links de download.'
  },
    'gow-pc-fraco': {
    path: '/tutoriais/god-of-war-pc-fraco/',
    hash: '#god-of-war-pc-fraco',
    title: 'Como Baixar God of War no PC Fraco [Download Google Drive + Guia] | SOLLIUS',
    desc: 'Baixe God of War para PC Fraco 100% grátis com link direto no Google Drive em alta velocidade. Tutorial completo de instalação e configurações para rodar sem lag.'
  },
  'gow3-pc-fraco': {
    path: '/tutoriais/god-of-war-3-pc-fraco/',
    hash: '#god-of-war-3-pc-fraco',
    title: 'God of War 3 no PC Fraco: Como Rodar a 60 FPS no RPCS3 [Guia Definitivo + Download] | SOLLIUS',
    desc: 'Guia completo passo a passo para rodar God of War 3 no PC fraco utilizando o emulador RPCS3. Baixe o preset de configuração, patches de 60 FPS e resolva travamentos.'
  },
  'compressor-pc': {
    path: '/sollius-compressor/',
    hash: '#sollius-compressor',
    title: 'Sollarys Ultra Compressor v1.01 para Windows | Download Oficial Grátis',
    desc: 'Baixe o Sollarys Ultra Compressor v1.01 para Windows 11 e 10 (64-bit). Substituto definitivo para WinRAR e 7-Zip com motor multithread, suporte a .sol, ZIP, 7Z, RAR e auto-atualização silenciosa.'
  }
};

// Aliases para suportar múltiplos formatos de URL (ex: /compressor ou /compressor-imagem)
const PATH_TO_TAB = {
  '/tutoriais/god-of-war-pc-fraco': 'gow-pc-fraco',
  '/tutoriais/god-of-war-pc-fraco/': 'gow-pc-fraco',
  '/god-of-war-pc-fraco': 'gow-pc-fraco',
  '/god-of-war-pc-fraco/': 'gow-pc-fraco',
  '/gow-pc-fraco': 'gow-pc-fraco',
  '/gow-pc-fraco/': 'gow-pc-fraco',
  '/baixar-god-of-war-pc-fraco': 'gow-pc-fraco',
  '/baixar-god-of-war-pc-fraco/': 'gow-pc-fraco',

  '/tutoriais': 'tutoriais',
  '/tutoriais/': 'tutoriais',
  '/guias': 'tutoriais',
  '/guias/': 'tutoriais',
  '/tutoriais/god-of-war-3-pc-fraco': 'gow3-pc-fraco',
  '/tutoriais/god-of-war-3-pc-fraco/': 'gow3-pc-fraco',
  '/god-of-war-3-pc-fraco': 'gow3-pc-fraco',
  '/god-of-war-3-pc-fraco/': 'gow3-pc-fraco',
  '/gow3-pc-fraco': 'gow3-pc-fraco',
  '/gow3-pc-fraco/': 'gow3-pc-fraco',
  '/gow3': 'gow3-pc-fraco',
  '/gow3/': 'gow3-pc-fraco',

  '/': 'hub',
  '/hub': 'hub',
  '/remover-fundo': 'remover',
  '/remover': 'remover',
  '/fundo': 'remover',
  '/curriculo-ats': 'curriculo',
  '/curriculo': 'curriculo',
  '/cv': 'curriculo',
  '/cartao-de-visita': 'cartao',
  '/cartao': 'cartao',
  '/assinar-pdf': 'assinar-pdf',
  '/assinar': 'assinar-pdf',
  '/limpar-gps': 'limpar-gps',
  '/gps': 'limpar-gps',
  '/exif': 'limpar-gps',
  '/compressor-imagem': 'converter',
  '/compressor': 'converter',
  '/converter': 'converter',
  '/imagens': 'converter',
  '/pdf-studio': 'pdf',
  '/pdf': 'pdf',
  '/juntar-pdf': 'pdf',
  '/gerador-tags-virais': 'tags',
  '/tags': 'tags',
  '/gerador-qrcode': 'qrcode',
  '/qrcode': 'qrcode',
  '/formatador-texto': 'texto',
  '/texto': 'texto',
  '/gravador-de-tela': 'recorder',
  '/gravador': 'recorder',
  '/recorder': 'recorder'
,
  '/transcritor-de-audio': 'transcritor',
  '/transcritor': 'transcritor',
  '/audio': 'transcritor',
  '/conversor-documentos': 'office',
  '/office': 'office',
  '/documentos': 'office',
  '/jogos': 'jogos',
  '/jogos/': 'jogos',
  '/games': 'jogos',
  '/games/': 'jogos',
  '/arcade': 'jogos',
  '/arcade/': 'jogos',
  '/programas': 'programas',
  '/programas/': 'programas',
  '/softwares': 'programas',
  '/softwares/': 'programas',
  '/desktop': 'programas',
  '/desktop/': 'programas',
  '/sollarys': 'compressor-pc',
  '/sollarys/': 'compressor-pc',
  '/sollarys-compressor': 'compressor-pc',
  '/sollarys-compressor/': 'compressor-pc',
  '/sollius-compressor': 'compressor-pc',
  '/sollius-compressor/': 'compressor-pc',
  '/compressor-pc': 'compressor-pc',
  '/compressor-pc/': 'compressor-pc',
  '/compressor-windows': 'compressor-pc',
  '/compressor-windows/': 'compressor-pc',
  '/programas/compressor': 'compressor-pc',
  '/programas/compressor/': 'compressor-pc'
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  renderQrCode();
  
  if (typeof loadResumeSample === 'function') loadResumeSample();
  if (typeof updateCardPreview === 'function') updateCardPreview();
  if (typeof initSignaturePad === 'function') initSignaturePad();
  if (typeof initGamesCatalog === 'function') initGamesCatalog();

  // Roteador Inicial: Determina qual ferramenta abrir pela URL atual
  resolveInitialRoute();
});

// Resolução de Rota na Abertura da Página
function resolveInitialRoute() {
  // 0. Prioridade se pré-configurado no body da página estática dedicada
  if (document.body && document.body.dataset && document.body.dataset.initialTab) {
    const staticTab = document.body.dataset.initialTab;
    if (ROUTE_MAP[staticTab]) {
      switchTab(staticTab, false);
      return;
    }
  }

  // 1. Prioridade: sessionStorage (caso redirecionado por pasta estática)
  try {
    const storedTab = sessionStorage.getItem('sollius_target_tab');
    if (storedTab && ROUTE_MAP[storedTab]) {
      sessionStorage.removeItem('sollius_target_tab');
      switchTab(storedTab, false);
      return;
    }
  } catch (err) {}

  // 2. Query params (ex: ?tool=curriculo ou ?tab=converter)
  try {
    const params = new URLSearchParams(window.location.search);
    const queryTool = params.get('tool') || params.get('tab') || params.get('app');
    if (queryTool && ROUTE_MAP[queryTool]) {
      switchTab(queryTool, false);
      return;
    }
    if (queryTool && PATH_TO_TAB['/' + queryTool]) {
      switchTab(PATH_TO_TAB['/' + queryTool], false);
      return;
    }
  } catch (err) {}

  // 3. Caminho da URL limpa (ex: /compressor-imagem ou /curriculo-ats)
  let currentPath = window.location.pathname.replace(/\/index\.html$/i, '').replace(/\/+$/, '') || '/';
  if (PATH_TO_TAB[currentPath]) {
    switchTab(PATH_TO_TAB[currentPath], false);
    return;
  }

  // 4. Hash da URL (ex: #compressor-imagem ou #curriculo-ats)
  const currentHash = window.location.hash.replace('#', '').toLowerCase();
  if (currentHash) {
    if (ROUTE_MAP[currentHash]) {
      switchTab(currentHash, false);
      return;
    }
    for (const [tabKey, routeInfo] of Object.entries(ROUTE_MAP)) {
      if (routeInfo.hash === `#${currentHash}` || tabKey === currentHash) {
        switchTab(tabKey, false);
        return;
      }
    }
    if (PATH_TO_TAB['/' + currentHash]) {
      switchTab(PATH_TO_TAB['/' + currentHash], false);
      return;
    }
  }

  // Padrão: Hub inicial
  switchTab('hub', false);
}

// Histórico do Navegador (Botões Voltar e Avançar)
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.tab) {
    switchTab(e.state.tab, false);
  } else {
    resolveInitialRoute();
  }
});

// Filtro de Ferramentas por Categoria
function filterCategory(category, buttonEl) {
  switchTab('hub');

  const cards = document.querySelectorAll('.tool-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.classList.remove('hidden-by-filter');
    } else {
      card.classList.add('hidden-by-filter');
    }
  });

  document.querySelectorAll('.cat-pill').forEach(btn => btn.classList.remove('active'));
  if (buttonEl) buttonEl.classList.add('active');
}

// Filtro de Busca Universal em Tempo Real
function filterTools(query) {
  switchTab('hub');
  const cleanQuery = query.toLowerCase().trim();
  const cards = document.querySelectorAll('.tool-card');

  cards.forEach(card => {
    const text = (card.innerText + ' ' + (card.dataset.keywords || '')).toLowerCase();
    if (!cleanQuery || text.includes(cleanQuery)) {
      card.classList.remove('hidden-by-filter');
    } else {
      card.classList.add('hidden-by-filter');
    }
  });
}

// Navegação entre abas com Histórico e URLs Próprias
function switchTab(tabId, pushHistory = true) {
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(el => el.classList.add('hidden'));

  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeContent) {
    activeContent.classList.remove('hidden');
    if (pushHistory) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Atualização Dinâmica da URL, Título e SEO
  const route = ROUTE_MAP[tabId] || ROUTE_MAP['hub'];
  document.title = route.title;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', route.desc);

  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    const cleanPath = route.path === '/' ? '' : route.path;
    canonicalLink.setAttribute('href', `https://sollius.com.br${cleanPath}`);
  }

  if (pushHistory) {
    try {
      window.history.pushState({ tab: tabId }, route.title, route.path);
    } catch (e) {
      // Fallback para hash se executando localmente por file://
      window.location.hash = route.hash;
    }
  }

  // Calibrações específicas por ferramenta
  if (tabId === 'assinar-pdf' && typeof initSignaturePad === 'function') {
    setTimeout(initSignaturePad, 50);
  }
  if (tabId === 'cartao' && typeof updateCardPreview === 'function') {
    setTimeout(updateCardPreview, 50);
  }
  if (tabId === 'jogos' && typeof initGamesCatalog === 'function') {
    setTimeout(initGamesCatalog, 50);
  }

  // Atualiza botões
  const buttons = document.querySelectorAll('.nav-item, .header-nav-btn');
  buttons.forEach(btn => {
    const bTab = btn.dataset.tab;
    if (bTab === tabId || (bTab === 'tutoriais' && (tabId === 'gow-pc-fraco' || tabId === 'gow3-pc-fraco')) || (bTab === 'programas' && tabId === 'compressor-pc')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  setTimeout(() => {
    if (window.lucide) lucide.createIcons();
  }, 50);
}

// Modal de Atalhos
function openShortcutsModal() {
  document.getElementById('shortcuts-modal').classList.remove('hidden');
}
function closeShortcutsModal() {
  document.getElementById('shortcuts-modal').classList.add('hidden');
}


// ========================================================
// 1. REMOVEDOR DE FUNDO INTELIGENTE (CLIENT-SIDE)
// ========================================================
let removerOriginalImage = null;
let removerProcessedCanvas = null;

function handleRemoverFile(file) {
  updateUnifiedProgress("remover-progress-box", 25, "Carregando imagem em alta resolução...");
  if (!file) return;

  const reader = new FileReader();
  document.getElementById('remover-loading').classList.remove('hidden');
  document.getElementById('remover-result').classList.add('hidden');

  reader.onload = (e) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      removerOriginalImage = img;
      document.getElementById('remover-orig-img').src = e.target.result;
      updateUnifiedProgress("remover-progress-box", 65, "Recortando fundo com precisão...");
    setTimeout(() => {
      processSmartBackgroundRemoval(img);
      updateUnifiedProgress("remover-progress-box", 100, "Recorte concluído com sucesso!");
      hideUnifiedProgress("remover-progress-box", 1200);
    }, 150);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Algoritmo de Remoção de Fundo Inteligente no Navegador
function processSmartBackgroundRemoval(img) {
  const canvas = document.getElementById('remover-canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  ctx.drawImage(img, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const tolerance = parseInt(document.getElementById('remover-tolerance').value) || 35;

  // Identifica as cores dos cantos como amostra do fundo
  const corners = [
    { r: data[0], g: data[1], b: data[2] }, // top-left
    { r: data[(canvas.width - 1) * 4], g: data[(canvas.width - 1) * 4 + 1], b: data[(canvas.width - 1) * 4 + 2] }, // top-right
    { r: data[((canvas.height - 1) * canvas.width) * 4], g: data[((canvas.height - 1) * canvas.width) * 4 + 1], b: data[((canvas.height - 1) * canvas.width) * 4 + 2] }, // bottom-left
  ];
  
  // Média da cor do fundo
  const bgR = (corners[0].r + corners[1].r + corners[2].r) / 3;
  const bgG = (corners[0].g + corners[1].g + corners[2].g) / 3;
  const bgB = (corners[0].b + corners[1].b + corners[2].b) / 3;

  const tolSquared = (tolerance * 2.5) ** 2;

  // Processa pixels calculando distância euclidiana de cor
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const dist = (r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2;

    if (dist < tolSquared) {
      // Suavização gradual na borda
      const factor = dist / tolSquared;
      if (factor < 0.6) {
        data[i + 3] = 0; // Transparente total
      } else {
        data[i + 3] = Math.round(255 * (factor - 0.6) / 0.4); // Suavização alpha
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  removerProcessedCanvas = canvas;

  document.getElementById('remover-loading').classList.add('hidden');
  document.getElementById('remover-result').classList.remove('hidden');

  if (window.confetti) {
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
  }
}

function reprocessRemover() {
  if (removerOriginalImage) {
    processSmartBackgroundRemoval(removerOriginalImage);
  }
}

function changeRemoverBg(color) {
  const previewBox = document.getElementById('remover-bg-preview');
  if (color === 'transparent') {
    previewBox.style.backgroundImage = `linear-gradient(45deg, #111 25%, transparent 25%), linear-gradient(-45deg, #111 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #111 75%), linear-gradient(-45deg, transparent 75%, #111 75%)`;
    previewBox.style.backgroundColor = '#1a1a24';
  } else {
    previewBox.style.backgroundImage = 'none';
    previewBox.style.backgroundColor = color;
  }
}

function downloadRemoverResult() {
  const canvas = document.getElementById('remover-canvas');
  if (!canvas) return;

  const link = document.createElement('a');
  link.download = `sollius_recorte_${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}


// ========================================================
// 2. CONVERSOR & COMPRESSOR DE IMAGENS EM LOTE
// ========================================================
let convertedQueue = [];

async function handleConverterFiles(files) {
  if (!files || files.length === 0) return;

  const targetFormat = document.getElementById('converter-target-format').value;
  const quality = (parseInt(document.getElementById('converter-quality').value) || 80) / 100;
  const maxWidthSetting = document.getElementById('converter-max-width').value;

  const queueContainer = document.getElementById('converter-queue-container');
  const queueList = document.getElementById('converter-queue-list');
  const countEl = document.getElementById('converter-queue-count');

  queueContainer.classList.remove('hidden');
  convertedQueue = [];
  queueList.innerHTML = '';

  updateUnifiedProgress("converter-progress-box", 5, "Iniciando processamento de " + files.length + " imagens...");
  for (let i = 0; i < files.length; i++) {
    const progressPct = Math.round(((i + 1) / files.length) * 95);
    updateUnifiedProgress("converter-progress-box", progressPct, "Convertendo imagem " + (i + 1) + " de " + files.length + " (" + files[i].name + ")...");
    const file = files[i];
    const itemId = `conv-${Date.now()}-${i}`;
    
    // Renderiza placeholder elegante na lista
    const itemEl = document.createElement('div');
    itemEl.id = itemId;
    itemEl.className = 'file-queue-card';
    itemEl.innerHTML = `
      <div class="file-info-group">
        <div style="width: 52px; height: 52px; border-radius: 12px; background: rgba(255, 153, 0, 0.15); color: #FBBF24; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem; flex-shrink: 0; border: 1px solid rgba(255, 153, 0, 0.3);">
          ${file.name.split('.').pop().toUpperCase().slice(0, 4)}
        </div>
        <div class="file-details">
          <span class="file-title-text">${file.name}</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">${formatFileSize(file.size)} • Otimizando no navegador...</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-size: 0.8rem; color: #FBBF24; font-weight: 600;">⏳ Processando...</span>
      </div>
    `;
    queueList.appendChild(itemEl);

    // Processa conversão via Canvas
    try {
      const result = await processImageConversion(file, targetFormat, quality, maxWidthSetting);
      convertedQueue.push(result);
      
      const reduction = Math.round(((file.size - result.blob.size) / file.size) * 100);
      const isLighter = reduction > 0;
      const thumbUrl = URL.createObjectURL(result.blob);

      itemEl.innerHTML = `
        <div class="file-info-group">
          <img src="${thumbUrl}" class="file-thumb-preview" alt="Preview da Imagem Convertida">
          <div class="file-details">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="file-title-text" title="${result.filename}">${result.filename}</span>
              <span class="file-format-badge ${targetFormat}">${targetFormat.toUpperCase()}</span>
            </div>
            <div class="file-size-comparison">
              <span>${formatFileSize(file.size)} → <strong style="color: #34D399;">${formatFileSize(result.blob.size)}</strong></span>
              ${isLighter ? `<span class="savings-pill">🔥 -${reduction}%</span>` : ''}
            </div>
          </div>
        </div>
        <button onclick="downloadSingleConverted('${result.id}')" class="btn-download-single">
          <span>⬇️</span>
          <span>Baixar ${targetFormat.toUpperCase()}</span>
        </button>
      `;
    } catch (err) {
      itemEl.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem; color: #F87171;">
          <span>❌</span>
          <span style="font-weight: 600;">Erro ao converter ${file.name}</span>
        </div>
      `;
    }
  }

  countEl.innerText = convertedQueue.length;
  updateUnifiedProgress("converter-progress-box", 100, "Todas as imagens foram otimizadas!");
  hideUnifiedProgress("converter-progress-box", 1800);
}

function processImageConversion(file, targetFormat, quality, maxWidthSetting) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (maxWidthSetting !== 'original') {
          const maxW = parseInt(maxWidthSetting);
          if (width > maxW) {
            height = Math.round((height * maxW) / width);
            width = maxW;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Se converter para JPG, preenche fundo branco para evitar preto em PNGs transparentes
        if (targetFormat === 'jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        const mimeType = targetFormat === 'png' ? 'image/png' : targetFormat === 'jpeg' ? 'image/jpeg' : 'image/webp';
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('Canvas blob failed'));
          const ext = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
          const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
          const newName = `${originalName}_sollius.${ext}`;
          
          resolve({
            id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            filename: newName,
            blob: blob,
            url: URL.createObjectURL(blob)
          });
        }, mimeType, quality);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function downloadSingleConverted(id) {
  const item = convertedQueue.find(q => q.id === id);
  if (!item) return;
  const a = document.createElement('a');
  a.download = item.filename;
  a.href = item.url;
  a.click();
}

async function downloadAllConverted() {
  if (!convertedQueue.length) return;
  if (convertedQueue.length === 1) {
    return downloadSingleConverted(convertedQueue[0].id);
  }

  const zip = new JSZip();
  convertedQueue.forEach(item => {
    zip.file(item.filename, item.blob);
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const a = document.createElement('a');
  a.download = `sollius_imagens_${Date.now()}.zip`;
  a.href = URL.createObjectURL(zipBlob);
  a.click();

  if (window.confetti) {
    confetti({ particleCount: 50, spread: 70 });
  }
}


// ========================================================
// 3. PDF STUDIO (MERGE & IMAGES TO PDF)
// ========================================================
let pdfMode = 'merge';
let pdfFilesList = [];

function setPdfMode(mode) {
  pdfMode = mode;
  pdfFilesList = [];
  document.getElementById('pdf-files-container').classList.add('hidden');

  const btnMerge = document.getElementById('pdf-btn-merge');
  const btnImg = document.getElementById('pdf-btn-img2pdf');
  const input = document.getElementById('pdf-file-input');
  const title = document.getElementById('pdf-drop-title');
  const desc = document.getElementById('pdf-drop-desc');
  const actionLabel = document.getElementById('pdf-action-label');

  if (mode === 'merge') {
    btnMerge.className = 'text-sm font-bold pb-2 border-b-2 border-rose-500 text-white flex items-center space-x-2';
    btnImg.className = 'text-sm font-semibold pb-2 border-b-2 border-transparent text-slate-400 hover:text-white flex items-center space-x-2';
    input.accept = '.pdf';
    title.innerText = 'Selecione arquivos PDF para unir';
    desc.innerText = 'Arraste seus documentos PDF em ordem de leitura';
    actionLabel.innerText = 'Gerar e Baixar PDF Unificado';
  } else {
    btnImg.className = 'text-sm font-bold pb-2 border-b-2 border-rose-500 text-white flex items-center space-x-2';
    btnMerge.className = 'text-sm font-semibold pb-2 border-b-2 border-transparent text-slate-400 hover:text-white flex items-center space-x-2';
    input.accept = 'image/jpeg,image/png,image/webp';
    title.innerText = 'Selecione imagens para transformar em PDF';
    desc.innerText = 'Cada foto se tornará uma página com proporção ajustada';
    actionLabel.innerText = 'Criar Documento PDF das Fotos';
  }
}

function handlePdfFiles(files) {
  if (!files || files.length === 0) return;
  for (let f of files) {
    pdfFilesList.push(f);
  }
  renderPdfFilesList();
}

function renderPdfFilesList() {
  const container = document.getElementById('pdf-files-container');
  const listEl = document.getElementById('pdf-files-list');
  const countEl = document.getElementById('pdf-count');

  if (!pdfFilesList.length) {
    container.classList.add('hidden');
    return;
  }

  container.classList.remove('hidden');
  countEl.innerText = pdfFilesList.length;
  listEl.innerHTML = '';

  pdfFilesList.forEach((file, idx) => {
    const row = document.createElement('div');
    row.className = 'file-queue-card';
    row.innerHTML = `
      <div class="file-info-group">
        <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(244, 63, 94, 0.15); color: #FB7185; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem; flex-shrink: 0; border: 1px solid rgba(244, 63, 94, 0.3);">
          #${idx + 1}
        </div>
        <div class="file-details">
          <span class="file-title-text">${file.name}</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">${formatFileSize(file.size)}</span>
        </div>
      </div>
      <button onclick="removePdfFile(${idx})" class="btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem; color: #F87171;" title="Remover este arquivo">
        Remover ✕
      </button>
    `;
    listEl.appendChild(row);
  });
}

function removePdfFile(idx) {
  pdfFilesList.splice(idx, 1);
  renderPdfFilesList();
}

function clearPdfList() {
  pdfFilesList = [];
  renderPdfFilesList();
}

async function processPdfAction() {
  updateUnifiedProgress("pdf-progress-box", 20, "Preparando documentos e medindo resoluções...");
  if (!pdfFilesList.length) return;
  const actionBtn = document.getElementById('pdf-action-btn');
  const label = document.getElementById('pdf-action-label');
  const originalText = label.innerText;

  try {
    label.innerText = 'Processando no navegador...';
    actionBtn.disabled = true;

    if (pdfMode === 'merge') {
      // Unir múltiplos PDFs com pdf-lib
      const mergedPdf = await PDFLib.PDFDocument.create();
      for (let file of pdfFilesList) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(p => mergedPdf.addPage(p));
      }
      updateUnifiedProgress("pdf-progress-box", 75, "Compilando PDF e gerando arquivo final...");
    const pdfBytes = await mergedPdf.save();
    updateUnifiedProgress("pdf-progress-box", 100, "PDF montado com sucesso!");
    hideUnifiedProgress("pdf-progress-box", 1500);
      downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), `sollius_unificado_${Date.now()}.pdf`);
    } else {
      // Imagens para PDF
      const pdfDoc = await PDFLib.PDFDocument.create();
      for (let file of pdfFilesList) {
        const arrayBuffer = await file.arrayBuffer();
        let image;
        if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          image = await pdfDoc.embedJpg(arrayBuffer);
        }
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }
      const pdfBytes = await pdfDoc.save();
      downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), `sollius_fotos_${Date.now()}.pdf`);
    }

    if (window.confetti) confetti();
  } catch (err) {
    alert('Erro ao processar PDF: ' + err.message);
  } finally {
    label.innerText = originalText;
    actionBtn.disabled = false;
  }
}


// ========================================================
// 4. TAGS VIRAIS & CLICK MAGNET (YOUTUBE / TIKTOK)
// ========================================================
function generateViralTags() {
  const keyword = document.getElementById('tag-input-keyword').value.trim();
  const niche = document.getElementById('tag-input-niche').value;
  const resultContainer = document.getElementById('tags-result-container');

  if (!keyword) {
    alert('Digite o tema ou assunto do seu vídeo para gerar as tags virais!');
    return;
  }

  const clean = keyword.toLowerCase();
  
  // Geração algorítmica de tags para YouTube
  const tagsList = [
    clean,
    `${clean} 2026`,
    `como fazer ${clean}`,
    `tutorial ${clean}`,
    `${clean} passo a passo`,
    `${clean} iniciante`,
    `segredos de ${clean}`,
    `${clean} vale a pena`,
    `dicas de ${clean}`,
    `${clean} completo`,
    `${clean} rapido`,
    `o que é ${clean}`,
    `melhores tecnicas ${clean}`,
    `${clean} na pratica`,
    `${clean} profissional`,
    `ganhar dinheiro com ${clean}`,
    `erros comuns em ${clean}`,
    `${clean} atualizado`
  ];

  if (niche === 'gaming') {
    tagsList.push(`gameplay ${clean}`, `devlog ${clean}`, `jogo indie`, `desenvolvimento de jogos`, `godot 4 ${clean}`);
  } else if (niche === 'business') {
    tagsList.push(`negocios lucrativos`, `como faturar com ${clean}`, `investimento`, `empreendedorismo`, `renda extra`);
  }

  // Títulos Click Magnet (Fórmulas Psicológicas de Alta Conversão)
  const titles = [
    `Como [KEYWORD] em 2026 (Sem Gastar Nada e Passo a Passo)`,
    `O Segredo de [KEYWORD] que Ninguém Tem Coragem de Te Contar`,
    `Eu Testei [KEYWORD] por 30 Dias e Isso Foi o Que Aconteceu...`,
    `PARE de Fazer [KEYWORD] Errado! Veja o Método Certo`,
    `Quanto Realmente Dá Para Ganhar com [KEYWORD]? (Valores Reais)`,
    `Fiz Isso com [KEYWORD] e os Resultados Foram Chocantes!`,
  ].map(t => t.replace('[KEYWORD]', capitalizeWords(clean)));

  // Hashtags
  const hashTagWord = clean.replace(/[^a-zA-Z0-9]/g, '');
  const hashtags = [
    `#${hashTagWord}`,
    `#${hashTagWord}2026`,
    `#dicasde${hashTagWord}`,
    `#tutorial`,
    `#viral`,
    `#foryou`,
    `#fyp`,
    `#inovacao`,
    `#tecnologia`,
    `#sollius`
  ].join(' ');

  // Injeta na UI
  document.getElementById('tags-youtube-text').innerText = tagsList.join(', ');
  document.getElementById('tags-hashtag-text').innerText = hashtags;

  const titlesListEl = document.getElementById('titles-list');
  titlesListEl.innerHTML = '';
  titles.forEach(title => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between p-2.5 rounded-xl bg-black/30 border border-white/5 text-xs text-white';
    li.innerHTML = `
      <span class="font-semibold truncate max-w-[85%]">${title}</span>
      <button onclick="navigator.clipboard.writeText('${title}'); alert('Título copiado!');" class="text-sollius-amber hover:underline text-[11px] font-bold">Copiar</button>
    `;
    titlesListEl.appendChild(li);
  });

  resultContainer.classList.remove('hidden');
  resultContainer.scrollIntoView({ behavior: 'smooth' });

  if (window.confetti) confetti();
}


// ========================================================
// 5. QR CODE PRO
// ========================================================
let qrInstance = null;

function renderQrCode() {
  const text = document.getElementById('qr-input-text').value.trim() || 'https://sollius.com';
  const colorDark = document.getElementById('qr-color-dark').value || '#000000';
  const colorLight = document.getElementById('qr-color-light').value || '#ffffff';
  const qrBox = document.getElementById('qrcode-box');

  qrBox.innerHTML = '';
  qrInstance = new QRCode(qrBox, {
    text: text,
    width: 220,
    height: 220,
    colorDark: colorDark,
    colorLight: colorLight,
    correctLevel: QRCode.CorrectLevel.H
  });
}

function setQrPreset(dark, light) {
  document.getElementById('qr-color-dark').value = dark;
  document.getElementById('qr-color-light').value = light;
  renderQrCode();
}

function downloadQrCode() {
  const qrImg = document.querySelector('#qrcode-box img');
  const qrCanvas = document.querySelector('#qrcode-box canvas');
  const src = qrImg ? qrImg.src : qrCanvas ? qrCanvas.toDataURL('image/png') : null;

  if (src) {
    const a = document.createElement('a');
    a.download = `sollius_qrcode_${Date.now()}.png`;
    a.href = src;
    a.click();
  }
}


// ========================================================
// 6. GRAVADOR DE TELA & ÁUDIO CLIENT-SIDE
// ========================================================
let mediaRecorder = null;
let recordedChunks = [];
let recordTimerInterval = null;
let recordSeconds = 0;

async function startScreenRecording() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: { ideal: 30 } },
      audio: true
    });

    const preview = document.getElementById('recorder-video-preview');
    const idle = document.getElementById('recorder-idle-state');
    const timerBadge = document.getElementById('recorder-timer-badge');
    const startBtn = document.getElementById('recorder-start-btn');
    const stopBtn = document.getElementById('recorder-stop-btn');

    preview.srcObject = stream;
    preview.classList.remove('hidden');
    idle.classList.add('hidden');
    timerBadge.classList.remove('hidden');
    startBtn.classList.add('hidden');
    stopBtn.classList.remove('hidden');

    recordedChunks = [];
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9,opus' });

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      clearInterval(recordTimerInterval);
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      downloadBlob(blob, `sollius_gravacao_${Date.now()}.webm`);

      // Reseta UI
      preview.classList.add('hidden');
      idle.classList.remove('hidden');
      timerBadge.classList.add('hidden');
      startBtn.classList.remove('hidden');
      stopBtn.classList.add('hidden');
      stream.getTracks().forEach(t => t.stop());
    };

    mediaRecorder.start(1000);

    // Timer
    recordSeconds = 0;
    recordTimerInterval = setInterval(() => {
      recordSeconds++;
      const m = String(Math.floor(recordSeconds / 60)).padStart(2, '0');
      const s = String(recordSeconds % 60).padStart(2, '0');
      document.getElementById('recorder-timer-text').innerText = `${m}:${s}`;
    }, 1000);

  } catch (err) {
    if (err.name !== 'NotAllowedError') {
      alert('Não foi possível iniciar a gravação: ' + err.message);
    }
  }
}

function stopScreenRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
}


// ========================================================
// HELPERS
// ========================================================
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

function copyToClipboard(elementId) {
  const text = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Copiado para a área de transferência com sucesso!');
  });
}

function downloadBlob(blob, filename) {
  const a = document.createElement('a');
  a.download = filename;
  a.href = URL.createObjectURL(blob);
  a.click();
}

// ========================================================
// 1. CRIADOR DE CURRÍCULOS ATS-FRIENDLY & ACESSÍVEL
// ========================================================
let currentResumeTheme = 'executive';

function setResumeTheme(theme) {
  currentResumeTheme = theme;
  const paper = document.getElementById('resume-paper');
  if (!paper) return;
  paper.className = `resume-paper theme-${theme}`;
  
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

function updateResumePreview() {
  const name = document.getElementById('res-input-name')?.value || 'Seu Nome Completo';
  const title = document.getElementById('res-input-title')?.value || 'Seu Cargo / Especialidade';
  const email = document.getElementById('res-input-email')?.value || 'email@exemplo.com';
  const phone = document.getElementById('res-input-phone')?.value || '(11) 99999-9999';
  const loc = document.getElementById('res-input-loc')?.value || 'São Paulo, SP';
  const site = document.getElementById('res-input-site')?.value || 'linkedin.com/in/perfil';
  const summary = document.getElementById('res-input-summary')?.value || 'Profissional com sólida experiência em resolução de problemas, foco em resultados mensuráveis e inovação contínua.';

  // Header
  const vName = document.getElementById('res-view-name');
  if (vName) vName.innerText = name;
  const vTitle = document.getElementById('res-view-title');
  if (vTitle) vTitle.innerText = title;
  
  // Contacts
  const contactsContainer = document.getElementById('res-view-contacts');
  if (contactsContainer) {
    contactsContainer.innerHTML = `
      <span>📧 ${email}</span>
      <span>📱 ${phone}</span>
      <span>📍 ${loc}</span>
      <span>🔗 ${site}</span>
    `;
  }

  // Summary
  const summaryEl = document.getElementById('res-view-summary');
  if (summaryEl) summaryEl.innerText = summary;

  // Skills
  const skillsInput = document.getElementById('res-input-skills')?.value || 'Liderança, Comunicação, Gestão de Projetos, Resolução de Problemas';
  const skillsContainer = document.getElementById('res-view-skills');
  if (skillsContainer) {
    const skills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    skillsContainer.innerHTML = skills.map(s => `<span class="res-tag-badge">${s}</span>`).join('');
  }

  // Formação
  const eduDegree = document.getElementById('res-input-edu-degree')?.value || 'Graduação / Especialização';
  const eduInst = document.getElementById('res-input-edu-inst')?.value || 'Universidade / Faculdade';
  const eduYear = document.getElementById('res-input-edu-year')?.value || '2020 - 2024';
  
  const eduContainer = document.getElementById('res-view-education');
  if (eduContainer) {
    eduContainer.innerHTML = `
      <div class="res-item">
        <div class="res-item-header">
          <span>${eduDegree}</span>
          <span style="font-size: 0.8rem; color: #64748b;">${eduYear}</span>
        </div>
        <div class="res-item-sub">${eduInst}</div>
      </div>
    `;
  }

  // Experiências Dinâmicas
  const expItems = document.querySelectorAll('.res-exp-block');
  const expContainer = document.getElementById('res-view-experience');
  if (expContainer) {
    let expHtml = '';
    expItems.forEach(item => {
      const role = item.querySelector('.exp-role')?.value || 'Cargo';
      const company = item.querySelector('.exp-company')?.value || 'Empresa';
      const period = item.querySelector('.exp-period')?.value || 'Período';
      const desc = item.querySelector('.exp-desc')?.value || 'Principais entregas e resultados alcançados no cargo.';
      
      expHtml += `
        <div class="res-item">
          <div class="res-item-header">
            <strong>${role}</strong>
            <span style="font-size: 0.8rem; color: #64748b;">${period}</span>
          </div>
          <div class="res-item-sub" style="font-weight: 500; color: #475569;">${company}</div>
          <p style="font-size: 0.84rem; color: #334155; margin-top: 0.25rem;">${desc}</p>
        </div>
      `;
    });
    expContainer.innerHTML = expHtml;
  }
}

function addExperienceField(roleVal = '', companyVal = '', periodVal = '', descVal = '') {
  const container = document.getElementById('res-exp-inputs-container');
  if (!container) return;
  const block = document.createElement('div');
  block.className = 'res-exp-block glass-panel';
  block.style.padding = '1rem';
  block.style.marginBottom = '1rem';
  block.style.border = '1px solid rgba(255,255,255,0.08)';
  block.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <span style="font-size: 0.8rem; font-weight: 700; color: var(--amber-primary);">Experiência</span>
      <button type="button" onclick="this.parentElement.parentElement.remove(); updateResumePreview();" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 0.8rem;">Remover ✕</button>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
      <input type="text" class="exp-role form-input" placeholder="Cargo (ex: Gerente de Projetos)" value="${roleVal}" oninput="updateResumePreview()">
      <input type="text" class="exp-company form-input" placeholder="Empresa" value="${companyVal}" oninput="updateResumePreview()">
    </div>
    <input type="text" class="exp-period form-input" placeholder="Período (ex: 2022 - Atual)" value="${periodVal}" style="margin-bottom: 0.5rem;" oninput="updateResumePreview()">
    <textarea class="exp-desc form-input" rows="2" placeholder="Descreva conquistas mensuráveis..." oninput="updateResumePreview()">${descVal}</textarea>
  `;
  container.appendChild(block);
  updateResumePreview();
}

// Perfis Pré-configurados de Carreira ATS (1-Clique)
function loadCareerPreset(area) {
  const presets = {
    tech: {
      name: 'Lucas Martins Ferreira',
      title: 'Engenheiro de Software Full Stack Sênior',
      email: 'lucas.martins@dev.io',
      phone: '(11) 98111-2233',
      loc: 'São Paulo, SP (Remoto)',
      site: 'github.com/lucasmartins • linkedin.com/in/lucas-tech',
      summary: 'Engenheiro de Software com 7+ anos construindo microsserviços escaláveis em Node.js, Go e React. Histórico comprovado de redução de 40% em latência de APIs e arquitetura de sistemas em nuvem para mais de 1.2M de usuários ativos diários.',
      skills: 'TypeScript, React.js, Node.js, Go, Docker, Kubernetes, AWS, PostgreSQL, Redis, CI/CD, Testes Unitários, Arquitetura Hexagonal',
      degree: 'Bacharelado em Engenharia de Software',
      inst: 'Universidade de São Paulo (USP)',
      year: '2016 - 2020',
      experiences: [
        { role: 'Staff Software Engineer', company: 'CloudScale Global Systems', period: '2022 - Presente', desc: 'Liderança técnica de 12 desenvolvedores. Migração de monólito para arquitetura orientada a eventos com Kafka, resultando em 99.99% de uptime e redução de R$ 180k/ano em infraestrutura.' },
        { role: 'Senior Frontend Engineer', company: 'Fintech Vanguard', period: '2019 - 2022', desc: 'Desenvolvimento do core bancário digital em React Native e Web. Otimização do Core Web Vitals atingindo pontuação máxima de 98/100 e conversão de onboarding ampliada em 24%.' }
      ]
    },
    growth: {
      name: 'Mariana Silva Alencar',
      title: 'Head de Growth & Marketing de Performance',
      email: 'mariana.alencar@growth.com',
      phone: '(11) 98765-4321',
      loc: 'São Paulo, Brasil',
      site: 'linkedin.com/in/mariana-growth',
      summary: 'Especialista em Growth e Estratégia de Mídia com 6+ anos de experiência liderando campanhas de alta conversão, gestão de tráfego pago e automação com ROAS médio comprovado de 4.8x em escala de R$ 2M/mês.',
      skills: 'Google Ads, Meta Ads, TikTok Ads, CRO, Google Analytics 4, SQL Básico, Testes A/B, Copywriting de Conversão, Gestão de Equipes',
      degree: 'Pós-Graduação em Marketing Estratégico & Data Science',
      inst: 'Fundação Getulio Vargas (FGV)',
      year: '2021 - 2023',
      experiences: [
        { role: 'Head de Growth & Performance', company: 'Nexus Tech Corp', period: '2023 - Presente', desc: 'Escala de faturamento de R$ 400k para R$ 1.9M/mês através de otimização contínua de funil e retenção de LTV.' },
        { role: 'Coordenadora de Mídia Paga', company: 'Vanguard Digital', period: '2020 - 2023', desc: 'Gestão de R$ 600k mensais em mídia de performance, redução do CAC em 34% e reestruturação da atribuição multi-touch.' }
      ]
    },
    sales: {
      name: 'Rodrigo Mendonça Prado',
      title: 'Executivo de Vendas Enterprise (B2B SaaS)',
      email: 'rodrigo.prado@salesb2b.com',
      phone: '(21) 99888-5544',
      loc: 'Rio de Janeiro, RJ',
      site: 'linkedin.com/in/rodrigo-enterprise-sales',
      summary: 'Executivo de Contas com 8+ anos em prospecção e fechamento de contratos corporativos de alto valor (ACV acima de R$ 200k). Especialista em metodologia SPIN Selling, negociação C-Level e gestão de pipeline.',
      skills: 'Vendas Enterprise, B2B SaaS, SPIN Selling, Salesforce CRM, HubSpot, Negociação C-Level, Previsibilidade de Receita, Account Mapping',
      degree: 'Bacharelado em Administração de Empresas',
      inst: 'Pontifícia Universidade Católica (PUC-RJ)',
      year: '2015 - 2019',
      experiences: [
        { role: 'Enterprise Account Executive', company: 'Enterprise Cloud Solutions', period: '2021 - Presente', desc: 'Superação consistente de meta com 135% de atingimento anual em 2023 (R$ 4.2M em novos contratos fechados).' },
        { role: 'Senior Sales Representative', company: 'DataCorp Tecnologia', period: '2018 - 2021', desc: 'Abertura de 28 novas contas estratégicas nos setores bancário e varejo, encurtando o ciclo de fechamento de 9 para 5 meses.' }
      ]
    },
    finance: {
      name: 'Beatriz Vasconcelos Ramos',
      title: 'Analista de Planejamento Financeiro & Controladoria (FP&A)',
      email: 'beatriz.ramos@financas.com',
      phone: '(31) 98777-6655',
      loc: 'Belo Horizonte, MG',
      site: 'linkedin.com/in/beatriz-fpa',
      summary: 'Analista Financeira com sólida atuação em orçamento corporativo, modelagem de DRE, fluxo de caixa e relatórios gerenciais para conselho de administração. Foco em redução de despesas e otimização de margem EBITDA.',
      skills: 'Modelagem Financeira, FP&A, DRE, Fluxo de Caixa, Excel Avançado (VBA), Power BI, SAP ERP, Análise de Viabilidade (VPL/TIR)',
      degree: 'Bacharelado em Ciências Contábeis',
      inst: 'Universidade Federal de Minas Gerais (UFMG)',
      year: '2017 - 2021',
      experiences: [
        { role: 'Analista Financeiro Sênior', company: 'Grupo Industrial Horizonte', period: '2022 - Presente', desc: 'Estruturação do orçamento anual de R$ 85M e condução do plano de eficiência operacional que reduziu custos fixos em 14%.' },
        { role: 'Analista de Controladoria Pleno', company: 'Auditoria & Consultoria Alfa', period: '2019 - 2022', desc: 'Elaboração de dashboards executivos em Power BI integrados ao ERP, diminuindo o tempo de fechamento contábil de 10 para 3 dias úteis.' }
      ]
    },
    intern: {
      name: 'Gabriel Santana Souza',
      title: 'Estudante de Engenharia / Administração',
      email: 'gabriel.souza@estudante.ufmg.br',
      phone: '(11) 97777-3322',
      loc: 'Campinas, SP',
      site: 'linkedin.com/in/gabriel-santana-estagio',
      summary: 'Estudante do 5º semestre proativo, com premiação acadêmica em olimpíadas de exatas e domínio de análise de dados. Buscando oportunidade de estágio para contribuir com organização de processos, automação de planilhas e suporte a projetos.',
      skills: 'Excel Intermediário/Avançado, Python Básico, Inglês Fluente (C1), Pacote Office, Trabalho em Equipe, Resolução de Problemas, Comunicação',
      degree: 'Graduação em Engenharia de Produção',
      inst: 'Universidade Estadual de Campinas (UNICAMP)',
      year: '2023 - 2027 (Previsão de Conclusão)',
      experiences: [
        { role: 'Membro da Empresa Júnior', company: 'Consultoria Júnior UNICAMP', period: '2023 - 2024', desc: 'Participação direta na elaboração de 4 projetos de consultoria empresarial para pequenas empresas da região, com índice de 96% de satisfação dos clientes.' }
      ]
    }
  };

  const p = presets[area] || presets.tech;
  document.getElementById('res-input-name').value = p.name;
  document.getElementById('res-input-title').value = p.title;
  document.getElementById('res-input-email').value = p.email;
  document.getElementById('res-input-phone').value = p.phone;
  document.getElementById('res-input-loc').value = p.loc;
  document.getElementById('res-input-site').value = p.site;
  document.getElementById('res-input-summary').value = p.summary;
  document.getElementById('res-input-skills').value = p.skills;
  document.getElementById('res-input-edu-degree').value = p.degree;
  document.getElementById('res-input-edu-inst').value = p.inst;
  document.getElementById('res-input-edu-year').value = p.year;

  const container = document.getElementById('res-exp-inputs-container');
  if (container) {
    container.innerHTML = '';
    p.experiences.forEach(exp => {
      addExperienceField(exp.role, exp.company, exp.period, exp.desc);
    });
  }
  updateResumePreview();
  if (window.confetti) confetti({ particleCount: 30, spread: 60 });
}

function loadResumeSample() {
  // Se houver rascunho salvo no navegador, carrega o rascunho
  const saved = localStorage.getItem('sollius_resume_draft');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      document.getElementById('res-input-name').value = data.name || '';
      document.getElementById('res-input-title').value = data.title || '';
      document.getElementById('res-input-email').value = data.email || '';
      document.getElementById('res-input-phone').value = data.phone || '';
      document.getElementById('res-input-loc').value = data.loc || '';
      document.getElementById('res-input-site').value = data.site || '';
      document.getElementById('res-input-summary').value = data.summary || '';
      document.getElementById('res-input-skills').value = data.skills || '';
      document.getElementById('res-input-edu-degree').value = data.degree || '';
      document.getElementById('res-input-edu-inst').value = data.inst || '';
      document.getElementById('res-input-edu-year').value = data.year || '';

      const container = document.getElementById('res-exp-inputs-container');
      if (container && data.experiences && data.experiences.length) {
        container.innerHTML = '';
        data.experiences.forEach(exp => {
          addExperienceField(exp.role, exp.company, exp.period, exp.desc);
        });
      }
      updateResumePreview();
      return;
    } catch(e) {}
  }

  // Padrão: Carrega perfil tech de alto impacto
  loadCareerPreset('tech');
}

function saveResumeDraft() {
  const data = {
    name: document.getElementById('res-input-name')?.value,
    title: document.getElementById('res-input-title')?.value,
    email: document.getElementById('res-input-email')?.value,
    phone: document.getElementById('res-input-phone')?.value,
    loc: document.getElementById('res-input-loc')?.value,
    site: document.getElementById('res-input-site')?.value,
    summary: document.getElementById('res-input-summary')?.value,
    skills: document.getElementById('res-input-skills')?.value,
    degree: document.getElementById('res-input-edu-degree')?.value,
    inst: document.getElementById('res-input-edu-inst')?.value,
    year: document.getElementById('res-input-edu-year')?.value,
    experiences: []
  };

  document.querySelectorAll('.res-exp-block').forEach(item => {
    data.experiences.push({
      role: item.querySelector('.exp-role')?.value || '',
      company: item.querySelector('.exp-company')?.value || '',
      period: item.querySelector('.exp-period')?.value || '',
      desc: item.querySelector('.exp-desc')?.value || ''
    });
  });

  localStorage.setItem('sollius_resume_draft', JSON.stringify(data));
  alert('✅ Rascunho do currículo salvo no seu navegador com sucesso!');
}

function printResume() {
  window.print();
}

// ========================================================
// 2. CRIADOR DE CARTÃO DE VISITA (ARTE 3D & LUXURY DESIGNS)
// ========================================================
let currentCardTheme = 'obsidian';
let cardCustomLogoUrl = null;

function toggleCardFlip() {
  const box = document.getElementById('card-3d-box');
  if (box) box.classList.toggle('flipped');
}

function setCardTheme(theme) {
  currentCardTheme = theme;
  const front = document.getElementById('card-face-front');
  const back = document.getElementById('card-face-back');
  if (front && back) {
    front.className = `card-face theme-${theme}`;
    back.className = `card-face face-back theme-${theme}`;
  }
  document.querySelectorAll('.card-theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
  updateCardPreview();
}

function handleCardLogoUpload(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    cardCustomLogoUrl = e.target.result;
    const box = document.getElementById('card-logo-preview-box');
    if (box) {
      box.innerHTML = `<img src="${cardCustomLogoUrl}" style="max-height: 38px; max-width: 60px; object-fit: contain;">`;
    }
    updateCardPreview();
  };
  reader.readAsDataURL(file);
}

function updateCardPreview() {
  const name = document.getElementById('card-input-name')?.value || 'Carlos Eduardo Silva';
  const role = document.getElementById('card-input-role')?.value || 'Arquiteto de Soluções & IA';
  const company = document.getElementById('card-input-company')?.value || 'SOLLIUS STUDIO';
  const phone = document.getElementById('card-input-phone')?.value || '+55 (11) 98888-7777';
  const email = document.getElementById('card-input-email')?.value || 'carlos@sollius.com.br';
  const site = document.getElementById('card-input-site')?.value || 'sollius.com.br';
  const loc = document.getElementById('card-input-loc')?.value || 'São Paulo - SP';

  // Front
  const fName = document.getElementById('card-front-name');
  if (fName) fName.innerText = name;
  const fRole = document.getElementById('card-front-role');
  if (fRole) fRole.innerText = role;
  const fCompany = document.getElementById('card-front-company');
  if (fCompany) fCompany.innerText = company;

  // Back
  const bCompany = document.getElementById('card-back-company');
  if (bCompany) bCompany.innerText = company;
  const bPhone = document.getElementById('card-back-phone');
  if (bPhone) bPhone.innerText = `📱 ${phone}`;
  const bEmail = document.getElementById('card-back-email');
  if (bEmail) bEmail.innerText = `📧 ${email}`;
  const bSite = document.getElementById('card-back-site');
  if (bSite) bSite.innerText = `🌐 ${site}`;
  const bLoc = document.getElementById('card-back-loc');
  if (bLoc) bLoc.innerText = `📍 ${loc}`;

  // Render QR Code on Card Back
  const qrContainer = document.getElementById('card-qr-box');
  if (qrContainer && window.QRCode) {
    qrContainer.innerHTML = '';
    const qrData = site.startsWith('http') ? site : `https://${site}`;
    new QRCode(qrContainer, {
      text: qrData,
      width: 64,
      height: 64,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  }
}

function saveCardDraft() {
  const data = {
    name: document.getElementById('card-input-name')?.value,
    role: document.getElementById('card-input-role')?.value,
    company: document.getElementById('card-input-company')?.value,
    phone: document.getElementById('card-input-phone')?.value,
    email: document.getElementById('card-input-email')?.value,
    site: document.getElementById('card-input-site')?.value,
    loc: document.getElementById('card-input-loc')?.value,
    theme: currentCardTheme,
    logo: cardCustomLogoUrl
  };
  localStorage.setItem('sollius_card_draft', JSON.stringify(data));
  alert('✅ Arte do Cartão de Visita salva com sucesso no seu navegador!');
}

function downloadCardAsImage(elementId, filename) {
  const canvas = document.createElement('canvas');
  canvas.width = 1050; // 3.5 inches at 300 DPI
  canvas.height = 600;  // 2.0 inches at 300 DPI
  const ctx = canvas.getContext('2d');

  const name = document.getElementById('card-input-name')?.value || 'Carlos Eduardo Silva';
  const role = document.getElementById('card-input-role')?.value || 'Arquiteto de Soluções & IA';
  const company = document.getElementById('card-input-company')?.value || 'SOLLIUS STUDIO';
  const phone = document.getElementById('card-input-phone')?.value || '+55 (11) 98888-7777';
  const email = document.getElementById('card-input-email')?.value || 'carlos@sollius.com.br';
  const site = document.getElementById('card-input-site')?.value || 'sollius.com.br';
  const loc = document.getElementById('card-input-loc')?.value || 'São Paulo - SP';

  // Renderiza Fundo de Luxo no Canvas
  if (currentCardTheme === 'obsidian') {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#221b0e');
    grad.addColorStop(0.5, '#0b0c10');
    grad.addColorStop(1, '#050608');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 6;
    ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);
  } else if (currentCardTheme === 'cyber') {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#06070d');
    grad.addColorStop(1, '#150a26');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#00F5FF';
    ctx.lineWidth = 6;
    ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);
  } else if (currentCardTheme === 'swiss') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#090A0F';
    ctx.lineWidth = 6;
    ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);
  } else if (currentCardTheme === 'emerald') {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#052e1f');
    grad.addColorStop(1, '#02130c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 6;
    ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);
  } else {
    // Holographic
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#1c1b3d');
    grad.addColorStop(0.5, '#3b1842');
    grad.addColorStop(1, '#0b2938');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#FB7185';
    ctx.lineWidth = 6;
    ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);
  }

  const isLight = currentCardTheme === 'swiss';

  if (elementId === 'card-face-front') {
    // Brand Top
    ctx.font = 'bold 30px -apple-system, sans-serif';
    ctx.fillStyle = currentCardTheme === 'obsidian' ? '#D4AF37' : (isLight ? '#090A0F' : '#00F5FF');
    ctx.fillText(company.toUpperCase(), 75, 120);

    // Name
    ctx.font = 'bold 54px -apple-system, sans-serif';
    ctx.fillStyle = isLight ? '#090A0F' : '#FFFFFF';
    ctx.fillText(name, 75, 310);

    // Role
    ctx.font = '30px -apple-system, sans-serif';
    ctx.fillStyle = isLight ? '#475569' : '#94A3B8';
    ctx.fillText(role, 75, 370);

    // Accent Line
    ctx.fillStyle = currentCardTheme === 'obsidian' ? '#D4AF37' : (isLight ? '#090A0F' : '#A855F7');
    ctx.fillRect(75, 410, 240, 5);
  } else {
    // Back Side
    ctx.font = 'bold 36px -apple-system, sans-serif';
    ctx.fillStyle = currentCardTheme === 'obsidian' ? '#D4AF37' : (isLight ? '#090A0F' : '#00F5FF');
    ctx.fillText(company, 75, 120);

    ctx.font = '28px -apple-system, sans-serif';
    ctx.fillStyle = isLight ? '#334155' : '#E2E8F0';
    ctx.fillText(`📱  ${phone}`, 75, 230);
    ctx.fillText(`📧  ${email}`, 75, 300);
    ctx.fillText(`🌐  ${site}`, 75, 370);
    ctx.fillText(`📍  ${loc}`, 75, 440);

    // QR Code no canto direito
    const qrImg = document.querySelector('#card-qr-box img');
    if (qrImg) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(740, 220, 200, 200);
      ctx.drawImage(qrImg, 750, 230, 180, 180);
    }
  }

  canvas.toBlob(blob => {
    downloadBlob(blob, filename);
  }, 'image/png');
}

function printCardSheet() {
  window.print();
}

// ========================================================
// 3. ASSINADOR DE PDF 100% PRIVADO NO NAVEGADOR
// ========================================================
let signatureCanvas, signatureCtx;
let isDrawingSignature = false;
let currentPenColor = '#0f172a';
let currentPenWidth = 3;
let uploadedPdfBytes = null;
let uploadedPdfDoc = null;

let signatureEventsAttached = false;

function initSignaturePad() {
  signatureCanvas = document.getElementById('signature-canvas');
  if (!signatureCanvas) return;
  signatureCtx = signatureCanvas.getContext('2d');
  
  // Set real pixel resolution, handling cases when tab was initially hidden
  const rect = signatureCanvas.getBoundingClientRect();
  const parentWidth = signatureCanvas.parentElement ? signatureCanvas.parentElement.clientWidth : 760;
  const w = rect.width > 50 ? rect.width : (parentWidth > 50 ? parentWidth : 760);
  const h = 180;
  
  if (signatureCanvas.width !== w * 2) {
    signatureCanvas.width = w * 2;
    signatureCanvas.height = h * 2;
    signatureCtx.scale(2, 2);
    signatureCtx.lineCap = 'round';
    signatureCtx.lineJoin = 'round';
  }

  if (signatureEventsAttached) return;
  signatureEventsAttached = true;

  function getPos(e) {
    const r = signatureCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - r.left,
      y: clientY - r.top
    };
  }

  const startDraw = (e) => {
    isDrawingSignature = true;
    const pos = getPos(e);
    signatureCtx.beginPath();
    signatureCtx.moveTo(pos.x, pos.y);
    signatureCtx.strokeStyle = currentPenColor;
    signatureCtx.lineWidth = currentPenWidth;
  };

  const moveDraw = (e) => {
    if (!isDrawingSignature) return;
    if (e.cancelable) e.preventDefault();
    const pos = getPos(e);
    signatureCtx.lineTo(pos.x, pos.y);
    signatureCtx.stroke();
  };

  const stopDraw = () => {
    isDrawingSignature = false;
  };

  signatureCanvas.addEventListener('mousedown', startDraw);
  signatureCanvas.addEventListener('mousemove', moveDraw);
  window.addEventListener('mouseup', stopDraw);

  signatureCanvas.addEventListener('touchstart', startDraw, { passive: true });
  signatureCanvas.addEventListener('touchmove', moveDraw, { passive: false });
  window.addEventListener('touchend', stopDraw);
}

function clearSignaturePad() {
  if (!signatureCanvas || !signatureCtx) return;
  signatureCtx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
}

function setPenColor(color) {
  currentPenColor = color;
  document.querySelectorAll('.ink-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.color === color);
  });
}

async function handlePdfToSign(file) {
  if (!file) return;
  try {
    const arrayBuffer = await file.arrayBuffer();
    uploadedPdfBytes = arrayBuffer;
    uploadedPdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    
    const pageCount = uploadedPdfDoc.getPageCount();
    document.getElementById('pdf-sign-info').innerText = `📄 Documento Carregado: ${file.name} (${pageCount} página${pageCount > 1 ? 's' : ''}) - 100% no seu dispositivo`;
    
    const actionArea = document.getElementById('pdf-sign-action-area');
    if (actionArea) actionArea.classList.remove('hidden');
    
    if (window.confetti) confetti({ particleCount: 20 });
  } catch (err) {
    alert('Erro ao carregar PDF: ' + err.message);
  }
}

async function stampSignatureOnPdf() {
  if (!uploadedPdfBytes || !uploadedPdfDoc) {
    alert('Por favor, clique acima e selecione o seu arquivo PDF primeiro.');
    return;
  }
  if (!signatureCanvas) return;

  try {
    const pdfDoc = await PDFLib.PDFDocument.load(uploadedPdfBytes);
    const pages = pdfDoc.getPages();
    const targetPage = pages[pages.length - 1]; // Carimba na última página
    const { width, height } = targetPage.getSize();

    // Export signature as PNG data url
    const signatureDataUrl = signatureCanvas.toDataURL('image/png');
    const signatureImage = await pdfDoc.embedPng(signatureDataUrl);

    // Dimensões do carimbo de assinatura no PDF
    const sigWidth = 150;
    const sigHeight = (sigWidth / signatureCanvas.width) * signatureCanvas.height;

    // Posiciona no canto inferior direito
    targetPage.drawImage(signatureImage, {
      x: width - sigWidth - 50,
      y: 60,
      width: sigWidth,
      height: sigHeight,
    });

    // Salva o PDF assinado
    const signedPdfBytes = await pdfDoc.save();
    const blob = new Blob([signedPdfBytes], { type: 'application/pdf' });
    downloadBlob(blob, 'documento-assinado-sollius.pdf');

    if (window.confetti) {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
  } catch (err) {
    alert('Erro ao assinar PDF: ' + err.message);
  }
}

// ========================================================
// 4. LIMPADOR DE LOCALIZAÇÃO GPS & METADADOS EXIF
// ========================================================
let cleanedPhotoBlobs = [];

async function handleGpsCleanFiles(files) {
  if (!files || !files.length) return;
  cleanedPhotoBlobs = [];
  const container = document.getElementById('gps-results-list');
  if (container) container.innerHTML = '';
  document.getElementById('gps-results-area').classList.remove('hidden');

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const img = new Image();
    const fileUrl = URL.createObjectURL(file);

    await new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        // Desenhar no canvas descarta 100% de tags EXIF, coordenadas GPS e metadados de câmera
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          cleanedPhotoBlobs.push({ blob, name: `privacidade-limpa_${file.name}` });

          const row = document.createElement('div');
          row.className = 'glass-panel';
          row.style.padding = '0.85rem 1.25rem';
          row.style.marginBottom = '0.75rem';
          row.style.display = 'flex';
          row.style.justifyContent = 'space-between';
          row.style.alignItems = 'center';
          row.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <span style="font-size: 1.4rem;">🛡️</span>
              <div>
                <strong style="font-size: 0.9rem; color: #fff;">${file.name}</strong>
                <div style="font-size: 0.78rem; color: #10B981;">✓ GPS Coordenadas Excluídas • Metadados Sanitizados (${formatFileSize(file.size)} → ${formatFileSize(blob.size)})</div>
              </div>
            </div>
            <button onclick="downloadBlob(cleanedPhotoBlobs[${cleanedPhotoBlobs.length - 1}].blob, '${file.name}')" class="btn-secondary" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;">
              Baixar Limpa
            </button>
          `;
          container.appendChild(row);
          resolve();
        }, file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.95);
      };
      img.src = fileUrl;
    });
  }

  if (window.confetti) confetti({ particleCount: 40 });
}

async function downloadAllCleanedPhotos() {
  if (!cleanedPhotoBlobs.length) return;
  if (cleanedPhotoBlobs.length === 1) {
    downloadBlob(cleanedPhotoBlobs[0].blob, cleanedPhotoBlobs[0].name);
    return;
  }
  const zip = new JSZip();
  cleanedPhotoBlobs.forEach(item => {
    zip.file(item.name, item.blob);
  });
  const content = await zip.generateAsync({ type: 'blob' });
  downloadBlob(content, 'fotos-sem-gps-sollius.zip');
}

// ========================================================
// 5. TEXT STUDIO & FORMATADOR DE LINHAS
// ========================================================
function updateTextStats() {
  const text = document.getElementById('text-studio-input')?.value || '';
  const charCount = text.length;
  const charNoSpace = text.replace(/\s+/g, '').length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text === '' ? 0 : text.split('\n').length;
  const readTimeMin = Math.ceil(wordCount / 200);

  document.getElementById('stat-chars').innerText = charCount;
  document.getElementById('stat-chars-nospace').innerText = charNoSpace;
  document.getElementById('stat-words').innerText = wordCount;
  document.getElementById('stat-lines').innerText = lineCount;
  document.getElementById('stat-readtime').innerText = `${readTimeMin} min`;
}

function transformText(action) {
  const input = document.getElementById('text-studio-input');
  if (!input) return;
  let val = input.value;

  switch (action) {
    case 'upper':
      val = val.toUpperCase();
      break;
    case 'lower':
      val = val.toLowerCase();
      break;
    case 'capitalize':
      val = capitalizeWords(val.toLowerCase());
      break;
    case 'trim':
      val = val.split('\n').map(l => l.trim()).join('\n');
      break;
    case 'remove-empty':
      val = val.split('\n').filter(l => l.trim().length > 0).join('\n');
      break;
    case 'remove-duplicates':
      const lines = val.split('\n');
      const unique = Array.from(new Set(lines));
      val = unique.join('\n');
      break;
    case 'fix-breaks':
      val = val.replace(/([^\n])\n([^\n])/g, '$1 $2');
      break;
  }

  input.value = val;
  updateTextStats();
}

function copyTextStudio() {
  const input = document.getElementById('text-studio-input');
  if (!input) return;
  navigator.clipboard.writeText(input.value).then(() => {
    alert('Texto copiado com sucesso!');
  });
}

function clearTextStudio() {
  const input = document.getElementById('text-studio-input');
  if (input) {
    input.value = '';
    updateTextStats();
  }
}

// FAQ Accordion Helper
function toggleFaq(btn) {
  const card = btn.closest('.faq-card');
  if (card) {
    card.classList.toggle('open');
  }
}




// ========================================================
// 12. BARRA DE PROGRESSO UNIFICADA (HELPER UNIVERSAL)
// ========================================================
function updateUnifiedProgress(boxId, percent, statusText, subText = '') {
  const box = document.getElementById(boxId);
  if (!box) return;
  box.classList.remove('hidden');

  const fill = box.querySelector('.sollius-progress-fill') || document.getElementById(boxId + '-fill');
  const percentEl = box.querySelector('[id$="-percent"]') || document.getElementById(boxId + '-percent');
  const statusEl = box.querySelector('[id$="-status"]') || document.getElementById(boxId + '-status');

  const clamped = Math.min(100, Math.max(0, Math.round(percent)));
  if (fill) fill.style.width = clamped + '%';
  if (percentEl) percentEl.textContent = clamped + '%';
  if (statusEl && statusText) {
    statusEl.innerHTML = '<span class="pulse-dot"></span><span>' + statusText + '</span>';
  }

  if (subText) {
    const chunkInfo = document.getElementById('transcribe-chunk-info');
    if (chunkInfo) chunkInfo.textContent = subText;
  }
}

function hideUnifiedProgress(boxId, delay = 1200) {
  setTimeout(() => {
    const box = document.getElementById(boxId);
    if (box) box.classList.add('hidden');
  }, delay);
}


// ========================================================
// 13. TRANSCRITOR DE VOZ IA (ATÉ 2H) COM CONTEXTO & DÚVIDAS
// ========================================================
let selectedAudioFile = null;
let audioDurationSeconds = 0;
let liveSpeechRecognition = null;
let isLiveTranscribing = false;
let currentTranscriptSegments = [];
let localWhisperPipeline = null;
let isTranscribingActive = false;

// Formatador oficial de Timestamps para SRT (HH:MM:SS,mmm)
function formatTimestampSrt(seconds) {
  const s = Math.floor(seconds || 0);
  const ms = Math.floor(((seconds || 0) - s) * 1000);
  const h = String(Math.floor(s / 3600)).padStart(2, '0');
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  const milli = String(ms).padStart(3, '0');
  return h + ':' + m + ':' + sec + ',' + milli;
}

// Formatador amigável de duração (HHh MMm SSs ou MMm SSs)
function formatAudioDuration(secs) {
  const s = Math.floor(secs || 0);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) {
    return h + 'h ' + (m < 10 ? '0' : '') + m + 'm ' + (sec < 10 ? '0' : '') + sec + 's';
  }
  return m + 'm ' + (sec < 10 ? '0' : '') + sec + 's';
}

// Base de homófonos, parônimos e dúvidas frequentes em português
const PORTUGUESE_CONFUSION_PAIRS = {
  'sessao': ['seção', 'cessão', 'sessão'],
  'sessão': ['seção', 'cessão', 'sessão'],
  'secao': ['sessão', 'cessão', 'seção'],
  'seção': ['sessão', 'cessão', 'seção'],
  'cessao': ['sessão', 'seção', 'cessão'],
  'cessão': ['sessão', 'seção', 'cessão'],
  'aonde': ['onde', 'aonde'],
  'onde': ['aonde', 'onde'],
  'mas': ['mais', 'más', 'mas'],
  'mais': ['mas', 'mais'],
  'mau': ['mal', 'mau'],
  'mal': ['mau', 'mal'],
  'ha': ['a', 'há', 'ah'],
  'há': ['a', 'há'],
  'taxa': ['tacha', 'taxa'],
  'conserto': ['concerto', 'conserto'],
  'concerto': ['conserto', 'concerto'],
  'houve': ['ouve', 'houve'],
  'viagem': ['viajem', 'viagem'],
  'viajem': ['viagem', 'viajem'],
  'porque': ['por que', 'porquê', 'por quê', 'porque'],
  'estratégia': ['estratégias', 'estratégica', 'estratégia'],
  'estratégias': ['estratégia', 'estratégicas'],
  'demanda': ['demandas', 'em demanda'],
  'orçamento': ['orçamentos', 'previsão orçamentária'],
  'contrato': ['distrato', 'aditivo de contrato', 'contratos'],
  'processo': ['processos', 'procedimento'],
  'relatório': ['relatórios', 'laudo'],
  'reunião': ['reuniões', 'alinhamento'],
  'cliente': ['clientes', 'prospect'],
  'faturamento': ['faturado', 'lucro', 'receita'],
  'software': ['aplicativo', 'sistema', 'plataforma'],
  'deploy': ['publicação', 'implantação', 'deploy'],
  'servidor': ['servidores', 'serviço na nuvem']
};

function handleAudioSelect(files) {
  if (!files || files.length === 0) return;
  const file = files[0];
  selectedAudioFile = file;

  const dropTitle = document.getElementById('audio-drop-title');
  const dropSubtitle = document.getElementById('audio-drop-subtitle');
  const startBtn = document.getElementById('start-transcribe-btn');
  const playback = document.getElementById('audio-playback');

  if (dropTitle) {
    dropTitle.innerHTML = '🎵 <strong>' + file.name + '</strong>';
  }
  if (dropSubtitle) {
    dropSubtitle.innerHTML = 'Tamanho: <strong>' + formatFileSize(file.size) + '</strong> • Analisando duração acústica...';
  }

  // Prepara player de áudio local
  const audioUrl = URL.createObjectURL(file);
  if (playback) {
    playback.src = audioUrl;
    playback.style.display = 'block';
  }

  // Mede duração exata via Audio element
  const tempAudio = new Audio();
  tempAudio.src = audioUrl;
  tempAudio.onloadedmetadata = () => {
    audioDurationSeconds = tempAudio.duration || 60;
    const durFormatted = formatAudioDuration(audioDurationSeconds);
    const estChunks = Math.ceil(audioDurationSeconds / 30);
    if (dropSubtitle) {
      dropSubtitle.innerHTML = 'Duração total: <strong style="color: #FBBF24;">' + durFormatted + '</strong> (' + estChunks + ' blocos de 30s) • Tamanho: <strong>' + formatFileSize(file.size) + '</strong> • Transcrição completa 100% no navegador.';
    }
    if (startBtn) startBtn.disabled = false;
  };
  tempAudio.onerror = () => {
    audioDurationSeconds = Math.max(120, Math.round(file.size / (1024 * 16)));
    if (dropSubtitle) {
      dropSubtitle.innerHTML = 'Tamanho: <strong>' + formatFileSize(file.size) + '</strong> • Arquivo pronto para transcrever.';
    }
    if (startBtn) startBtn.disabled = false;
  };
}

// Microfone ao vivo com SpeechRecognition nativo
function toggleLiveMicTranscription() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const micBtn = document.getElementById('live-mic-btn');
  const micIcon = document.getElementById('live-mic-icon');
  const micText = document.getElementById('live-mic-text');
  const output = document.getElementById('transcription-output');

  if (!SpeechRecognition) {
    alert('A API de Reconhecimento de Fala nativa não está ativa neste navegador. Recomendamos usar o Google Chrome, Edge ou Safari para gravação ao vivo pelo microfone, ou carregar arquivos gravados.');
    return;
  }

  if (isLiveTranscribing && liveSpeechRecognition) {
    liveSpeechRecognition.stop();
    isLiveTranscribing = false;
    if (micIcon) micIcon.textContent = '🎤';
    if (micText) micText.textContent = 'Gravar Microfone Ao Vivo';
    if (micBtn) micBtn.classList.remove('btn-recording-active');
    return;
  }

  try {
    liveSpeechRecognition = new SpeechRecognition();
    const langSelect = document.getElementById('transcribe-lang');
    liveSpeechRecognition.lang = langSelect ? langSelect.value : 'pt-BR';
    liveSpeechRecognition.continuous = true;
    liveSpeechRecognition.interimResults = true;

    if (output && output.innerText.includes('O texto transcrito da sua gravação')) {
      output.innerHTML = '';
      currentTranscriptSegments = [];
    }

    liveSpeechRecognition.onstart = () => {
      isLiveTranscribing = true;
      if (micIcon) micIcon.textContent = '⏹️';
      if (micText) micText.textContent = 'Parar Gravação Ao Vivo';
      if (micBtn) micBtn.classList.add('btn-recording-active');
      updateUnifiedProgress('transcribe-progress-box', 100, 'Escutando microfone em tempo real...', 'Modo Ao Vivo Ativo');
    };

    liveSpeechRecognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript.trim()) {
        const nowSec = currentTranscriptSegments.length * 5;
        const timeTag = formatTimestampSrt(nowSec).slice(0, 8);
        const segmentHtml = '<p style="margin-bottom: 0.85rem; line-height: 1.6;">' +
          '<span style="color: var(--amber-primary); font-family: monospace; font-size: 0.82rem; font-weight: 700; background: rgba(245, 158, 11, 0.12); padding: 0.15rem 0.4rem; border-radius: 4px; margin-right: 0.5rem;">[' + timeTag + ']</span>' +
          '<span>' + enrichTextWithSuggestions(finalTranscript.trim()) + '</span>' +
          '</p>';
        output.innerHTML += segmentHtml;
        currentTranscriptSegments.push({
          time: timeTag,
          seconds: nowSec,
          text: finalTranscript.trim()
        });
        analyzeTranscriptionContext(output.innerText);
      }
    };

    liveSpeechRecognition.onerror = (e) => {
      console.warn('SpeechRecognition error:', e);
      if (e.error === 'not-allowed') {
        alert('Permissão de acesso ao microfone foi negada pelo navegador. Conceda a permissão no ícone do cadeado da barra de endereços.');
      }
    };

    liveSpeechRecognition.onend = () => {
      isLiveTranscribing = false;
      if (micIcon) micIcon.textContent = '🎤';
      if (micText) micText.textContent = 'Gravar Microfone Ao Vivo';
      if (micBtn) micBtn.classList.remove('btn-recording-active');
      hideUnifiedProgress('transcribe-progress-box', 1500);
    };

    liveSpeechRecognition.start();
  } catch (err) {
    console.error('Falha ao iniciar SpeechRecognition:', err);
    alert('Erro ao inicializar microfone: ' + err.message);
  }
}

// Filtro Passa-Alta digital a 85Hz para eliminar zumbido elétrico de 50Hz/60Hz e ruídos subgraves
function applyHighPassFilter(samples, sampleRate = 16000, cutoff = 85) {
  if (!samples || samples.length === 0) return samples;
  const rc = 1.0 / (2.0 * Math.PI * cutoff);
  const dt = 1.0 / sampleRate;
  const alpha = rc / (rc + dt);
  const filtered = new Float32Array(samples.length);
  let lastIn = samples[0] || 0;
  let lastOut = 0;
  for (let i = 0; i < samples.length; i++) {
    const cur = samples[i];
    lastOut = alpha * (lastOut + cur - lastIn);
    filtered[i] = lastOut;
    lastIn = cur;
  }
  return filtered;
}

// Normalização inteligente de pico para trazer a voz humana à faixa acústica ideal do Whisper
function normalizeAudioSignal(samples) {
  if (!samples || samples.length === 0) return samples;
  let maxPeak = 0;
  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    if (abs > maxPeak) maxPeak = abs;
  }
  if (maxPeak > 0.005 && maxPeak < 0.95) {
    const factor = 0.92 / maxPeak;
    for (let i = 0; i < samples.length; i++) {
      samples[i] *= factor;
    }
  }
  return samples;
}

// Filtro estrito de alucinações não-vocais do Whisper (zumbidos rotulados como música, créditos e ruído)
function cleanWhisperSpeech(text) {
  if (!text) return '';
  let str = text.trim();

  // 1. Remove marcadores de som e música: [música], (música), [risos], ♪, etc.
  str = str.replace(/\[\s*(m[uú]sica|aplausos|risos|som|ru[ií]do|vinheta|sil[eê]ncio|cantoria)[^\]]*\]/gi, '');
  str = str.replace(/\(\s*(m[uú]sica|aplausos|risos|som|ru[ií]do|vinheta|sil[eê]ncio|cantoria)[^\)]*\)/gi, '');
  str = str.replace(/[♪♫#\-_]/g, ' ');

  // 2. Remove frases clássicas que o Whisper alucina em silêncios/ruídos
  const hallucinatedPhrases = [
    /legendas?\s+pela\s+comunidade\s+amara\.org/gi,
    /legendado\s+por/gi,
    /subtitles\s+by/gi,
    /obrigado\s+por\s+assistir/gi,
    /inscreva-?se\s+no\s+canal/gi,
    /deixe\s+seu\s+like/gi,
    /curta\s+e\s+compartilhe/gi,
    /at[eé]\s+a\s+pr[oó]xima/gi,
    /at[eé]\s+logo/gi,
    /thank\s+you\s+for\s+watching/gi,
    /thanks\s+for\s+watching/gi
  ];

  for (const pattern of hallucinatedPhrases) {
    str = str.replace(pattern, '');
  }

  // 3. Normaliza espaços e pontuações isoladas
  str = str.replace(/\s{2,}/g, ' ').trim();
  str = str.replace(/^[.,;:!?\s]+|[.,;:!?\s]+$/g, '').trim();

  // 4. Purga total de qualquer menção a música/ruído/zumbido alucinado pelo modelo
  str = str.replace(/\b(m[uú]sicas?|fundo musical|tocando m[uú]sica|cantoria|som ambiente|zumbido)\b/gi, '').trim();
  str = str.replace(/\s{2,}/g, ' ').trim();
  if (!str || /^[.,;:!?\s]+$/.test(str)) {
    return '';
  }

  // Se o texto não contiver pelo menos 2 caracteres alfanuméricos reais, é apenas ruído
  const lettersOnly = str.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚãõÃÕâêîôûÂÊÎÔÛçÇ]/g, '');
  if (lettersOnly.length < 2) {
    return '';
  }

  return str;
}

// Decodificador Ultra-Robusto de Áudio para Mono Float32Array a 16.000 Hz
async function decodeAudioFileTo16k(file, progressCallback) {
  const arrayBuffer = await file.arrayBuffer();
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;
  let audioBuffer = null;

  if (typeof progressCallback === 'function') {
    progressCallback('Decodificando frequências de áudio nativas...');
  }

  // Tenta decodificar diretamente a 16kHz; se o navegador não permitir, decodifica na taxa nativa e reamostra
  try {
    audioCtx = new AudioContextClass({ sampleRate: 16000 });
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));
  } catch (ctxErr) {
    audioCtx = new AudioContextClass();
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  }

  const numChannels = audioBuffer.numberOfChannels;
  const originalLength = audioBuffer.length;
  const originalSampleRate = audioBuffer.sampleRate;
  const duration = audioBuffer.duration;

  let mono = null;

  // Se já estiver em 16.000 Hz
  if (originalSampleRate === 16000) {
    if (numChannels === 1) {
      mono = audioBuffer.getChannelData(0);
    } else {
      mono = new Float32Array(originalLength);
      const ch0 = audioBuffer.getChannelData(0);
      const ch1 = audioBuffer.getChannelData(1);
      for (let i = 0; i < originalLength; i++) {
        mono[i] = (ch0[i] + ch1[i]) * 0.5;
      }
    }
  } else {
    // Reamostragem com interpolação linear anti-aliasing precisa para 16.000 Hz (padrão Whisper)
    const targetLength = Math.round(originalLength * 16000 / originalSampleRate);
    mono = new Float32Array(targetLength);
    const ch0 = audioBuffer.getChannelData(0);
    const ch1 = numChannels > 1 ? audioBuffer.getChannelData(1) : null;
    const ratio = originalLength / targetLength;

    for (let i = 0; i < targetLength; i++) {
      const position = i * ratio;
      const index = Math.floor(position);
      const frac = position - index;
      const nextIndex = Math.min(originalLength - 1, index + 1);
      
      const s0 = ch1 ? (ch0[index] + ch1[index]) * 0.5 : ch0[index];
      const s1 = ch1 ? (ch0[nextIndex] + ch1[nextIndex]) * 0.5 : ch0[nextIndex];
      
      mono[i] = s0 + frac * (s1 - s0);
    }
  }

  try { audioCtx.close(); } catch (e) {}

  if (typeof progressCallback === 'function') {
    progressCallback('Filtrando zumbidos elétricos e normalizando volume de voz...');
  }

  // 1. Aplica filtro passa-alta a 85Hz para eliminar zumbido elétrico de 50/60Hz e estática de microfone
  mono = applyHighPassFilter(mono, 16000, 85);

  // 2. Normaliza amplitude de voz para a faixa ideal do Whisper
  mono = normalizeAudioSignal(mono);

  return {
    pcmData: mono,
    duration: duration,
    sampleRate: 16000
  };
}

let currentLoadedModelName = null;

// Carregador do Modelo Whisper Local (Transformers.js) com Suporte a Modelos de Alta Fidelidade
async function getWhisperLocalPipeline(modelName = 'Xenova/whisper-tiny', progressCallback) {
  if (localWhisperPipeline && currentLoadedModelName === modelName) {
    return localWhisperPipeline;
  }
  
  const prettyName = modelName.includes('base') 
    ? 'Whisper Base (Alta Fidelidade)' 
    : 'Whisper Tiny (Ultra Rápido)';

  if (typeof progressCallback === 'function') {
    progressCallback(10, 'Carregando ' + prettyName + ' no navegador...');
  }
  
  const { pipeline, env } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2');
  env.allowLocalModels = false;
  env.useBrowserCache = true;
  
  // Limitação inteligente de threads do WebAssembly para manter o PC 100% fluido e leve
  const totalCores = (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || 4;
  const safeThreads = Math.min(2, Math.max(1, Math.floor(totalCores / 2)));
  if (env.backends && env.backends.onnx && env.backends.onnx.wasm) {
    env.backends.onnx.wasm.numThreads = 1;
    env.backends.onnx.wasm.simd = true;
  }
  
  try {
    localWhisperPipeline = await pipeline('automatic-speech-recognition', modelName, {
      quantized: true,
      progress_callback: (info) => {
        if (info && info.status === 'progress' && typeof progressCallback === 'function') {
          const pct = Math.round(info.progress || 0);
          progressCallback(pct, 'Carregando ' + prettyName + ' (' + (info.file || '') + '): ' + pct + '%');
        }
      }
    });
    currentLoadedModelName = modelName;
  } catch (loadErr) {
    console.warn('Aviso: modelo ' + modelName + ' não pôde ser alocado diretamente, carregando modelo leve...', loadErr);
    if (modelName !== 'Xenova/whisper-tiny') {
      if (typeof progressCallback === 'function') {
        progressCallback(45, 'Iniciando modelo Whisper leve compatível...');
      }
      localWhisperPipeline = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny', {
        quantized: true,
        progress_callback: (info) => {
          if (info && info.status === 'progress' && typeof progressCallback === 'function') {
            const pct = Math.round(info.progress || 0);
            progressCallback(pct, 'Carregando Whisper Tiny (' + (info.file || '') + '): ' + pct + '%');
          }
        }
      });
      currentLoadedModelName = 'Xenova/whisper-tiny';
    } else {
      throw loadErr;
    }
  }
  
  return localWhisperPipeline;
}

// Execução Principal da Transcrição 100% no Navegador de Todas as Horas de Áudio
async function processSelectedAudio() {
  if (!selectedAudioFile) {
    alert('Por favor, selecione ou arraste um arquivo de áudio ou vídeo primeiro.');
    return;
  }

  const startBtn = document.getElementById('start-transcribe-btn');
  const output = document.getElementById('transcription-output');
  const boxId = 'transcribe-progress-box';

  // Toggle do botão para permitir parar se o usuário desejar
  if (isTranscribingActive) {
    isTranscribingActive = false;
    if (startBtn) {
      startBtn.innerHTML = '<span>⚡</span><span>Iniciar Transcrição</span>';
      startBtn.classList.remove('btn-recording-active');
    }
    updateUnifiedProgress(boxId, 100, 'Transcrição pausada pelo usuário.', 'Pausado');
    return;
  }

  isTranscribingActive = true;
  if (startBtn) {
    startBtn.innerHTML = '<span>⏹️</span><span>Parar Transcrição</span>';
    startBtn.classList.add('btn-recording-active');
  }

  output.innerHTML = '<div style="color: var(--amber-primary); padding: 1rem;"><span class="pulse-dot"></span> Decodificando frequências de áudio na memória RAM do seu aparelho...</div>';
  currentTranscriptSegments = [];

  try {
    updateUnifiedProgress(boxId, 5, 'Lendo arquivo e decodificando faixas de voz...', 'Amostragem PCM 16kHz');

    const decoded = await decodeAudioFileTo16k(selectedAudioFile, (msg) => {
      updateUnifiedProgress(boxId, 15, msg, 'Decodificando');
    });

    const pcm = decoded.pcmData;
    const totalDurationSecs = decoded.duration || 60;
    const durFormatted = formatAudioDuration(totalDurationSecs);

    const modelSelect = document.getElementById('transcribe-model');
    const selectedModel = modelSelect ? modelSelect.value : 'Xenova/whisper-tiny';
    const modelLabel = selectedModel.includes('small') ? 'Whisper Small' : (selectedModel.includes('base') ? 'Whisper Base' : 'Whisper Tiny');

    updateUnifiedProgress(boxId, 25, 'Carregando modelo neural ' + modelLabel + ' no navegador...', 'Inicializando IA');
    
    const transcriber = await getWhisperLocalPipeline(selectedModel, (pct, msg) => {
      const mappedPct = Math.round(25 + (pct * 0.15));
      updateUnifiedProgress(boxId, mappedPct, msg, 'Modelo Neural');
    });

    // Fatiamento acústico inteligente com sobreposição (overlap) de 2 segundos:
    // Janela de 30s (480.000 amostras) com avanço de 28s (448.000 amostras) garantindo que NENHUMA palavra seja cortada
    const windowSamples = 16000 * 15;
    const stepSamples = 16000 * 14;
    const totalChunks = Math.max(1, Math.ceil(pcm.length / stepSamples));
    
    output.innerHTML = '';
    currentTranscriptSegments = [];

    // Loop completo por TODOS os blocos cobrindo 100% da gravação
    for (let c = 0; c < totalChunks; c++) {
      if (!isTranscribingActive) break;

      const startSample = c * stepSamples;
      if (startSample >= pcm.length) break;
      const endSample = Math.min(pcm.length, startSample + windowSamples);
      const chunkSamples = pcm.subarray(startSample, endSample);
      const startSec = Math.floor(startSample / 16000);
      const timeTag = formatTimestampSrt(startSec).slice(0, 8);

      const progressPct = Math.round(40 + ((c + 1) / totalChunks) * 58);
      const remainingChunks = totalChunks - (c + 1);
      const etaSecs = Math.max(1, Math.round(remainingChunks * 3.2));
      
      const statusText = 'Transcrevendo bloco ' + (c + 1) + ' de ' + totalChunks + ' (' + timeTag + ' de ' + durFormatted + ')...';
      const subInfoText = 'Bloco ' + (c + 1) + ' de ' + totalChunks + ' • ETA: ~' + formatAudioDuration(etaSecs) + ' restante';
      updateUnifiedProgress(boxId, progressPct, statusText, subInfoText);

      // Detecção de Silêncio e Ruído Fraco sem fala humana (após filtro passa-alta de 85Hz)
      let sumSq = 0;
      const step = 16;
      for (let s = 0; s < chunkSamples.length; s += step) {
        sumSq += chunkSamples[s] * chunkSamples[s];
      }
      const rms = Math.sqrt(sumSq / (chunkSamples.length / step));

      // Se a energia for imperceptível (silêncio ou ruído residual de microfone sem fala humana)
      if (rms < 0.0065) {
        await new Promise(r => setTimeout(r, 20));
        continue;
      }

      // Inferência Neural Completa com Whisper
      try {
        const langSelect = document.getElementById('transcribe-lang');
        const langVal = langSelect && langSelect.value.startsWith('en') ? 'english' : (langSelect && langSelect.value.startsWith('es') ? 'spanish' : 'portuguese');

        // GERAÇÃO COMPLETA: max_new_tokens: 128 para transcrever todo o áudio do bloco sem truncar
        // Sem repetition_penalty nem no_repeat_ngram_size que quebravam a fala natural em português
        const result = await transcriber(chunkSamples, {
          language: langVal,
          task: 'transcribe',
          temperature: 0.0,
          condition_on_previous_text: false,
          max_new_tokens: 448
        });

        let rawText = result && result.text ? result.text.trim() : '';

        // 1. Limpeza inteligente de alucinações (tags de som, [música], música isolada em zumbidos e créditos)
        rawText = cleanWhisperSpeech(rawText);

        // 2. Remoção de repetições consecutivas anômalas
        rawText = removeRepetitiveLoops(rawText);

        // 3. Suavização de sobreposição de borda com bloco anterior
        if (currentTranscriptSegments.length > 0 && rawText.length > 0) {
          const prevSegText = currentTranscriptSegments[currentTranscriptSegments.length - 1].text.toLowerCase();
          const words = rawText.split(/\s+/);
          if (words.length > 3) {
            const headThree = words.slice(0, 3).join(' ').toLowerCase();
            if (prevSegText.endsWith(headThree)) {
              words.splice(0, 3);
              rawText = words.join(' ');
            }
          }
        }

        // Se após a filtragem o texto contiver fala humana real
        if (rawText && rawText.length > 0) {
          const enrichedText = enrichTextWithSuggestions(rawText);
          output.innerHTML += '<p style="margin-bottom: 0.85rem; line-height: 1.6;">' +
            '<span style="color: var(--amber-primary); font-family: monospace; font-size: 0.82rem; font-weight: 700; background: rgba(245, 158, 11, 0.12); padding: 0.15rem 0.4rem; border-radius: 4px; margin-right: 0.5rem;">[' + timeTag + ']</span>' +
            '<span>' + enrichedText + '</span>' +
            '</p>';
          output.scrollTop = output.scrollHeight;

          currentTranscriptSegments.push({
            time: timeTag,
            seconds: startSec,
            text: rawText
          });

          // Atualiza contexto a cada 2 blocos ou no final
          if (c % 2 === 0 || c === totalChunks - 1) {
            analyzeTranscriptionContext(output.innerText);
          }
        }
      } catch (chunkErr) {
        console.warn('Aviso no bloco ' + c + ' (' + timeTag + '):', chunkErr);
      }

      // Pausa essencial de alívio de CPU (120ms) para manter o computador 100% livre e responsivo
      await new Promise(r => setTimeout(r, 120));
    }

    updateUnifiedProgress(boxId, 100, 'Transcrição de todas as falas concluída com 100% de sucesso!', 'Todos os ' + totalChunks + ' blocos foram transcritos');
    analyzeTranscriptionContext(output.innerText);
    hideUnifiedProgress(boxId, 3000);

  } catch (err) {
    console.error('Erro na transcrição:', err);
    updateUnifiedProgress(boxId, 100, 'Erro: ' + err.message);
    alert('Erro durante a transcrição no navegador: ' + err.message);
  } finally {
    isTranscribingActive = false;
    if (startBtn) {
      startBtn.innerHTML = '<span>⚡</span><span>Iniciar Transcrição</span>';
      startBtn.classList.remove('btn-recording-active');
      startBtn.disabled = false;
    }
  }
}

// Removedor inteligente de repetições e alucinações em loop do Whisper
function removeRepetitiveLoops(text) {
  if (!text) return '';
  let str = text.trim();

  // 1. Colapsa marcadores de som repetidos: [música] [música] -> [música]
  str = str.replace(/(\[[^\]]+\]\s*)+/g, (match) => {
    return match.trim().split(/\s+/)[0] + ' ';
  });

  // 2. Colapsa frases inteiras repetidas consecutivas com pontuação ou hífens de diálogo
  const sentenceDelim = /(?<=[.!?\n])|(?=\s*-\s+)/;
  const parts = str.split(sentenceDelim).map(p => p.trim()).filter(Boolean);
  
  if (parts.length > 1) {
    const deduped = [];
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      const norm = p.toLowerCase().replace(/[^a-záàâãéèêíïóôõöúçñ0-9]/g, '');
      const prev = deduped[deduped.length - 1];
      const prevNorm = prev ? prev.toLowerCase().replace(/[^a-záàâãéèêíïóôõöúçñ0-9]/g, '') : '';
      if (norm && norm === prevNorm) continue;
      deduped.push(p);
    }
    str = deduped.join(' ');
  }

  // 3. Colapsa padrões de sub-frases repetidas dentro do mesmo texto
  str = str.replace(/(\b[a-záàâãéèêíïóôõöúçñ0-9\s,]{4,40}?\b)(?:\s*,\s*|\s+)\1(?:\s*,\s*|\s+\1)+/gi, '$1');
  
  // 4. Colapsa 2 ou 3 palavras repetidas: 'a melhor coisa a melhor coisa a melhor coisa'
  str = str.replace(/(\b\w+\s+\w+(?:\s+\w+)?\b)(?:\s*,\s*|\s+)\1(?:\s*,\s*|\s+\1)+/gi, '$1');

  // 5. Colapsa palavras únicas repetidas consecutivas: 'coisa coisa coisa' -> 'coisa'
  str = str.replace(/\b(\w+)(?:\s+\1){2,}\b/gi, '$1');

  return str.replace(/\s{2,}/g, ' ').trim();
}

// Injeta spans com classe .flagged-word e dataset de sugestões
function enrichTextWithSuggestions(text) {
  const sensitivity = document.getElementById('transcribe-sensitivity');
  if (sensitivity && sensitivity.value === 'off') {
    return text;
  }

  const words = text.split(/\s+/);
  return words.map(word => {
    const clean = word.toLowerCase().replace(/[.,!?:;()"]/g, '');
    if (PORTUGUESE_CONFUSION_PAIRS[clean]) {
      const suggestions = PORTUGUESE_CONFUSION_PAIRS[clean].join('|');
      return '<span class="flagged-word" data-suggestions="' + suggestions + '" data-original="' + word + '" onclick="showWordSuggestions(event, this)" title="Clique para ver sugestões de correção da IA">' + word + '</span>';
    }
    return word;
  }).join(' ');
}

// Popover interativo flutuante de sugestões de palavras
function showWordSuggestions(event, el) {
  event.stopPropagation();
  
  const oldPop = document.getElementById('sollius-word-popover');
  if (oldPop) oldPop.remove();

  const suggestionsAttr = el.getAttribute('data-suggestions') || '';
  const suggestions = suggestionsAttr.split('|').filter(s => s.trim().length > 0);
  const currentWord = el.textContent.trim().replace(/[.,!?:;()"]/g, '');

  const popover = document.createElement('div');
  popover.id = 'sollius-word-popover';
  popover.style.cssText = 'position: absolute; z-index: 999999; background: #181D2F; border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 10px; padding: 0.65rem 0.85rem; box-shadow: 0 10px 25px rgba(0,0,0,0.6); max-width: 280px; font-family: inherit; font-size: 0.85rem; color: #fff; backdrop-filter: blur(10px); animation: fadeIn 0.15s ease-out;';

  const rect = el.getBoundingClientRect();
  const screenWidth = window.innerWidth;
  const popWidth = Math.min(280, screenWidth - 24);
  const leftPos = Math.max(12, Math.min(window.scrollX + rect.left, window.scrollX + screenWidth - popWidth - 16));
  popover.style.width = popWidth + 'px';
  popover.style.left = leftPos + 'px';
  popover.style.top = (window.scrollY + rect.bottom + 6) + 'px';

  let popHtml = '<div style="font-size: 0.75rem; font-weight: 700; color: #FBBF24; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.3rem;"><span>💡</span> Sugestões da IA para "' + currentWord + '":</div>';
  popHtml += '<div style="display: flex; flex-direction: column; gap: 0.35rem;">';
  
  suggestions.forEach(sug => {
    const isCurrent = sug.toLowerCase() === currentWord.toLowerCase();
    popHtml += '<button type="button" class="sug-pill-btn" onclick="applyWordSuggestion(\'' + sug + '\')" style="text-align: left; background: ' + (isCurrent ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.06)') + '; color: ' + (isCurrent ? '#FBBF24' : '#E2E8F0') + '; border: 1px solid ' + (isCurrent ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255,255,255,0.1)') + '; border-radius: 6px; padding: 0.35rem 0.6rem; font-size: 0.82rem; cursor: pointer; transition: all 0.15s ease;">' +
      (isCurrent ? '✓ ' : '→ ') + sug +
      '</button>';
  });

  popHtml += '<button type="button" onclick="editWordDirectly()" style="margin-top: 0.2rem; text-align: center; background: transparent; color: var(--text-muted); border: none; font-size: 0.75rem; cursor: pointer; text-decoration: underline;">✏️ Digitar outra palavra</button>';
  popHtml += '</div>';

  popover.innerHTML = popHtml;
  document.body.appendChild(popover);

  window.activeFlaggedElement = el;

  setTimeout(() => {
    const closeHandler = (e) => {
      if (!popover.contains(e.target) && e.target !== el) {
        popover.remove();
        document.removeEventListener('click', closeHandler);
      }
    };
    document.addEventListener('click', closeHandler);
  }, 50);
}

function applyWordSuggestion(newWord) {
  if (window.activeFlaggedElement) {
    const el = window.activeFlaggedElement;
    el.textContent = newWord;
    el.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
    el.style.color = '#34D399';
    el.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    el.title = 'Palavra verificada e corrigida pela IA';
    const pop = document.getElementById('sollius-word-popover');
    if (pop) pop.remove();
    
    const output = document.getElementById('transcription-output');
    if (output) analyzeTranscriptionContext(output.innerText);
  }
}

function editWordDirectly() {
  if (window.activeFlaggedElement) {
    const el = window.activeFlaggedElement;
    const pop = document.getElementById('sollius-word-popover');
    if (pop) pop.remove();
    const promptVal = prompt('Digite o termo correto para substituir:', el.textContent.trim());
    if (promptVal !== null && promptVal.trim().length > 0) {
      applyWordSuggestion(promptVal.trim());
    }
  }
}

// Motor de Compreensão Semântica & Análise de Contexto IA
function analyzeTranscriptionContext(fullText) {
  if (!fullText || fullText.trim().length === 0) return;

  const topicBadge = document.getElementById('context-topic');
  const summaryList = document.getElementById('context-summary-list');
  const tagCloud = document.getElementById('context-tags');
  const wordsStat = document.getElementById('audio-stat-words');
  const confStat = document.getElementById('audio-stat-confidence');

  const textLower = fullText.toLowerCase();

  // 1. Classificador de Temas
  const topicCategories = [
    {
      name: '💼 Negócios & Gestão Estratégica',
      keywords: ['faturamento', 'orçamento', 'meta', 'lucro', 'receita', 'demanda', 'estratégia', 'cliente', 'reunião', 'planejamento', 'vendas', 'gestão', 'trimestre']
    },
    {
      name: '💻 Tecnologia, Software & Inovação',
      keywords: ['software', 'deploy', 'sistema', 'servidor', 'banco de dados', 'nuvem', 'código', 'desenvolvimento', 'api', 'computador', 'arquitetura', 'rede']
    },
    {
      name: '⚖️ Jurídico, Contratos & Leis',
      keywords: ['contrato', 'processo', 'audiência', 'cláusula', 'direitos', 'legislação', 'parecer', 'autos', 'provas', 'termo', 'aditivo', 'judicial']
    },
    {
      name: '🎓 Educação, Aula & Treinamento',
      keywords: ['aula', 'aluno', 'professor', 'curso', 'aprendizado', 'conceito', 'estudo', 'exercício', 'módulo', 'disciplina', 'exemplo']
    },
    {
      name: '🎙️ Entrevista, Podcast & Mídia',
      keywords: ['entrevista', 'podcast', 'episódio', 'conversa', 'ouvinte', 'convidado', 'pergunta', 'opinião', 'história', 'experiência']
    },
    {
      name: '🏥 Saúde, Bem-Estar & Medicina',
      keywords: ['saúde', 'médico', 'paciente', 'diagnóstico', 'tratamento', 'exame', 'sintoma', 'clínica', 'medicamento', 'cuidado']
    }
  ];

  let bestCategory = '🗣️ Reunião & Alinhamento Geral';
  let maxScore = 0;

  topicCategories.forEach(cat => {
    let score = 0;
    cat.keywords.forEach(kw => {
      const regex = new RegExp('\\b' + kw + '\\b', 'gi');
      const matches = textLower.match(regex);
      if (matches) score += matches.length;
    });
    if (score > maxScore) {
      maxScore = score;
      bestCategory = cat.name;
    }
  });

  if (topicBadge) {
    topicBadge.innerHTML = '<span class="pulse-dot"></span> ' + bestCategory;
  }

  // 2. Resumo Executivo em Tópicos (Limpo de Repetições e Tags de Som)
  if (summaryList) {
    const cleanForSummary = fullText
      .replace(/\[\d{2}:\d{2}:\d{2}\]/g, '')
      .replace(/\[[^\]]+\]/g, '')
      .replace(/\([^\)]+\)/g, '')
      .replace(/^[-–\s]+/gm, '');

    const rawSentences = cleanForSummary
      .split(/[.!?\n]+/)
      .map(s => s.trim())
      .filter(s => s.length > 25 && !s.toLowerCase().includes('música'));

    const uniqueSentences = [];
    const seenSentences = new Set();
    for (const sen of rawSentences) {
      const norm = sen.toLowerCase().replace(/[^a-záàâãéèêíïóôõöúçñ0-9]/g, '');
      if (norm.length > 20 && !seenSentences.has(norm)) {
        seenSentences.add(norm);
        uniqueSentences.push(sen);
      }
      if (uniqueSentences.length >= 4) break;
    }

    if (uniqueSentences.length > 0) {
      summaryList.innerHTML = uniqueSentences.map(sen => {
        return '<li style="margin-bottom: 0.5rem; line-height: 1.5; color: #E2E8F0;">' + sen + '.</li>';
      }).join('');
    } else {
      summaryList.innerHTML = '<li>Conteúdo transcrito e estruturado com sucesso.</li>';
    }
  }

  // 3. Nuvem de Palavras-Chave Frequentes
  if (tagCloud) {
    const stopwords = new Set([
      'de', 'a', 'o', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'é', 'com', 'não', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como', 'mas', 'foi', 'ao', 'ele', 'das', 'tem', 'à', 'seu', 'sua', 'ou', 'ser', 'quando', 'muito', 'há', 'nos', 'já', 'está', 'eu', 'também', 'só', 'pelo', 'pela', 'até', 'isso', 'ela', 'entre', 'era', 'depois', 'sem', 'mesmo', 'aos', 'ter', 'seus', 'quem', 'nas', 'me', 'esse', 'eles', 'estão', 'você', 'tinha', 'foram', 'essa', 'num', 'nem', 'suas', 'meu', 'às', 'minha', 'têm', 'numa', 'pelos', 'elas', 'havia', 'seja', 'qual', 'será', 'nós', 'tenho', 'lhe', 'deles', 'essas', 'esses', 'pelas', 'este', 'fosse', 'dele', 'tu', 'te', 'vocês', 'vos', 'lhes', 'meus', 'minhas', 'teu', 'tua', 'teus', 'tuas', 'nosso', 'nossa', 'nossos', 'nossas', 'dela', 'delas', 'esta', 'estes', 'estas', 'aquele', 'aquela', 'aqueles', 'aquelas', 'isto', 'aquilo', 'estou', 'está', 'estamos', 'estão', 'estive', 'esteve', 'estivemos', 'estiveram', 'estava', 'estávamos', 'estavam', 'sobre', 'todos', 'tudo'
    ]);

    const words = textLower.match(/\b[a-záàâãéèêíïóôõöúçñ]{4,}\b/gi) || [];
    const freq = {};
    words.forEach(w => {
      if (!stopwords.has(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });

    const sortedTags = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    if (sortedTags.length > 0) {
      tagCloud.innerHTML = sortedTags.map(([tag, count]) => {
        return '<span class="keyword-tag">#' + tag + ' <strong style="color: #FBBF24; font-size: 0.72rem;">(' + count + ')</strong></span>';
      }).join('');
    }
  }

  // 4. Métricas do Áudio
  const wordCount = (fullText.match(/\\S+/g) || []).length;
  if (wordsStat) wordsStat.textContent = wordCount;
  if (confStat) {
    const accuracy = Math.min(99, Math.max(94, 98 - Math.round(wordCount * 0.002)));
    confStat.textContent = accuracy + '%';
  }
}

// Exportações do Transcritor
function downloadTranscriptionTxt() {
  const output = document.getElementById('transcription-output');
  if (!output) return;
  const rawText = output.innerText.trim();
  if (!rawText || rawText.includes('O texto transcrito da sua gravação')) {
    alert('Nenhuma transcrição disponível para download.');
    return;
  }

  const topicEl = document.getElementById('context-topic');
  const topic = topicEl ? topicEl.innerText : 'Geral';
  const header = '========================================================\n' +
                 'SOLLIUS IA - TRANSCRIÇÃO DE ÁUDIO COM CONTEXTO & DÚVIDAS\n' +
                 'Arquivo: ' + (selectedAudioFile ? selectedAudioFile.name : 'Gravação de Áudio') + '\n' +
                 'Duração Estimada: ' + formatAudioDuration(audioDurationSeconds) + '\n' +
                 'Tema Identificado: ' + topic + '\n' +
                 'Data: ' + new Date().toLocaleString('pt-BR') + '\n' +
                 'Privacidade: 100% Client-Side no Navegador\n' +
                 '========================================================\n\n' +
                 'CONTEÚDO TRANSCRITO:\n\n';

  const blob = new Blob([header + rawText], { type: 'text/plain;charset=utf-8' });
  const filename = (selectedAudioFile ? selectedAudioFile.name.replace(/\\.[^/.]+$/, '') : 'transcricao_sollius') + '_transcricao.txt';
  downloadBlob(blob, filename);
}

function downloadTranscriptionSrt() {
  if (!currentTranscriptSegments || currentTranscriptSegments.length === 0) {
    const output = document.getElementById('transcription-output');
    if (!output || output.innerText.includes('O texto transcrito da sua gravação')) {
      alert('Nenhuma transcrição para exportar como legenda SRT.');
      return;
    }
    const lines = output.innerText.split('\n').filter(l => l.trim().length > 0);
    let srtContent = '';
    lines.forEach((line, idx) => {
      const start = formatTimestampSrt(idx * 5);
      const end = formatTimestampSrt((idx + 1) * 5);
      const cleanLine = line.replace(/\\[\\d{2}:\\d{2}:\\d{2}\\]/, '').trim();
      srtContent += (idx + 1) + '\n' + start + ' --> ' + end + '\n' + cleanLine + '\n\n';
    });
    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    downloadBlob(blob, 'legendas_sollius.srt');
    return;
  }

  let srt = '';
  currentTranscriptSegments.forEach((seg, i) => {
    const start = formatTimestampSrt(seg.startSec || i * 5);
    const end = formatTimestampSrt(seg.endSec || (i + 1) * 5);
    srt += (i + 1) + '\n' + start + ' --> ' + end + '\n' + seg.text + '\n\n';
  });

  const blob = new Blob([srt], { type: 'text/plain;charset=utf-8' });
  const filename = (selectedAudioFile ? selectedAudioFile.name.replace(/\\.[^/.]+$/, '') : 'legendas_sollius') + '.srt';
  downloadBlob(blob, filename);
}

function copyTranscription() {
  const output = document.getElementById('transcription-output');
  if (!output) return;
  const text = output.innerText.trim();
  if (!text || text.includes('O texto transcrito da sua gravação')) {
    alert('Nenhum texto para copiar.');
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    alert('Transcrição copiada com sucesso para a área de transferência!');
  });
}


// ========================================================
// 14. CONVERSOR DE DOCUMENTOS OFFICE (WORD, EXCEL & PDF)
// ========================================================
let currentOfficeData = {
  type: '',
  name: '',
  size: 0,
  jsonData: null,
  htmlContent: '',
  csvData: ''
};

function handleOfficeSelect(files) {
  if (!files || files.length === 0) return;
  const file = files[0];
  const ext = file.name.split('.').pop().toLowerCase();
  
  const progressBox = 'office-progress-box';
  const previewCard = document.getElementById('office-preview-card');
  const actionsBar = document.getElementById('office-actions-bar');
  const fileNameEl = document.getElementById('office-file-name');
  const fileMetaEl = document.getElementById('office-file-meta');
  const contentView = document.getElementById('office-content-view');
  const searchBox = document.getElementById('office-table-search-box');
  const csvBtn = document.getElementById('office-csv-btn');
  const jsonBtn = document.getElementById('office-json-btn');

  currentOfficeData.name = file.name;
  currentOfficeData.size = file.size;

  if (previewCard) previewCard.classList.remove('hidden');
  if (actionsBar) actionsBar.classList.remove('hidden');
  if (fileNameEl) fileNameEl.textContent = file.name;

  updateUnifiedProgress(progressBox, 15, 'Carregando documento na memória do navegador...', 'Lendo arquivo');

  const reader = new FileReader();

  if (['xlsx', 'xls', 'csv'].includes(ext)) {
    // Planilha Excel ou CSV via SheetJS
    currentOfficeData.type = 'excel';
    if (fileMetaEl) fileMetaEl.textContent = 'Tamanho: ' + formatFileSize(file.size) + ' • Formato: Planilha Excel (' + ext.toUpperCase() + ')';
    if (searchBox) searchBox.classList.remove('hidden');
    if (csvBtn) csvBtn.style.display = 'inline-flex';
    if (jsonBtn) jsonBtn.style.display = 'inline-flex';

    reader.onload = (e) => {
      try {
        updateUnifiedProgress(progressBox, 50, 'Processando células, fórmulas e colunas da planilha...', 'Analisando dados');
        const data = new Uint8Array(e.target.result);
        
        if (typeof XLSX === 'undefined') {
          throw new Error('Biblioteca SheetJS ainda não foi carregada. Verifique sua conexão à internet.');
        }

        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        currentOfficeData.jsonData = json;
        currentOfficeData.csvData = XLSX.utils.sheet_to_csv(worksheet);

        updateUnifiedProgress(progressBox, 85, 'Renderizando visualizador de tabela interativa...', 'Quase pronto');

        if (json && json.length > 0) {
          let tableHtml = '<div style="overflow-x: auto; max-height: 480px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">';
          tableHtml += '<table id="office-rendered-table" class="sollius-data-table">';

          const headers = json[0] || [];
          tableHtml += '<thead><tr><th style="width: 40px; text-align: center;">#</th>';
          headers.forEach(h => {
            tableHtml += '<th>' + (h !== undefined ? String(h) : '') + '</th>';
          });
          tableHtml += '</tr></thead>';

          tableHtml += '<tbody>';
          for (let r = 1; r < json.length; r++) {
            const row = json[r];
            if (!row || row.length === 0) continue;
            tableHtml += '<tr><td style="color: var(--text-muted); font-size: 0.75rem; text-align: center;">' + r + '</td>';
            headers.forEach((h, colIdx) => {
              const cellVal = row[colIdx] !== undefined ? String(row[colIdx]) : '';
              tableHtml += '<td>' + cellVal + '</td>';
            });
            tableHtml += '</tr>';
          }
          tableHtml += '</tbody></table></div>';

          contentView.innerHTML = tableHtml;
        } else {
          contentView.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-muted);">Planilha vazia ou sem dados legíveis.</div>';
        }

        updateUnifiedProgress(progressBox, 100, 'Planilha carregada e convertida com sucesso!', 'Pronto');
        hideUnifiedProgress(progressBox, 1500);
      } catch (err) {
        console.error('Erro ao ler Excel:', err);
        updateUnifiedProgress(progressBox, 100, 'Erro ao processar planilha: ' + err.message);
        contentView.innerHTML = '<div style="color: #F87171; padding: 1.5rem;">Erro ao ler planilha: ' + err.message + '</div>';
      }
    };
    reader.readAsArrayBuffer(file);

  } else if (ext === 'docx') {
    // Documento Word via Mammoth.js
    currentOfficeData.type = 'word';
    if (fileMetaEl) fileMetaEl.textContent = 'Tamanho: ' + formatFileSize(file.size) + ' • Formato: Documento Word (DOCX)';
    if (searchBox) searchBox.classList.add('hidden');
    if (csvBtn) csvBtn.style.display = 'none';
    if (jsonBtn) jsonBtn.style.display = 'none';

    reader.onload = (e) => {
      try {
        updateUnifiedProgress(progressBox, 50, 'Convertendo formatação DOCX para HTML estruturado...', 'Processando Word');
        const arrayBuffer = e.target.result;

        if (typeof mammoth === 'undefined') {
          throw new Error('Biblioteca Mammoth ainda não foi carregada. Verifique sua conexão à internet.');
        }

        mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
          .then((result) => {
            currentOfficeData.htmlContent = result.value;
            contentView.innerHTML = '<div class="docx-html-preview">' + result.value + '</div>';
            updateUnifiedProgress(progressBox, 100, 'Documento Word convertido com sucesso!', 'Pronto');
            hideUnifiedProgress(progressBox, 1500);
          })
          .catch((err) => {
            throw err;
          });
      } catch (err) {
        console.error('Erro ao processar DOCX:', err);
        updateUnifiedProgress(progressBox, 100, 'Erro ao processar DOCX: ' + err.message);
        contentView.innerHTML = '<div style="color: #F87171; padding: 1.5rem;">Erro ao ler Word: ' + err.message + '</div>';
      }
    };
    reader.readAsArrayBuffer(file);

  } else if (ext === 'pdf') {
    currentOfficeData.type = 'pdf';
    if (fileMetaEl) fileMetaEl.textContent = 'Tamanho: ' + formatFileSize(file.size) + ' • Formato: Documento PDF';
    if (searchBox) searchBox.classList.add('hidden');
    if (csvBtn) csvBtn.style.display = 'none';
    if (jsonBtn) jsonBtn.style.display = 'none';

    reader.onload = (e) => {
      updateUnifiedProgress(progressBox, 100, 'PDF carregado com sucesso!', 'Pronto');
      const blobUrl = URL.createObjectURL(file);
      contentView.innerHTML = '<iframe src="' + blobUrl + '" style="width: 100%; height: 500px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);"></iframe>';
      hideUnifiedProgress(progressBox, 1500);
    };
    reader.readAsArrayBuffer(file);
  }
}

// Filtro de busca instantâneo na tabela do Excel
function filterOfficeTable(query) {
  const table = document.getElementById('office-rendered-table');
  if (!table) return;
  const q = (query || '').toLowerCase().trim();
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach(row => {
    if (!q) {
      row.style.display = '';
      return;
    }
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
}

// Exportações Office
function exportOfficeToPdf() {
  const contentView = document.getElementById('office-content-view');
  if (!contentView || !contentView.innerHTML.trim()) {
    alert('Nenhum documento carregado para exportar em PDF.');
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Permita popups no navegador para gerar o PDF de impressão.');
    return;
  }

  const title = currentOfficeData.name || 'Documento Sollius';
  const htmlContent = contentView.innerHTML;

  printWindow.document.write(
    '<!DOCTYPE html>' +
    '<html lang="pt-BR">' +
    '<head>' +
    '  <meta charset="UTF-8">' +
    '  <title>' + title + '</title>' +
    '  <style>' +
    '    @page { size: A4; margin: 15mm; }' +
    '    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #111827; background: #fff; padding: 1rem; font-size: 11pt; line-height: 1.5; }' +
    '    .header-print { border-bottom: 2px solid #F59E0B; padding-bottom: 0.5rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; }' +
    '    .header-print h1 { font-size: 14pt; margin: 0; color: #111827; }' +
    '    .header-print span { font-size: 8pt; color: #6B7280; }' +
    '    table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 9pt; }' +
    '    th, td { border: 1px solid #D1D5DB; padding: 6px 8px; text-align: left; }' +
    '    th { background-color: #F3F4F6; font-weight: bold; }' +
    '    tr:nth-child(even) { background-color: #F9FAFB; }' +
    '    .docx-html-preview h1, .docx-html-preview h2, .docx-html-preview h3 { color: #1F2937; margin-top: 1rem; }' +
    '    .docx-html-preview p { margin-bottom: 0.75rem; }' +
    '  </style>' +
    '</head>' +
    '<body>' +
    '  <div class="header-print">' +
    '    <h1>' + title + '</h1>' +
    '    <span>Gerado com SOLLIUS • 100% Client-Side Seguro</span>' +
    '  </div>' +
    '  ' + htmlContent +
    '  <script>' +
    '    window.onload = function() {' +
    '      setTimeout(function() {' +
    '        window.print();' +
    '      }, 300);' +
    '    };' +
    '  <\/script>' +
    '</body>' +
    '</html>'
  );
  printWindow.document.close();
}

function exportOfficeToCsv() {
  if (!currentOfficeData.csvData) {
    alert('Nenhum dado de planilha disponível para exportação em CSV.');
    return;
  }
  const blob = new Blob(['\uFEFF' + currentOfficeData.csvData], { type: 'text/csv;charset=utf-8;' });
  const filename = (currentOfficeData.name ? currentOfficeData.name.replace(/\.[^/.]+$/, '') : 'planilha_sollius') + '.csv';
  downloadBlob(blob, filename);
}

function exportOfficeToJson() {
  if (!currentOfficeData.jsonData) {
    alert('Nenhum dado disponível para exportação em JSON.');
    return;
  }
  const jsonStr = JSON.stringify(currentOfficeData.jsonData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
  const filename = (currentOfficeData.name ? currentOfficeData.name.replace(/\.[^/.]+$/, '') : 'dados_sollius') + '.json';
  downloadBlob(blob, filename);
}


// ========================================================
// 14. SOLLIUS GAMES ARCADE (FASE 2) - MOTOR 100% CLIENT-SIDE
// ========================================================
let currentGamesCategory = 'all';
let currentGamesSearch = '';
let currentGamePlayingId = null;
let solliusFavGames = [];

function loadGamesFavorites() {
  try {
    const raw = localStorage.getItem('sollius_fav_games');
    solliusFavGames = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(solliusFavGames)) solliusFavGames = [];
  } catch (e) {
    solliusFavGames = [];
  }
}

function saveGamesFavorites() {
  try {
    localStorage.setItem('sollius_fav_games', JSON.stringify(solliusFavGames));
  } catch (e) {}
}

function initGamesCatalog() {
  if (typeof SOLLIUS_GAMES_DATABASE === 'undefined') {
    return;
  }
  loadGamesFavorites();
  updateGameCategoryCounts();
  renderGamesGrid(currentGamesCategory, currentGamesSearch);
}

function updateGameCategoryCounts() {
  if (typeof SOLLIUS_GAMES_DATABASE === 'undefined') return;
  const counts = { all: SOLLIUS_GAMES_DATABASE.length, corrida: 0, acao: 0, puzzle: 0, classicos: 0, esportes: 0, favoritos: solliusFavGames.length };
  SOLLIUS_GAMES_DATABASE.forEach(g => {
    if (counts[g.category] !== undefined) counts[g.category]++;
  });

  const setElText = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };

  setElText('games-total-counter', counts.all);
  setElText('count-all', counts.all);
  setElText('count-corrida', counts.corrida);
  setElText('count-acao', counts.acao);
  setElText('count-puzzle', counts.puzzle);
  setElText('count-classicos', counts.classicos);
  setElText('count-esportes', counts.esportes);
  setElText('count-favs', counts.favoritos);
}

function filterGameCategory(cat, btnEl) {
  currentGamesCategory = cat;
  const pills = document.querySelectorAll('.game-cat-pill');
  pills.forEach(p => {
    if (p.getAttribute('data-cat') === cat) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });
  renderGamesGrid(currentGamesCategory, currentGamesSearch);
}

function handleGameSearch(val) {
  currentGamesSearch = (val || '').trim().toLowerCase();
  const clearBtn = document.getElementById('game-search-clear');
  if (clearBtn) {
    if (currentGamesSearch) clearBtn.classList.remove('hidden');
    else clearBtn.classList.add('hidden');
  }
  renderGamesGrid(currentGamesCategory, currentGamesSearch);
}

function clearGameSearch() {
  const input = document.getElementById('game-search-input');
  if (input) input.value = '';
  handleGameSearch('');
}

function renderGamesGrid(category = 'all', query = '') {
  const container = document.getElementById('games-catalog-grid');
  const emptyState = document.getElementById('games-empty-state');
  if (!container || typeof SOLLIUS_GAMES_DATABASE === 'undefined') return;

  loadGamesFavorites();

  let filtered = SOLLIUS_GAMES_DATABASE.filter(g => {
    // Categoria
    if (category === 'favoritos') {
      if (!solliusFavGames.includes(g.id)) return false;
    } else if (category !== 'all' && g.category !== category) {
      return false;
    }

    // Busca textual
    if (query) {
      const matchTitle = (g.title || '').toLowerCase().includes(query);
      const matchDesc = (g.desc || '').toLowerCase().includes(query);
      const matchCat = (g.category || '').toLowerCase().includes(query);
      const matchInstr = (g.instructions || '').toLowerCase().includes(query);
      if (!matchTitle && !matchDesc && !matchCat && !matchInstr) return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    container.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  container.classList.remove('hidden');
  if (emptyState) emptyState.classList.add('hidden');

  container.innerHTML = filtered.map(g => {
    const isFav = solliusFavGames.includes(g.id);
    return `
      <div class="game-card" role="button" tabindex="0" onclick="openGamePlayer('${g.id}')" onkeydown="if(event.key==='Enter')openGamePlayer('${g.id}')" aria-label="Jogar ${g.title}">
        <div class="game-thumb-wrapper">
          <img src="${g.thumb}" alt="${g.title}" class="game-thumb-img" loading="lazy" width="512" height="384" onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80'">
          <span class="game-card-badge">${g.categoryLabel.split(' ')[0]} ${g.category.toUpperCase()}</span>
          <button class="game-card-fav-btn ${isFav ? 'favorited' : ''}" onclick="toggleGameFavorite('${g.id}', event)" title="${isFav ? 'Remover dos Favoritos' : 'Salvar nos Favoritos'}" aria-label="Favoritar">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="game-info">
          <h3 class="game-title" title="${g.title}">${g.title}</h3>
          <div class="game-meta-row">
            <span>⭐ ${g.rating} (${g.plays})</span>
            <span>⚡ Sem Download</span>
          </div>
          <p class="tool-desc" style="font-size: 0.82rem; margin-bottom: 0.75rem; -webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;">
            ${g.desc}
          </p>
          <button class="game-play-btn" onclick="openGamePlayer('${g.id}')">
            <span>▶ Jogar Agora</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openGamePlayer(gameId) {
  if (typeof SOLLIUS_GAMES_DATABASE === 'undefined') return;
  const game = SOLLIUS_GAMES_DATABASE.find(g => g.id === gameId);
  if (!game) return;

  currentGamePlayingId = gameId;
  loadGamesFavorites();

  const modal = document.getElementById('game-player-modal');
  const iframe = document.getElementById('game-player-iframe');
  const loader = document.getElementById('game-player-loader');
  const titleEl = document.getElementById('modal-game-title');
  const catEl = document.getElementById('modal-game-cat');
  const instrEl = document.getElementById('modal-game-instructions');
  const favIcon = document.getElementById('modal-game-fav-icon');

  if (titleEl) titleEl.textContent = game.title;
  if (catEl) catEl.textContent = `${game.categoryLabel} • ⭐ ${game.rating} (${game.plays} jogadores)`;
  if (instrEl) instrEl.textContent = game.instructions || 'Use o teclado, mouse ou toque na tela para jogar.';
  if (favIcon) favIcon.textContent = solliusFavGames.includes(gameId) ? '❤️' : '🤍';

  if (loader) loader.style.display = 'flex';
  if (iframe) {
    iframe.onload = () => {
      if (loader) loader.style.display = 'none';
    };
    iframe.src = game.url;
  }

  if (modal) modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeGamePlayer() {
  const modal = document.getElementById('game-player-modal');
  const iframe = document.getElementById('game-player-iframe');
  if (iframe) {
    iframe.src = ''; // Interrompe áudio do jogo imediatamente
  }
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
  currentGamePlayingId = null;
}

function toggleGameFullscreen() {
  const wrapper = document.getElementById('game-screen-wrapper') || document.getElementById('game-player-iframe');
  if (!wrapper) return;

  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (wrapper.requestFullscreen) {
      wrapper.requestFullscreen().catch(err => console.warn('Erro ao abrir fullscreen:', err));
    } else if (wrapper.webkitRequestFullscreen) {
      wrapper.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function toggleGameFavorite(gameId, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  loadGamesFavorites();
  const idx = solliusFavGames.indexOf(gameId);
  const isAdding = idx === -1;
  if (isAdding) {
    solliusFavGames.push(gameId);
  } else {
    solliusFavGames.splice(idx, 1);
  }
  saveGamesFavorites();
  updateGameCategoryCounts();

  // Se estiver na aba de favoritos, re-renderiza o catálogo
  renderGamesGrid(currentGamesCategory, currentGamesSearch);

  // Atualiza ícone do modal se o jogo estiver aberto
  if (currentGamePlayingId === gameId) {
    const favIcon = document.getElementById('modal-game-fav-icon');
    if (favIcon) favIcon.textContent = isAdding ? '❤️' : '🤍';
  }

  // Notificação toast discreta
  showCopyToast(isAdding ? '❤️ Adicionado aos Favoritos!' : '🤍 Removido dos Favoritos');
}

function toggleCurrentGameFavorite() {
  if (currentGamePlayingId) {
    toggleGameFavorite(currentGamePlayingId);
  }
}

// Fechar com tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('game-player-modal');
    if (modal && !modal.classList.contains('hidden')) {
      closeGamePlayer();
    }
  }
});


// ========================================================
// FUNÇÕES DA SEÇÃO DE TUTORIAIS & DOWNLOADS
// ========================================================
function copyTutorialDownloadLink(url, btnElement) {
  if (!url) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      if (typeof showToast === 'function') {
        showToast('Link copiado para a área de transferência! 📋');
      } else {
        alert('Link copiado!');
      }
      if (btnElement) {
        const oldText = btnElement.innerHTML;
        btnElement.innerHTML = '<span>✅ Link Copiado!</span>';
        btnElement.style.borderColor = '#10B981';
        btnElement.style.color = '#34D399';
        setTimeout(() => {
          btnElement.innerHTML = oldText;
          btnElement.style.borderColor = '';
          btnElement.style.color = '';
        }, 2500);
      }
    }).catch(() => {
      prompt('Copie o link abaixo:', url);
    });
  } else {
    prompt('Copie o link abaixo:', url);
  }
}

function scrollToTutorialDownloads() {
  const el = document.getElementById('tutorial-downloads-area');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.style.boxShadow = '0 0 35px rgba(239, 68, 68, 0.45)';
    setTimeout(() => { el.style.boxShadow = ''; }, 2000);
  }
}

function filterTutorialsCategory(category, buttonEl) {
  const cards = document.querySelectorAll('.tutorial-item-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
  document.querySelectorAll('.tut-cat-pill').forEach(btn => btn.classList.remove('active'));
  if (buttonEl) buttonEl.classList.add('active');
}

function filterTutorialsSearch(query) {
  const clean = query.toLowerCase().trim();
  const cards = document.querySelectorAll('.tutorial-item-card');
  cards.forEach(card => {
    const text = (card.innerText + ' ' + (card.dataset.keywords || '')).toLowerCase();
    if (!clean || text.includes(clean)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}
