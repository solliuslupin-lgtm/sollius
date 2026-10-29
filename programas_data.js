// ========================================================
// SOLLIUS DESKTOP REPOSITORY - PROGRAMAS INSTALÁVEIS
// Este arquivo alimenta a interface web e o sistema de auto-atualização
// ========================================================

const SOLLIUS_DESKTOP_REPOSITORY = {
  updatedAt: "2026-10-29T18:00:00Z",
  repositoryVersion: "1.01",
  apps: [
    {
      id: "sollius-compressor",
      name: "Sollius Ultra Compressor",
      tagline: "Substituto definitivo para WinRAR e 7-Zip com ultra compressão multithread",
      latestVersion: "1.01",
      releaseDate: "29 de Outubro de 2026",
      status: "available",
      badge: "Lançamento Oficial v1.01",
      isFeatured: true,
      icon: "🗜️",
      accentColor: "#3B82F6",
      downloadUrl: "downloads/Sollius-1.01-Setup-Windows-x64.exe",
      portableUrl: "downloads/Sollius-1.01-Windows-x64.zip",
      fileSize: "14.7 MB",
      sha256: "bb5d16a30033f04852d7e5d118b526ee13f61633f00cb4480b88705b8618693d",
      minOS: "Windows 10 / 11 (64-bit)",
      architecture: "x64 (Nativo)",
      license: "Freeware • 100% Gratuito",
      description: "Compactador e descompactador nativo de alta velocidade com algoritmos modernos multithread (Zstandard, 7Z, LZMA2 e ZIP). Reduza arquivos e pastas em até 90% sem perdas, com criptografia AES-256 e sem propagandas irritantes.",
      features: [
        "Velocidade Turbo: Compactação até 2x mais rápida que formatos legados utilizando todos os núcleos do processador",
        "Suporte Universal: Abre e extrai arquivos .ZIP, .7Z, .RAR, .TAR, .GZ, .BZ2 e imagens .ISO",
        "Segurança Militar: Criptografia AES-256 bits integrada para proteger dados confidenciais com senha",
        "Auto-Atualização Conectada: Conectado automaticamente ao repositório oficial da Sollius para novas versões",
        "Zero Adware: Sem telas de aviso, sem compra de licença e sem instalar softwares indesejados"
      ],
      changelog: [
        {
          version: "1.01",
          date: "29/10/2026",
          notes: "Versão oficial estável v1.01 com auto-atualização conectada diretamente ao repositório oficial Sollius, motor Solarys multithread e suporte a formatos universais."
        }
      ]
    },
    {
      id: "sollius-cleaner",
      name: "SOLLIUS Memory & Anti-Miner",
      tagline: "Limpador profundo de RAM e detector de mineradores ocultos",
      latestVersion: "1.0.0-beta",
      releaseDate: "Em Breve",
      status: "coming_soon",
      badge: "Em Testes Finais",
      isFeatured: false,
      icon: "🧹",
      accentColor: "#10B981",
      downloadUrl: "#",
      portableUrl: "#",
      fileSize: "11.8 MB",
      sha256: "pendente",
      minOS: "Windows 10 / 11 (64-bit)",
      architecture: "x64",
      license: "Freeware • 100% Gratuito",
      description: "Otimizador em tempo real de memória RAM com varredura heurística contra scripts de mineração de criptomoedas ocultos em programas de terceiros e downloads da internet.",
      features: [
        "Limpeza instantânea de Standby List e Working Set de memória",
        "Detector de processos suspeitos que utilizam GPU/CPU em segundo plano",
        "Relatório transparente de integridade do sistema"
      ],
      changelog: [
        {
          version: "1.0.0-beta",
          date: "Em Breve",
          notes: "Fase de testes com heurística de proteção de processos."
        }
      ]
    },
    {
      id: "sollius-torrent",
      name: "SOLLIUS Torrent Streamer",
      tagline: "Cliente torrent ultraleve com streaming de vídeo sem anúncios",
      latestVersion: "0.9.0-alpha",
      releaseDate: "Em Breve",
      status: "coming_soon",
      badge: "Em Desenvolvimento",
      isFeatured: false,
      icon: "⚡",
      accentColor: "#8B5CF6",
      downloadUrl: "#",
      portableUrl: "#",
      fileSize: "18.5 MB",
      sha256: "pendente",
      minOS: "Windows 10 / 11 (64-bit)",
      architecture: "x64",
      license: "Freeware • 100% Gratuito",
      description: "Cliente P2P moderno que permite assistir a vídeos e áudios instantaneamente enquanto o download é concluído, sem instaladores adicionais ou anúncios abusivos.",
      features: [
        "Player embutido para reprodução imediata durante o download",
        "Consumo mínimo de bateria e processador",
        "Protocolo moderno de criptografia ponta a ponta"
      ],
      changelog: [
        {
          version: "0.9.0-alpha",
          date: "Em Breve",
          notes: "Implementação inicial do motor libtorrent e interface fluida."
        }
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SOLLIUS_DESKTOP_REPOSITORY;
}
