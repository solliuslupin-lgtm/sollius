const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexHtmlPath = path.join(rootDir, 'index.html');
const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Ensure 404.html matches index.html
fs.writeFileSync(path.join(rootDir, '404.html'), baseHtml, 'utf8');
console.log('Generated 404.html');

const ROUTES = [
  {
    tab: 'remover',
    folder: 'remover-fundo',
    path: '/remover-fundo',
    title: 'Removedor de Fundo com IA Grátis e Ilimitado | SOLLIUS',
    desc: 'Remova o fundo de qualquer imagem automaticamente sem enviar fotos para servidores. Processamento 100% local e gratuito.'
  },
  {
    tab: 'curriculo',
    folder: 'curriculo-ats',
    path: '/curriculo-ats',
    title: 'Criador de Currículos Padrão ATS Gratuito | SOLLIUS',
    desc: 'Crie currículos modernos aprovados por robôs de RH com formatação A4 perfeita e acessibilidade visual.'
  },
  {
    tab: 'cartao',
    folder: 'cartao-de-visita',
    path: '/cartao-de-visita',
    title: 'Criador de Cartão de Visita de Elite com QR Code | SOLLIUS',
    desc: 'Crie artes gráficas de frente e verso com temas de luxo em 300 DPI e QR Code automático integrado.'
  },
  {
    tab: 'assinar-pdf',
    folder: 'assinar-pdf',
    path: '/assinar-pdf',
    title: 'Assinar PDF no Navegador 100% Privado | SOLLIUS',
    desc: 'Assine contratos e procurações diretamente no seu computador sem enviar documentos para a nuvem.'
  },
  {
    tab: 'limpar-gps',
    folder: 'limpar-gps',
    path: '/limpar-gps',
    title: 'Limpador de GPS & Metadados EXIF de Fotos | SOLLIUS',
    desc: 'Elimine coordenadas de GPS e dados de identificação da câmera de suas fotos antes de publicar na web.'
  },
  {
    tab: 'converter',
    folder: 'compressor-imagem',
    path: '/compressor-imagem',
    title: 'Compressor & Conversor de Imagens em Lote WebP | SOLLIUS',
    desc: 'Comprima e converta imagens para WebP, PNG e JPG reduzindo até 90% do tamanho com download em ZIP.'
  },
  {
    tab: 'pdf',
    folder: 'pdf-studio',
    path: '/pdf-studio',
    title: 'PDF Studio: Juntar PDFs e Fotos para PDF | SOLLIUS',
    desc: 'Mescle múltiplos PDFs e boletos em ordem ou transforme imagens em PDF único de graça sem filas.'
  },
  {
    tab: 'tags',
    folder: 'gerador-tags-virais',
    path: '/gerador-tags-virais',
    title: 'Gerador de Tags Virais & Click Magnet para YouTube e TikTok | SOLLIUS',
    desc: 'Gere tags otimizadas para o YouTube Studio, fórmulas de títulos de alto clique e hashtags para TikTok.'
  },
  {
    tab: 'qrcode',
    folder: 'gerador-qrcode',
    path: '/gerador-qrcode',
    title: 'Gerador de QR Code Pro Vitalício sem Expiração | SOLLIUS',
    desc: 'Crie QR Codes personalizados para Pix, links, WhatsApp e Wi-Fi que nunca expiram e sem mensalidade.'
  },
  {
    tab: 'texto',
    folder: 'formatador-texto',
    path: '/formatador-texto',
    title: 'Text Studio: Contador e Limpador de Linhas | SOLLIUS',
    desc: 'Remova linhas duplicadas, conte caracteres e palavras e formate textos online com 1 clique.'
  },
  {
    tab: 'recorder',
    folder: 'gravador-de-tela',
    path: '/gravador-de-tela',
    title: 'Gravador de Tela e Áudio Gratuito sem Instalação | SOLLIUS',
    desc: 'Grave sua tela, gameplay ou tutoriais com microfone e áudio interno direto pelo navegador.'
  },
  {
    tab: 'transcritor',
    folder: 'transcritor-de-audio',
    path: '/transcritor-de-audio',
    title: 'Transcritor de Voz IA com Contexto & Sugestões de Dúvidas | SOLLIUS',
    desc: 'Transcreva gravações, podcasts e reuniões de até 2 horas com detecção inteligente de palavras duvidosas, compreensão de tema e exportação SRT.'
  },
  {
    tab: 'office',
    folder: 'conversor-documentos',
    path: '/conversor-documentos',
    title: 'Conversor Office & PDF Studio (Word & Excel) Gratuito | SOLLIUS',
    desc: 'Converta planilhas Excel (XLSX, CSV) e documentos Word (DOCX) em PDF A4, JSON e HTML 100% no navegador sem instalar programas.'
  },
  {
    tab: 'jogos',
    folder: 'jogos',
    path: '/jogos',
    title: 'Jogos Online Grátis no Navegador | SOLLIUS Games Arcade',
    desc: 'Jogue +40 jogos online grátis sem download nem cadastro no celular e PC. Corrida 3D, Motos, Ação FPS, Puzzles, Retrô e Esportes instantâneos.'
  }
];

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
  // Replace body to set data-initial-tab
  html = html.replace('<body>', `<body data-initial-tab="${r.tab}">`);

  const targetFile = path.join(dir, 'index.html');
  fs.writeFileSync(targetFile, html, 'utf8');
  console.log(`Generated route for ${r.path} -> ${targetFile}`);
}

console.log('All routes generated successfully!');
