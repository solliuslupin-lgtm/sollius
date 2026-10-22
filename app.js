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
});

// Navegação entre abas
function switchTab(tabId) {
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(el => el.classList.add('hidden'));

  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeContent) {
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
