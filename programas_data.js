// ========================================================
// SOLLIUS DESKTOP REPOSITORY - PROGRAMAS INSTALÁVEIS
// Este arquivo alimenta a interface web e o sistema de auto-atualização
// ========================================================

const SOLLIUS_DESKTOP_REPOSITORY = {
  updatedAt: "2026-10-29T16:00:00Z",
  repositoryVersion: "1.0.0",
  apps: [
    {
      id: "sollius-compressor",
      name: "SOLLIUS Ultra Compressor",
      tagline: "Substituto definitivo para WinRAR e 7-Zip com ultra compressão multithread",
      latestVersion: "1.0.0",
      releaseDate: "29 de Outubro de 2026",
      status: "available",
      badge: "Lançamento Oficial",
      isFeatured: true,
      icon: "🗜️",
      accentColor: "#3B82F6",
      downloadUrl: "downloads/sollius-compressor-setup-v1.0.0.exe",
      portableUrl: "downloads/sollius-compressor-portable-v1.0.0.zip",
      fileSize: "14.2 MB",
      sha256: "9f83a48e89f81a17967b66df8732e7c4e5e4088e5d6d34e068f2f2541a8c3d6e",
      minOS: "Windows 10 / 11 (64-bit)",
      architecture: "x64 (Nativo)",
      license: "Freeware • 100% Gratuito",
      description: "Compactador e descompactador nativo de alta velocidade com algoritmos modernos multithread (Zstandard, 7Z, LZMA2 e ZIP). Reduza arquivos e pastas em até 90% sem perdas, com criptografia AES-256 e sem propagandas irritantes.",
      features: [
        "Velocidade Turbo: Compactação até 2x mais rápida que formatos legados utilizando todos os núcleos do processador",
        "Suporte Universal: Abre e extrai arquivos .ZIP, .7Z, .RAR, .TAR, .GZ, .BZ2 e imagens .ISO",
        "Segurança Militar: Criptografia AES-256 bits integrada para proteger dados confidenciais com senha",
        "Auto-Atualização Contínua: O programa se mantém sempre na versão mais recente em segundo plano",
        "Zero Adware: Sem telas de aviso, sem compra de licença e sem instalar softwares indesejados"
      ],
      changelog: [
        {
          version: "1.0.0",
          date: "29/10/2026",
          notes: "Lançamento oficial da versão pública estável com motor de ultra compressão e suporte a atualização transparente."
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
