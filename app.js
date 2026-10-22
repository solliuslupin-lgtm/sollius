// ========================================================
// SOLLIUS ECOSYSTEM ENGINE - 100% CLIENT-SIDE JAVASCRIPT
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }
  // Inicializa QR Code padrão
  renderQrCode();
  
  // Inicializa Pré-visualizações
  if (typeof updateResumePreview === 'function') updateResumePreview();
  if (typeof updateCardPreview === 'function') updateCardPreview();
  if (typeof initSignaturePad === 'function') initSignaturePad();
});

// Navegação entre abas
function switchTab(tabId) {
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(el => el.classList.add('hidden'));

  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeContent) {
    activeContent.classList.remove('hidden');
  }

  // Se abrir assinatura, recalibra canvas
  if (tabId === 'assinar-pdf' && typeof initSignaturePad === 'function') {
    setTimeout(initSignaturePad, 50);
  }
  if (tabId === 'cartao' && typeof updateCardPreview === 'function') {
    setTimeout(updateCardPreview, 50);
  }
    activeContent.classList.remove('hidden');
  }

  // Atualiza botões
  const buttons = document.querySelectorAll('.nav-item');
  buttons.forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Recria ícones
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
      processSmartBackgroundRemoval(img);
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

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const itemId = `conv-${Date.now()}-${i}`;
    
    // Renderiza placeholder na lista
    const itemEl = document.createElement('div');
    itemEl.id = itemId;
    itemEl.className = 'flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 text-xs';
    itemEl.innerHTML = `
      <div class="flex items-center space-x-3 overflow-hidden">
        <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
          ${file.name.split('.').pop().toUpperCase().slice(0, 3)}
        </div>
        <div class="truncate max-w-[200px] sm:max-w-xs">
          <p class="font-semibold text-white truncate">${file.name}</p>
          <p class="text-slate-400">${formatFileSize(file.size)} • Processando...</p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    `;
    queueList.appendChild(itemEl);

    // Processa conversão via Canvas
    try {
      const result = await processImageConversion(file, targetFormat, quality, maxWidthSetting);
      convertedQueue.push(result);
      
      const reduction = Math.round(((file.size - result.blob.size) / file.size) * 100);
      const isLighter = reduction > 0;

      itemEl.innerHTML = `
        <div class="flex items-center space-x-3 overflow-hidden">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            ${targetFormat.toUpperCase()}
          </div>
          <div class="truncate max-w-[180px] sm:max-w-xs">
            <p class="font-semibold text-white truncate">${result.filename}</p>
            <div class="flex items-center space-x-2 text-slate-400">
              <span>${formatFileSize(file.size)} → <strong class="text-emerald-400">${formatFileSize(result.blob.size)}</strong></span>
              ${isLighter ? `<span class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">-${reduction}%</span>` : ''}
            </div>
          </div>
        </div>
        <button onclick="downloadSingleConverted('${result.id}')" class="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold transition flex items-center space-x-1">
          <i data-lucide="download" class="w-3.5 h-3.5"></i>
          <span>Baixar</span>
        </button>
      `;
      if (window.lucide) lucide.createIcons();
    } catch (err) {
      itemEl.innerHTML = `<span class="text-red-400 font-semibold">Erro ao converter ${file.name}</span>`;
    }
  }

  countEl.innerText = convertedQueue.length;
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
    row.className = 'flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs';
    row.innerHTML = `
      <div class="flex items-center space-x-2.5 truncate">
        <span class="w-5 h-5 rounded-md bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-[10px]">${idx + 1}</span>
        <span class="font-medium text-white truncate max-w-xs">${file.name}</span>
        <span class="text-slate-400">(${formatFileSize(file.size)})</span>
      </div>
      <button onclick="removePdfFile(${idx})" class="text-slate-400 hover:text-rose-400 p-1">&times;</button>
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
      const pdfBytes = await mergedPdf.save();
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
  document.getElementById('res-view-name').innerText = name;
  document.getElementById('res-view-title').innerText = title;
  
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

function addExperienceField() {
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
      <input type="text" class="exp-role form-input" placeholder="Cargo (ex: Gerente de Projetos)" oninput="updateResumePreview()">
      <input type="text" class="exp-company form-input" placeholder="Empresa" oninput="updateResumePreview()">
    </div>
    <input type="text" class="exp-period form-input" placeholder="Período (ex: 2022 - Atual)" style="margin-bottom: 0.5rem;" oninput="updateResumePreview()">
    <textarea class="exp-desc form-input" rows="2" placeholder="Descreva conquistas mensuráveis..." oninput="updateResumePreview()"></textarea>
  `;
  container.appendChild(block);
  updateResumePreview();
}

function loadResumeSample() {
  document.getElementById('res-input-name').value = 'Mariana Silva Alencar';
  document.getElementById('res-input-title').value = 'Especialista em Marketing Digital & Growth';
  document.getElementById('res-input-email').value = 'mariana.alencar@email.com';
  document.getElementById('res-input-phone').value = '(11) 98765-4321';
  document.getElementById('res-input-loc').value = 'São Paulo, Brasil';
  document.getElementById('res-input-site').value = 'linkedin.com/in/mariana-growth';
  document.getElementById('res-input-summary').value = 'Especialista em Growth e Estratégia de Conteúdo com 6+ anos de experiência liderando campanhas digitais de alta conversão, gestão de tráfego pago e automação de marketing com ROAS médio de 4.8x.';
  document.getElementById('res-input-skills').value = 'SEO Avançado, Google Ads, Meta Ads, Análise de Dados, Growth Hacking, Copywriting, Liderança de Equipes, Automação de E-mail';
  document.getElementById('res-input-edu-degree').value = 'Pós-Graduação em Marketing Estratégico & Data Science';
  document.getElementById('res-input-edu-inst').value = 'Fundação Getulio Vargas (FGV)';
  document.getElementById('res-input-edu-year').value = '2022 - 2023';

  const container = document.getElementById('res-exp-inputs-container');
  if (container) {
    container.innerHTML = `
      <div class="res-exp-block glass-panel" style="padding: 1rem; margin-bottom: 1rem; border: 1px solid rgba(255,255,255,0.08);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--amber-primary);">Experiência 1</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
          <input type="text" class="exp-role form-input" value="Head de Growth & Tráfego" oninput="updateResumePreview()">
          <input type="text" class="exp-company form-input" value="Nexus Tech Corp" oninput="updateResumePreview()">
        </div>
        <input type="text" class="exp-period form-input" value="2023 - Presente" style="margin-bottom: 0.5rem;" oninput="updateResumePreview()">
        <textarea class="exp-desc form-input" rows="2" oninput="updateResumePreview()">Liderança de 8 profissionais, escala de faturamento de R$ 300k para R$ 1.8M/mês através de otimização de funil de vendas e testes A/B contínuos.</textarea>
      </div>
      <div class="res-exp-block glass-panel" style="padding: 1rem; margin-bottom: 1rem; border: 1px solid rgba(255,255,255,0.08);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--amber-primary);">Experiência 2</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
          <input type="text" class="exp-role form-input" value="Coordenadora de Performance" oninput="updateResumePreview()">
          <input type="text" class="exp-company form-input" value="Vanguard Mídia Digital" oninput="updateResumePreview()">
        </div>
        <input type="text" class="exp-period form-input" value="2020 - 2023" style="margin-bottom: 0.5rem;" oninput="updateResumePreview()">
        <textarea class="exp-desc form-input" rows="2" oninput="updateResumePreview()">Gestão de R$ 500k mensais em mídia de performance, redução do CAC em 34% e estruturação de dashboards em tempo real.</textarea>
      </div>
    `;
  }
  updateResumePreview();
}

function printResume() {
  window.print();
}

// ========================================================
// 2. CRIADOR DE CARTÃO DE VISITA (ARTE DE ELITE FRENTE E VERSO)
// ========================================================
let currentCardTheme = 'gold';

function setCardTheme(theme) {
  currentCardTheme = theme;
  const front = document.getElementById('card-preview-front');
  const back = document.getElementById('card-preview-back');
  if (front && back) {
    front.className = `business-card bc-theme-${theme}`;
    back.className = `business-card bc-theme-${theme}`;
  }
  document.querySelectorAll('.card-theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

function updateCardPreview() {
  const name = document.getElementById('card-input-name')?.value || 'Carlos Eduardo';
  const role = document.getElementById('card-input-role')?.value || 'Arquiteto de Soluções';
  const company = document.getElementById('card-input-company')?.value || 'SOLLIUS STUDIO';
  const phone = document.getElementById('card-input-phone')?.value || '+55 (11) 98888-7777';
  const email = document.getElementById('card-input-email')?.value || 'carlos@sollius.com.br';
  const site = document.getElementById('card-input-site')?.value || 'sollius.com.br';

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
  if (bPhone) bPhone.innerText = phone;
  const bEmail = document.getElementById('card-back-email');
  if (bEmail) bEmail.innerText = email;
  const bSite = document.getElementById('card-back-site');
  if (bSite) bSite.innerText = site;

  // Render QR Code on Card Back
  const qrContainer = document.getElementById('card-qr-box');
  if (qrContainer && window.QRCode) {
    qrContainer.innerHTML = '';
    const qrData = site.startsWith('http') ? site : `https://${site}`;
    new QRCode(qrContainer, {
      text: qrData,
      width: 72,
      height: 72,
      colorDark: currentCardTheme === 'minimal' ? '#0f172a' : '#ffffff',
      colorLight: 'transparent',
      correctLevel: QRCode.CorrectLevel.M
    });
  }
}

