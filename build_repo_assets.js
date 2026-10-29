const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

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
      id: "sollius-compressor",
      name: "Sollius Ultra Compressor",
      version: "1.01",
      latestVersion: "1.01",
      releaseDate: "2026-10-29",
      minSupportedVersion: "1.01",
      mandatory: false,
      downloadUrl: "https://sollius.com.br/downloads/Sollius-1.01-Setup-Windows-x64.exe",
      portableUrl: "https://sollius.com.br/downloads/Sollius-1.01-Windows-x64.zip",
      sha256: "bb5d16a30033f04852d7e5d118b526ee13f61633f00cb4480b88705b8618693d",
      fileSize: "14.7 MB",
      changelog: "Lançamento oficial da versão estável v1.01. Motor multithread com ultra compressão Zstandard e suporte a ZIP, 7Z, RAR e ISO com auto-atualização conectada."
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
console.log('Created updates.json in /programas and /downloads');

// 2. Create downloads/index.html that redirects to /programas
const downloadsRedirectHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/programas">
  <title>Redirecionando para SOLLIUS Softwares Desktop...</title>
  <link rel="canonical" href="https://sollius.com.br/programas">
</head>
<body>
  <p>Redirecionando para a central de downloads... <a href="/programas">Clique aqui se não for redirecionado.</a></p>
</body>
</html>`;
fs.writeFileSync(path.join(downloadsDir, 'index.html'), downloadsRedirectHtml, 'utf8');
console.log('Repo assets build complete for v1.01!');

console.log('Build repo assets complete!');
