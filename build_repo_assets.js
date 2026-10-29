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
      sha256: "34285b62deb294991b6ae6f80bb2fd7bbf6e41083ffe641c6462ff08992d8440",
      fileSize: "18.5 MB",
      changelog: "Versão 1.02 do Sollarys: Nova barra de progresso com porcentagem em tempo real, medição de velocidade, suporte a Pausar, Retomar e Cancelar operações e aprimoramento no motor Zstandard."
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
  sha256: "34285b62deb294991b6ae6f80bb2fd7bbf6e41083ffe641c6462ff08992d8440",
  notes: "Atualização Sollarys 1.02: Nova barra de progresso com porcentagem em tempo real, cálculo de velocidade de compactação/extração, e botões de controle para Pausar, Retomar e Cancelar."
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