function downloadCardAsImage(elementId, filename) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  // Render high-res canvas
  const canvas = document.createElement('canvas');
  canvas.width = 1050; // 3.5 inches at 300 DPI
  canvas.height = 600;  // 2.0 inches at 300 DPI
  const ctx = canvas.getContext('2d');

  // Desenha fundo estilizado de acordo com o tema
  if (currentCardTheme === 'gold') {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#2a2211');
    grad.addColorStop(1, '#0a0a0c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Borda ouro
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
  } else if (currentCardTheme === 'cyber') {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#090A10');
    grad.addColorStop(1, '#1A0F2E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#8B5CF6';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
  } else if (currentCardTheme === 'holographic') {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#1E1B4B');
    grad.addColorStop(0.5, '#4C0519');
    grad.addColorStop(1, '#082F49');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
  } else {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
  }

  const name = document.getElementById('card-input-name')?.value || 'Carlos Eduardo';
  const role = document.getElementById('card-input-role')?.value || 'Arquiteto de Soluções';
  const company = document.getElementById('card-input-company')?.value || 'SOLLIUS STUDIO';
  const phone = document.getElementById('card-input-phone')?.value || '+55 (11) 98888-7777';
  const email = document.getElementById('card-input-email')?.value || 'carlos@sollius.com.br';
  const site = document.getElementById('card-input-site')?.value || 'sollius.com.br';

  const isLight = currentCardTheme === 'minimal';
  ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';

  if (elementId === 'card-preview-front') {
    // Top tag
    ctx.font = 'bold 24px -apple-system, sans-serif';
    ctx.fillStyle = currentCardTheme === 'gold' ? '#D4AF37' : (isLight ? '#2563EB' : '#A855F7');
    ctx.fillText(company.toUpperCase(), 70, 100);

    // Center Name
    ctx.font = 'bold 56px -apple-system, sans-serif';
    ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
    ctx.fillText(name, 70, 300);

    // Role
    ctx.font = '32px -apple-system, sans-serif';
    ctx.fillStyle = isLight ? '#64748B' : '#94A3B8';
    ctx.fillText(role, 70, 360);
  } else {
    // Back side
    ctx.font = 'bold 36px -apple-system, sans-serif';
    ctx.fillStyle = currentCardTheme === 'gold' ? '#D4AF37' : (isLight ? '#2563EB' : '#A855F7');
    ctx.fillText(company, 70, 100);

    ctx.font = '28px -apple-system, sans-serif';
    ctx.fillStyle = isLight ? '#334155' : '#E2E8F0';
    ctx.fillText(`📱  ${phone}`, 70, 220);
    ctx.fillText(`📧  ${email}`, 70, 290);
    ctx.fillText(`🌐  ${site}`, 70, 360);
  }

  canvas.toBlob(blob => {
    downloadBlob(blob, filename);
  }, 'image/png');
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

function initSignaturePad() {
  signatureCanvas = document.getElementById('signature-canvas');
  if (!signatureCanvas) return;
  signatureCtx = signatureCanvas.getContext('2d');
  
  // Set real pixel resolution
  const rect = signatureCanvas.getBoundingClientRect();
  signatureCanvas.width = rect.width * 2;
  signatureCanvas.height = rect.height * 2;
  signatureCtx.scale(2, 2);
  signatureCtx.lineCap = 'round';
  signatureCtx.lineJoin = 'round';

  function getPos(e) {
    const r = signatureCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - r.left,
      y: clientY - r.top
    };
  }

  signatureCanvas.addEventListener('pointerdown', (e) => {
    isDrawingSignature = true;
    const pos = getPos(e);
    signatureCtx.beginPath();
    signatureCtx.moveTo(pos.x, pos.y);
    signatureCtx.strokeStyle = currentPenColor;
    signatureCtx.lineWidth = currentPenWidth;
  });

  signatureCanvas.addEventListener('pointermove', (e) => {
    if (!isDrawingSignature) return;
    const pos = getPos(e);
    signatureCtx.lineTo(pos.x, pos.y);
    signatureCtx.stroke();
  });

  window.addEventListener('pointerup', () => {
    if (isDrawingSignature) {
      isDrawingSignature = false;
    }
  });
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
    document.getElementById('pdf-sign-action-area').classList.remove('hidden');
    
    if (window.confetti) confetti({ particleCount: 20 });
  } catch (err) {
    alert('Erro ao carregar PDF: ' + err.message);
  }
}

async function stampSignatureOnPdf() {
  if (!uploadedPdfBytes || !uploadedPdfDoc) {
    alert('Por favor, carregue um arquivo PDF primeiro.');
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

