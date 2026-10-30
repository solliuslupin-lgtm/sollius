const https = require('https');

const payload = JSON.stringify({
  host: 'sollius.com.br',
  key: 'c8d17b54a20945e4860b7218f4a2179e',
  keyLocation: 'https://sollius.com.br/c8d17b54a20945e4860b7218f4a2179e.txt',
  urlList: [
    'https://sollius.com.br/',
    'https://sollius.com.br/jogos/',
    'https://sollius.com.br/tutoriais/',
    'https://sollius.com.br/tutoriais/god-of-war-pc-fraco/',
    'https://sollius.com.br/tutoriais/god-of-war-3-pc-fraco/',
    'https://sollius.com.br/programas/',
    'https://sollius.com.br/sollius-compressor/',
    'https://sollius.com.br/remover-fundo/',
    'https://sollius.com.br/curriculo-ats/',
    'https://sollius.com.br/cartao-de-visita/',
    'https://sollius.com.br/assinar-pdf/',
    'https://sollius.com.br/limpar-gps/',
    'https://sollius.com.br/compressor-imagem/',
    'https://sollius.com.br/pdf-studio/',
    'https://sollius.com.br/gerador-tags-virais/',
    'https://sollius.com.br/gerador-qrcode/',
    'https://sollius.com.br/formatador-texto/',
    'https://sollius.com.br/gravador-de-tela/',
    'https://sollius.com.br/transcritor-de-audio/',
    'https://sollius.com.br/conversor-documentos/'
  ]
});

function postIndexNow(hostname) {
  const options = {
    hostname: hostname,
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, (res) => {
    console.log(`[${hostname}] IndexNow Response Code: ${res.statusCode} (${res.statusMessage})`);
    res.on('data', () => {});
  });

  req.on('error', (e) => {
    console.error(`[${hostname}] Error:`, e.message);
  });

  req.write(payload);
  req.end();
}

console.log('Notifying search engines via IndexNow...');
postIndexNow('api.indexnow.org');
postIndexNow('www.bing.com');
