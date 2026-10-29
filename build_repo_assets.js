const fs = require('fs');
const path = require('path');

const repo = require('./programas_data.js');

const rootDir = __dirname;
const downloadsDir = path.join(rootDir, 'downloads');
const programasDir = path.join(rootDir, 'programas');

if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });
if (!fs.existsSync(programasDir)) fs.mkdirSync(programasDir, { recursive: true });

// 1. Generate updates.json for Desktop Auto-Updater
const updatesJsonContent = JSON.stringify({
  repository: "SOLLIUS Official Desktop Software Repository",
  updatedAt: repo.updatedAt,
  apps: {
    "sollius-compressor": {
      id: "sollarys-compressor",
      name: "Sollarys Ultra Compressor",
      version: "1.02",
      latestVersion: "1.02",
      releaseDate: "2026-10-29",
      minSupportedVersion: "1.01",
      mandatory: false,
      downloadUrl: "https://sollius.com.br/downloads/Sollarys-1.02-Setup-Windows-x64.exe",
      sha256: "aff735ad89141893327ae99dabee3e83e26d07e957134aa2e2f3313f39c87e3a",
      fileSize: "18.5 MB",
      changelog: "Versão 1.02 do Sollarys: Super velocidade Turbo multithread (300-600+ MB/s), inicialização instantânea com buffers de 1MB, nova barra de progresso com porcentagem em tempo real, medição de velocidade e controles para Pausar, Retomar e Cancelar."
    },
    "sollius-cleaner": {
      id: "sollius-cleaner",
      name: "SOLLIUS Memory & Anti-Miner",
      version: "1.0.0-beta",
      latestVersion: "1.0.0-beta",
      status: "coming_soon"
    },
    "sollius-torrent": {
      id: "sollius-torrent",
      name: "SOLLIUS Torrent Streamer",
      version: "0.9.0-alpha",
      latestVersion: "0.9.0-alpha",
      status: "coming_soon"
    }
  }
}, null, 2);

fs.writeFileSync(path.join(programasDir, 'updates.json'), updatesJsonContent, 'utf8');
fs.writeFileSync(path.join(downloadsDir, 'updates.json'), updatesJsonContent, 'utf8');

// 2. Stable manifest for updater
const stableJsonContent = JSON.stringify({
  version: "1.02",
  type: "installer",
  url: "https://sollius.com.br/downloads/Sollarys-1.02-Setup-Windows-x64.exe",
  sha256: "aff735ad89141893327ae99dabee3e83e26d07e957134aa2e2f3313f39c87e3a",
  notes: "Atualização Sollarys 1.02: Super velocidade Turbo multithread (300-600+ MB/s), inicialização instantânea, barra de progresso com porcentagem em tempo real e botões de controle para Pausar, Retomar e Cancelar."
}, null, 2);

fs.writeFileSync(path.join(programasDir, 'stable.json'), stableJsonContent, 'utf8');
fs.writeFileSync(path.join(downloadsDir, 'stable.json'), stableJsonContent, 'utf8');

// 3. Create downloads/index.html that redirects to /programas/
const downloadsRedirectHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/programas/">
  <title>Redirecionando para SOLLIUS Softwares Desktop...</title>
  <link rel="canonical" href="https://sollius.com.br/programas/">
</head>
<body>
  <p>Redirecionando para a central de downloads... <a href="/programas/">Clique aqui se não for redirecionado.</a></p>
</body>
</html>`;
fs.writeFileSync(path.join(downloadsDir, 'index.html'), downloadsRedirectHtml, 'utf8');
console.log('Repo assets build complete for v1.02!');
