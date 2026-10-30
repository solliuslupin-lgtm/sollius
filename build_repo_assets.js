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
      version: "1.03",
      latestVersion: "1.03",
      releaseDate: "2026-10-29",
      minSupportedVersion: "1.01",
      mandatory: false,
      downloadUrl: "https://sollius.com.br/downloads/Sollarys-1.03-Setup-Windows-x64.exe",
      sha256: "0d0cdb65905805ce08613156e1398c7817fbcd977c887087fb10985ffe1b2a44",
      fileSize: "18.5 MB",
      changelog: "Versão 1.03 do Sollarys: Atualização direta pelo app, validação de integridade SHA-256 e melhorias de estabilidade."
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
  version: "1.03",
  type: "installer",
  url: "https://sollius.com.br/downloads/Sollarys-1.03-Setup-Windows-x64.exe",
  sha256: "0d0cdb65905805ce08613156e1398c7817fbcd977c887087fb10985ffe1b2a44",
  notes: "Atualização Sollarys 1.03: Validação de auto-atualização direta pelo app, novo pacote assinado com SHA-256 e melhorias de estabilidade."
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
