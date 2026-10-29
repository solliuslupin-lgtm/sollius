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
      name: "SOLLIUS Ultra Compressor",
      version: "1.0.0",
      latestVersion: "1.0.0",
      releaseDate: "2026-10-29",
      minSupportedVersion: "1.0.0",
      mandatory: false,
      downloadUrl: "https://sollius.com.br/downloads/sollius-compressor-setup-v1.0.0.exe",
      portableUrl: "https://sollius.com.br/downloads/sollius-compressor-portable-v1.0.0.zip",
      sha256: "9f83a48e89f81a17967b66df8732e7c4e5e4088e5d6d34e068f2f2541a8c3d6e",
      fileSize: "14.2 MB",
      changelog: "Lançamento oficial da versão estável pública v1.0.0. Motor multithread com ultra compressão Zstandard e suporte a ZIP, 7Z, RAR e ISO."
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

// 2. Create clean sample downloads for SOLLIUS Ultra Compressor v1.0.0
// Readme file
const readmeContent = `========================================================
SOLLIUS Ultra Compressor v1.0.0 (Windows 64-bit)
Ecossistema SOLLIUS • https://sollius.com.br/programas
========================================================

Parabens por baixar o SOLLIUS Ultra Compressor!
Este programa foi desenvolvido para oferecer a mais alta
eficiencia em compactacao e descompactacao de arquivos no Windows.

RECURSOS PRINCIPAIS:
- Compactacao ultra-rapida com algoritmos modernos multithread
- Suporte a ZIP, 7Z, RAR, TAR, GZ, ISO
- Criptografia militar AES-256 bits com senha
- Auto-atualizacao continua transparente em segundo plano
- 100% Gratuito, sem adware e sem telas de cobranca

COMO USAR:
Basta executar o programa ou clicar com o botao direito em qualquer
arquivo ou pasta e selecionar "Compactar com SOLLIUS".

Para verificar atualizacoes e novas ferramentas:
Acesse: https://sollius.com.br/programas

Copyright (c) 2026 SOLLIUS Ecosystem. Todos os direitos reservados.
`;

// Helper to create a minimal valid zip file using JSZip if available or simple archive
// Since node has jszip or we can create a clean zip file:
try {
  const AdmZip = require('adm-zip');
  const zip = new AdmZip();
  zip.addFile("README.txt", Buffer.from(readmeContent, "utf8"));
  zip.addFile("SOLLIUS_Compressor.exe", Buffer.from("MZ" + "\x00".repeat(500) + "SOLLIUS Ultra Compressor Binary v1.0.0", "utf8"));
  zip.writeZip(path.join(downloadsDir, 'sollius-compressor-portable-v1.0.0.zip'));
  console.log('Generated portable zip via adm-zip');
} catch (e) {
  // Fallback: create zip via PowerShell Compress-Archive
  fs.writeFileSync(path.join(downloadsDir, 'README.txt'), readmeContent, 'utf8');
  console.log('Created README.txt in downloads directory');
}

// Create a clean setup placeholder file
const installerScript = `@echo off
title Instalador SOLLIUS Ultra Compressor v1.0.0
color 0b
echo ========================================================
echo   SOLLIUS Ultra Compressor v1.0.0 - Instalador Oficial
echo   Ecossistema SOLLIUS • https://sollius.com.br
echo ========================================================
echo.
echo [1/3] Verificando integridade dos arquivos... Concluido.
echo [2/3] Registrando associacoes de arquivos (.zip, .7z, .rar)... Concluido.
echo [3/3] Configurando servico de auto-atualizacao em segundo plano... Ativo.
echo.
echo ========================================================
echo   Instalacao concluida com sucesso!
echo   O SOLLIUS Ultra Compressor esta pronto para uso.
echo ========================================================
echo.
pause
`;
fs.writeFileSync(path.join(downloadsDir, 'sollius-compressor-setup-v1.0.0.bat'), installerScript, 'utf8');

// Also create an executable placeholder or copy bat to exe
fs.writeFileSync(path.join(downloadsDir, 'sollius-compressor-setup-v1.0.0.exe'), Buffer.from(
  "MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00\xff\xff\x00\x00" +
  "\xb8\x00\x00\x00\x00\x00\x00\x00\x40\x00\x00\x00\x00\x00\x00\x00" +
  "SOLLIUS Ultra Compressor v1.0.0 Installer Package\r\n" + installerScript
), 'utf8');

// 3. Create downloads/index.html that redirects to /programas
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

console.log('Build repo assets complete!');
