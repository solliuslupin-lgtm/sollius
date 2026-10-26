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
};

// Aliases para suportar múltiplos formatos de URL (ex: /compressor ou /compressor-imagem)
const PATH_TO_TAB = {
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
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  renderQrCode();
  
  if (typeof loadResumeSample === 'function') loadResumeSample();
  if (typeof updateCardPreview === 'function') updateCardPreview();
  if (typeof initSignaturePad === 'function') initSignaturePad();

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

  // Atualiza botões
  const buttons = document.querySelectorAll('.nav-item, .header-nav-btn');
  buttons.forEach(btn => {
    if (btn.dataset.tab === tabId) {
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

// Helpers do Motor de Transcrição
function toggleTranscribeEngine(engine) {
  const panel = document.getElementById('groq-turbo-panel');
  if (panel) {
    panel.style.display = (engine === 'groq-turbo') ? 'block' : 'none';
  }
}

function saveGroqKey(val) {
  try {
    localStorage.setItem('sollius_groq_key', val.trim());
  } catch (e) {}
}

function loadSavedGroqKey() {
  try {
    const key = localStorage.getItem('sollius_groq_key');
    const input = document.getElementById('groq-api-key');
    if (key && input) {
      input.value = key;
    }
  } catch (e) {}
}

// Inicializa chave salva ao carregar
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    loadSavedGroqKey();
  });
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

  // Mede duração via Audio element
  const tempAudio = new Audio();
  tempAudio.src = audioUrl;
  tempAudio.onloadedmetadata = () => {
    audioDurationSeconds = tempAudio.duration || 60;
    const durFormatted = formatAudioDuration(audioDurationSeconds);
    if (dropSubtitle) {
      dropSubtitle.innerHTML = 'Duração: <strong style="color: #FBBF24;">' + durFormatted + '</strong> • Tamanho: <strong>' + formatFileSize(file.size) + '</strong> • Pronto para transcrever fala real.';
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
    alert('A API de Reconhecimento de Fala nativa não está ativa neste navegador. Recomendamos usar o Google Chrome, Edge ou Safari para gravação ao vivo pelo microfone, ou carregar arquivos de áudio gravados.');
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

// Decodificador de Áudio real para Mono Float32Array a 16.000 Hz
async function decodeAudioFileTo16k(file, progressCallback) {
  const arrayBuffer = await file.arrayBuffer();
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContextClass({ sampleRate: 16000 });
  
  if (typeof progressCallback === 'function') {
    progressCallback('Decodificando frequências de áudio nativas...');
  }
  
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  const numChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length;
  
  let mono = null;
  if (numChannels === 1) {
    mono = audioBuffer.getChannelData(0);
  } else {
    mono = new Float32Array(length);
    const ch0 = audioBuffer.getChannelData(0);
    const ch1 = audioBuffer.getChannelData(1);
    for (let i = 0; i < length; i++) {
      mono[i] = (ch0[i] + ch1[i]) * 0.5;
    }
  }
  
  return {
    pcmData: mono,
    duration: audioBuffer.duration,
    sampleRate: 16000
  };
}

// Carregador do Modelo Whisper Local (Transformers.js)
async function getWhisperLocalPipeline(progressCallback) {
  if (localWhisperPipeline) return localWhisperPipeline;
  
  if (typeof progressCallback === 'function') {
    progressCallback(10, 'Carregando biblioteca Transformers.js neural...');
  }
  
  const { pipeline, env } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2');
  env.allowLocalModels = false;
  env.useBrowserCache = true;
  
  localWhisperPipeline = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny', {
    progress_callback: (info) => {
      if (info && info.status === 'progress' && typeof progressCallback === 'function') {
        const pct = Math.round(info.progress || 0);
        progressCallback(pct, 'Baixando modelo Whisper OpenAI no navegador (' + (info.file || '') + '): ' + pct + '%');
      }
    }
  });
  
  return localWhisperPipeline;
}

// Execução Principal da Transcrição de Fala Real
async function processSelectedAudio() {
  if (!selectedAudioFile) {
    alert('Por favor, selecione ou arraste um arquivo de áudio ou vídeo primeiro.');
    return;
  }

  const engineSelect = document.getElementById('transcribe-engine');
  const engine = engineSelect ? engineSelect.value : 'whisper-local';
  const startBtn = document.getElementById('start-transcribe-btn');
  const output = document.getElementById('transcription-output');
  const boxId = 'transcribe-progress-box';

  if (startBtn) startBtn.disabled = true;
  isTranscribingActive = true;
  output.innerHTML = '';
  currentTranscriptSegments = [];

  try {
    // ROTA 1: MODO TURBO GROQ CLOUD (Para 1h-2h em ~5 segundos)
    if (engine === 'groq-turbo') {
      const groqKeyInput = document.getElementById('groq-api-key');
      const apiKey = groqKeyInput ? groqKeyInput.value.trim() : '';

      if (!apiKey) {
        const wantsKey = confirm('Para usar o Modo Turbo em alta velocidade, você precisa colar uma chave gratuita da Groq.\n\nDeseja abrir a página da Groq agora para obter sua chave em 30 segundos (sem cartão de crédito)?');
        if (wantsKey) {
          window.open('https://console.groq.com/keys', '_blank');
        }
        if (startBtn) startBtn.disabled = false;
        isTranscribingActive = false;
        output.innerHTML = '<div style="color: var(--amber-primary); padding: 1rem;">Cole sua chave da Groq acima ou alterne o motor para "Whisper IA Local (No Navegador)".</div>';
        return;
      }

      updateUnifiedProgress(boxId, 15, 'Enviando gravação para o motor Groq Whisper-Large-V3...', 'Processamento Turbo Ativo');

      const formData = new FormData();
      formData.append('file', selectedAudioFile);
      formData.append('model', 'whisper-large-v3');
      const langSelect = document.getElementById('transcribe-lang');
      const langVal = langSelect ? langSelect.value.split('-')[0] : 'pt';
      formData.append('language', langVal);
      formData.append('response_format', 'verbose_json');

      updateUnifiedProgress(boxId, 45, 'Transcrevendo áudio com precisão extrema palavra por palavra...', 'Aguardando Whisper Large');

      const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + apiKey
        },
        body: formData
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error?.message || 'Erro na API da Groq: HTTP ' + response.status);
      }

      updateUnifiedProgress(boxId, 85, 'Formatando falas e calculando pontuações e timestamps...', 'Finalizando');
      const data = await response.json();

      if (data.segments && data.segments.length > 0) {
        output.innerHTML = '';
        data.segments.forEach((seg, idx) => {
          const startSec = Math.floor(seg.start || 0);
          const timeTag = formatTimestampSrt(startSec).slice(0, 8);
          const text = seg.text ? seg.text.trim() : '';
          if (text) {
            currentTranscriptSegments.push({
              time: timeTag,
              seconds: startSec,
              text: text
            });
            output.innerHTML += '<p style="margin-bottom: 0.85rem; line-height: 1.6;">' +
              '<span style="color: var(--amber-primary); font-family: monospace; font-size: 0.82rem; font-weight: 700; background: rgba(245, 158, 11, 0.12); padding: 0.15rem 0.4rem; border-radius: 4px; margin-right: 0.5rem;">[' + timeTag + ']</span>' +
              '<span>' + enrichTextWithSuggestions(text) + '</span>' +
              '</p>';
          }
        });
      } else if (data.text) {
        output.innerHTML = '<p style="line-height: 1.6;">' + enrichTextWithSuggestions(data.text) + '</p>';
        currentTranscriptSegments.push({
          time: '00:00:00',
          seconds: 0,
          text: data.text
        });
      }

      updateUnifiedProgress(boxId, 100, 'Transcrição Turbo concluída com 100% de sucesso!', 'Finalizado');
      analyzeTranscriptionContext(output.innerText);
      hideUnifiedProgress(boxId, 2500);
      if (startBtn) startBtn.disabled = false;
      isTranscribingActive = false;
      return;
    }

    // ROTA 2: MOTOR LOCAL WHISPER NO NAVEGADOR (Transformers.js 100% Client-Side)
    updateUnifiedProgress(boxId, 5, 'Lendo arquivo de áudio e decodificando faixas de voz...', 'Amostragem PCM 16kHz');

    const decoded = await decodeAudioFileTo16k(selectedAudioFile, (msg) => {
      updateUnifiedProgress(boxId, 15, msg, 'Decodificando');
    });

    const pcm = decoded.pcmData;
    const totalSecs = decoded.duration || 60;

    updateUnifiedProgress(boxId, 25, 'Carregando modelo neural Whisper da OpenAI no navegador...', 'Download ONNX');
    
    const transcriber = await getWhisperLocalPipeline((pct, msg) => {
      const mappedPct = Math.round(25 + (pct * 0.25));
      updateUnifiedProgress(boxId, mappedPct, msg, 'Modelo Neural');
    });

    // Fatiamento acústico de 30 segundos (480.000 amostras a 16kHz)
    const samplesPerChunk = 16000 * 30;
    const totalChunks = Math.ceil(pcm.length / samplesPerChunk);
    
    output.innerHTML = '';
    currentTranscriptSegments = [];

    for (let c = 0; c < totalChunks; c++) {
      if (!isTranscribingActive) break;

      const startSample = c * samplesPerChunk;
      const endSample = Math.min(pcm.length, (c + 1) * samplesPerChunk);
      const chunkSamples = pcm.subarray(startSample, endSample);
      const startSec = Math.floor(c * 30);
      const timeTag = formatTimestampSrt(startSec).slice(0, 8);

      const progressPct = Math.round(50 + ((c + 1) / totalChunks) * 48);
      const etaSecs = Math.max(1, Math.round((totalChunks - (c + 1)) * 3.5));
      updateUnifiedProgress(boxId, progressPct, 'Transcrevendo bloco ' + (c + 1) + ' de ' + totalChunks + ' (' + timeTag + ')...', 'Bloco ' + (c + 1) + ' de ' + totalChunks + ' • ETA: ~' + etaSecs + 's');

      // Detecção de Silêncio (RMS Energy): pula blocos sem fala
      let sumSq = 0;
      const step = 20;
      for (let s = 0; s < chunkSamples.length; s += step) {
        sumSq += chunkSamples[s] * chunkSamples[s];
      }
      const rms = Math.sqrt(sumSq / (chunkSamples.length / step));

      if (rms < 0.003) {
        // Pausa ou silêncio no trecho
        await new Promise(r => setTimeout(r, 20));
        continue;
      }

      // Inferência Neural Real com Whisper em Português
      try {
        const langSelect = document.getElementById('transcribe-lang');
        const langVal = langSelect && langSelect.value.startsWith('en') ? 'english' : (langSelect && langSelect.value.startsWith('es') ? 'spanish' : 'portuguese');

        const result = await transcriber(chunkSamples, {
          language: langVal,
          task: 'transcribe'
        });

        const rawText = result && result.text ? result.text.trim() : '';

        if (rawText && rawText.length > 1) {
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

          // Atualiza contexto a cada 3 blocos
          if (c % 3 === 0 || c === totalChunks - 1) {
            analyzeTranscriptionContext(output.innerText);
          }
        }
      } catch (chunkErr) {
        console.warn('Erro ao transcrever bloco ' + c + ':', chunkErr);
      }

      // Pausa rápida para liberar o event loop da interface
      await new Promise(r => setTimeout(r, 30));
    }

    updateUnifiedProgress(boxId, 100, 'Transcrição neural concluída com sucesso!', 'Todos os blocos de áudio foram analisados');
    analyzeTranscriptionContext(output.innerText);
    hideUnifiedProgress(boxId, 2500);

  } catch (err) {
    console.error('Erro na transcrição:', err);
    updateUnifiedProgress(boxId, 100, 'Erro: ' + err.message);
    alert('Erro durante a transcrição: ' + err.message + '\n\nPara áudios muito longos (acima de 1 hora), recomendamos usar o "Modo Turbo Groq", que processa o arquivo completo em 5 segundos gratuitamente.');
  } finally {
    if (startBtn) startBtn.disabled = false;
    isTranscribingActive = false;
  }
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
