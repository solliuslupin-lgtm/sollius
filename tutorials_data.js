// ========================================================
// SOLLIUS TUTORIAIS & GUIAS TÉCNICOS
// Base de dados de tutoriais de emulação, otimização e tutoriais para PC Fraco
// ========================================================

const SOLLIUS_TUTORIALS_DATABASE = [
  {
    id: "god-of-war-3-pc-fraco",
    slug: "god-of-war-3-pc-fraco",
    title: "God of War 3 no PC Fraco: Como Rodar a 60 FPS no RPCS3 sem Travamentos",
    tagline: "Configuração definitiva de emulador RPCS3 com patches de desempenho, remoção de sombras e FSR para placas fracas",
    category: "emulacao",
    categoryLabel: "🎮 Emulação PS3",
    badge: "🔥 Mais Acessado",
    views: "48.2k visualizações",
    updatedDate: "30 de Outubro de 2026",
    readTime: "6 min de leitura",
    difficulty: "Fácil / Médio",
    heroImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    description: "Guia completo passo a passo para rodar God of War III no PC fraco utilizando o emulador RPCS3. Aprenda a configurar a renderização Vulkan, aplicar o patch de 60 FPS, desativar efeitos pesados e baixar o preset pronto.",
    youtubeVideoId: "", // ID do vídeo do YouTube (ex: dQw4w9WgXcQ) caso o usuário queira incorporar seu vídeo
    youtubePlaceholder: "https://www.youtube.com", // Link para o canal ou vídeo
    systemRequirements: {
      minimum: {
        cpu: "Processador 4 núcleos / 8 threads (Intel Core i3 10ª ger / i7 4770 / Ryzen 3 3200G)",
        gpu: "Gráficos integrados Intel UHD 630 / AMD Vega 7/8 ou GPU dedicada GTX 750 Ti / RX 550 (compatível com Vulkan)",
        ram: "8 GB de Memória RAM (Dual-channel altamente recomendado)",
        storage: "40 GB de espaço livre (SSD recomendado para evitar stuttering de áudio)",
        os: "Windows 10 ou 11 (64-bit)"
      },
      recommended: {
        cpu: "Processador 6 núcleos / 12 threads (Intel Core i5 10400F+ / Ryzen 5 3600+ / 5600G)",
        gpu: "NVIDIA GTX 1060 / GTX 1650 / RTX 2060 / AMD RX 580 ou superior",
        ram: "16 GB RAM Dual-Channel",
        storage: "SSD NVMe M.2 ou SATA III",
        os: "Windows 11 (64-bit) com drivers atualizados"
      }
    },
    downloadLinks: [
      {
        id: "rpcs3-optimized",
        title: "RPCS3 Build Otimizada (Preset PC Fraco)",
        desc: "Emulador RPCS3 com perfil de compilação rápida de shaders, FSR ativado e ajuste de Threads SPU pronto para uso.",
        badge: "Recomendado",
        fileSize: "32.4 MB",
        fileType: "ZIP / Executável",
        url: "https://rpcs3.net/download",
        fallbackNote: "Você pode substituir este link pelo seu link direto do Google Drive, MediaFire ou Mega a qualquer momento."
      },
      {
        id: "patches-performance",
        title: "Pacote de Patches 60 FPS & No-Blur (patch.yml)",
        desc: "Remove o motion blur pesado, sombras volumétricas e desbloqueia taxa de quadros suave em hardware modesto.",
        badge: "Essencial",
        fileSize: "14 KB",
        fileType: "YML Patch",
        url: "#download-patches",
        fallbackNote: "Inclui instruções de instalação em 1 clique na pasta patches do RPCS3."
      },
      {
        id: "ps3-firmware",
        title: "Firmware Oficial PlayStation 3 (PS3UPDAT.PUP)",
        desc: "Software de sistema original da Sony exigido pelo RPCS3 para decodificar bibliotecas oficiais e som do jogo.",
        badge: "Oficial Sony",
        fileSize: "196 MB",
        fileType: "PUP Oficial",
        url: "https://www.playstation.com/pt-br/support/hardware/ps3/system-software/",
        fallbackNote: "Download 100% seguro vindo diretamente dos servidores da Sony Interactive Entertainment."
      }
    ],
    rpcs3Settings: [
      { tab: "CPU", param: "PPU Decoder", value: "Recompiler (LLVM)", reason: "Melhor velocidade de processamento da CPU" },
      { tab: "CPU", param: "SPU Decoder", value: "Recompiler (LLVM)", reason: "Otimiza a leitura de física e inteligência artificial" },
      { tab: "CPU", param: "SPU Block Size", value: "Mega", reason: "Crucial para God of War 3 não travar no PC fraco" },
      { tab: "CPU", param: "Enable SPU Loop Detection", value: "Ativado (ON)", reason: "Reduz o consumo excessivo de CPU" },
      { tab: "GPU", param: "Renderer", value: "Vulkan", reason: "Obrigatório para placas de vídeo modernas e integradas" },
      { tab: "GPU", param: "Resolution Scale", value: "100% (1280x720)", reason: "Resolução nativa sem forçar o chip gráfico" },
      { tab: "GPU", param: "AMD FidelityFX FSR", value: "Ativado (Upscaling Inteligente)", reason: "Deixa a imagem nítida em monitores 1080p sem perda de FPS" },
      { tab: "GPU", param: "Driver Wake-Up Delay", value: "200 μs ou 400 μs", reason: "Elimina congelamento de tela e travamentos em cenas pesadas" },
      { tab: "Audio", param: "Audio Buffer", value: "100 ms (ou Stretch Audio ativado)", reason: "Elimina ruídos e picotes de som quando o FPS oscilar" }
    ],
    steps: [
      {
        number: "01",
        title: "Instalar o Firmware Oficial no RPCS3",
        text: "Abra o RPCS3, vá em <code>File -> Install Firmware</code> e selecione o arquivo <code>PS3UPDAT.PUP</code> baixado. Aguarde a compilação inicial dos módulos essenciais do sistema da Sony."
      },
      {
        number: "02",
        title: "Adicionar o God of War 3 à sua Biblioteca",
        text: "Clique em <code>File -> Add Games</code> e selecione a pasta onde está a cópia do seu jogo (código BCUS98111, BCES00510 ou formato pasta/ISO extraída). O ícone com o Kratos aparecerá na lista."
      },
      {
        number: "03",
        title: "Aplicar o Preset Gráfico de Alta Performance",
        text: "Clique com o botão direito no God of War 3 na lista e vá em <code>Create Custom Configuration</code>. Aplique exatamente os valores da tabela de ajustes (Vulkan, SPU Block Size Mega, Wake-Up Delay 200μs e FSR ativo)."
      },
      {
        number: "04",
        title: "Ativar os Patches de 60 FPS e Desativar Sombras Pesadas",
        text: "Na janela principal, vá em <code>Manage -> Game Patches</code>. Marque a caixa do God of War 3 e ative: <em>Unlock FPS</em>, <em>Disable Motion Blur</em> e <em>Disable Depth of Field</em>. Clique em Salvar."
      },
      {
        number: "05",
        title: "Primeira Execução e Cache de Shaders",
        text: "Inicie o jogo com duplo clique. Na primeira vez, o emulador compilará os shaders (PPU Cache). Deixe concluir sem interromper. No início de cada fase nova pode haver pequenas engasgadas normais enquanto salva os efeitos na memória."
      }
    ],
    faq: [
      {
        q: "O áudio fica chiando ou em câmera lenta no meu PC, como resolver?",
        a: "Vá nas configurações do jogo no RPCS3, aba 'Audio', marque a opção 'Enable Audio Stretching' e ajuste o Buffer para 100ms a 120ms. Isso força o sincronismo de áudio mesmo quando os FPS caírem em batalhas cheias de inimigos."
      },
      {
        q: "O jogo congela em uma tela preta após a cutscene inicial de Gaia?",
        a: "Vá na aba 'Advanced' e suba o 'Driver Wake-Up Delay' para 400 μs ou 600 μs. Esse ajuste dá tempo extra para os fios de execução da CPU do PS3 sincronizarem no PC fraco."
      },
      {
        q: "Gráficos integrados Intel HD / AMD Vega aguentam rodar?",
        a: "Sim! Se o seu processador tiver pelo menos 4 núcleos e suporte a instruções AVX2 com Vulkan instalado, você consegue entre 30 e 50+ FPS constantes com a resolução em 720p e FSR ativado."
      }
    ]
  },
  {
    id: "otimizar-windows-pc-fraco",
    slug: "otimizar-windows-pc-fraco",
    title: "Otimização Extrema para Windows 10 e 11: Mais FPS em Jogos",
    tagline: "Desative serviços inúteis, telemetria pesada e processos em segundo plano para liberar até 3 GB de RAM",
    category: "windows",
    categoryLabel: "💻 Otimização PC",
    badge: "Essencial",
    views: "23.4k visualizações",
    updatedDate: "28 de Outubro de 2026",
    readTime: "4 min de leitura",
    difficulty: "Fácil",
    heroImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    description: "Aprenda a configurar o modo de jogo do Windows, otimizar o plano de energia e usar o Sollarys para manter seu sistema rápido e sem travamentos.",
    isUpcoming: false
  },
  {
    id: "pcsx2-emulador-ps2-pc-fraco",
    slug: "pcsx2-emulador-ps2-pc-fraco",
    title: "Como Configurar o PCSX2 (PS2) para PC Super Fraco a 60 FPS",
    tagline: "Jogue clássicos do PlayStation 2 com resolução HD em computadores antigos sem placa de vídeo",
    category: "emulacao",
    categoryLabel: "🎮 Emulação PS2",
    badge: "Popular",
    views: "18.7k visualizações",
    updatedDate: "27 de Outubro de 2026",
    readTime: "5 min de leitura",
    difficulty: "Fácil",
    heroImage: "https://images.unsplash.com/photo-1612287233207-640a2a4b8df2?w=1200&q=80",
    description: "Guia definitivo para configurar o PCSX2 mais recente utilizando DirectX 11 / Vulkan, Speedhacks balanceados e correção de serrilhado.",
    isUpcoming: false
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SOLLIUS_TUTORIALS_DATABASE };
}
