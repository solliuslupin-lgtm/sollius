// ========================================================
// SOLLIUS TUTORIAIS & GUIAS TÉCNICOS
// Base de dados de tutoriais de jogos, otimização e tutoriais para PC Fraco
// ========================================================

const SOLLIUS_TUTORIALS_DATABASE = [
  {
    id: "god-of-war-pc-fraco",
    slug: "god-of-war-pc-fraco",
    title: "Como Baixar e Instalar God of War no PC Fraco [Download 100% Grátis + Otimizado]",
    tagline: "Tutorial completo com download direto pelo Google Drive, versão otimizada para computadores modestos e sem travamentos",
    category: "jogos-pc",
    categoryLabel: "⚔️ Games para PC",
    badge: "🔥 DOWNLOAD DISPONÍVEL",
    views: "52.8k visualizações",
    updatedDate: "30 de Outubro de 2026",
    readTime: "5 min de leitura",
    difficulty: "Muito Fácil",
    heroImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    description: "Aprenda como baixar e instalar God of War no PC fraco com download direto pelo Google Drive em alta velocidade. Guia passo a passo com configurações para rodar sem lag e atingir a máxima taxa de quadros.",
    downloadUrl: "https://drive.google.com/file/d/1MJGJKsFzp7HAbLWkNjIvrZOqUT5n4cNU/view?usp=sharing",
    systemRequirements: {
      minimum: {
        cpu: "Intel Core i3 (4ª geração ou superior) / AMD Ryzen 3 / FX-6300",
        gpu: "NVIDIA GeForce GTX 750 Ti / GTX 960 / AMD Radeon RX 550 / Intel UHD Graphics 630 ou superior",
        ram: "8 GB de Memória RAM",
        storage: "Espaço livre suficiente para descompactar e instalar (SSD recomendado)",
        os: "Windows 10 ou 11 (64-bit)"
      },
      recommended: {
        cpu: "Intel Core i5 / AMD Ryzen 5 ou superior",
        gpu: "NVIDIA GTX 1060 / GTX 1650 / RTX 2060 / AMD RX 570/580",
        ram: "16 GB RAM Dual-Channel",
        storage: "SSD NVMe M.2 ou SSD SATA",
        os: "Windows 10 ou 11 (64-bit) com drivers de vídeo atualizados"
      }
    },
    steps: [
      {
        number: "01",
        title: "Baixar o Jogo pelo Link Oficial do Google Drive",
        text: "Clique no botão de download em destaque nesta página para abrir o Google Drive seguro. O download é direto, sem encurtadores maliciosos ou propagandas irritantes."
      },
      {
        number: "02",
        title: "Extrair os Arquivos do Jogo",
        text: "Após concluir o download, utilize o <strong>Sollarys Ultra Compressor</strong> (ou WinRAR/7-Zip) para descompactar o arquivo em uma pasta de sua preferência (ex: <code>C:\\Jogos\\God of War</code>)."
      },
      {
        number: "03",
        title: "Executar o Instalador / Jogo como Administrador",
        text: "Entre na pasta descompactada, clique com o botão direito no executável principal do jogo (<code>.exe</code>) e selecione <strong>Executar como Administrador</strong> para garantir que o Windows conceda as permissões de gravação de save."
      },
      {
        number: "04",
        title: "Ajustar os Gráficos para PC Fraco (60 FPS)",
        text: "No menu de opções gráficas do jogo, defina a resolução em 1280x720 (720p) ou 1600x900. Ative o <strong>AMD FSR</strong> (FidelityFX Super Resolution) no modo Equilibrado ou Desempenho. Coloque Sombras, Reflexos e Oclusão de Ambiente no 'Baixo'."
      },
      {
        number: "05",
        title: "Jogar com Fluidez Máxima",
        text: "Pronto! O God of War rodará liso no seu computador modesto com resposta rápida nos combates com o Kratos."
      }
    ],
    faq: [
      {
        q: "O link do Google Drive diz que excedeu o limite de downloads, o que fazer?",
        a: "Basta estar logado em uma conta Google. Se der limite temporário do Google Drive, clique com o botão direito no arquivo no Drive, selecione 'Fazer uma cópia' para o seu próprio Drive e baixe a cópia instantaneamente sem restrições."
      },
      {
        q: "O jogo dá erro de DLL ausente (d3d11.dll, vcruntime140.dll)?",
        a: "Esse erro acontece quando o seu Windows não tem os pacotes oficiais da Microsoft instalados. Instale o pacote 'Visual C++ Redistributable AIO (2015-2022)' e o DirectX End-User Runtime oficial da Microsoft."
      },
      {
        q: "Roda em notebook com placa integrada (Intel HD / AMD Vega)?",
        a: "Sim! Se o seu processador tiver 4 núcleos e pelo menos 8GB de memória RAM, aplicando a resolução 720p com o FSR ativado no modo Desempenho você consegue jogar tranquilamente."
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
    description: "Aprenda a configurar o modo de jogo do Windows, otimizar o plano de energia e usar o Sollarys para manter seu sistema rápido e sem travamentos."
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
    description: "Guia definitivo para configurar o PCSX2 mais recente utilizando DirectX 11 / Vulkan, Speedhacks balanceados e correção de serrilhado."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SOLLIUS_TUTORIALS_DATABASE };
}
