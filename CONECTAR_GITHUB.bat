@echo off
title SOLLIUS - CONECTAR AO GITHUB
cls

cd /d "%~dp0"

echo ==============================================================================
echo       SOLLIUS - CONEXAO AUTOMATICA COM GITHUB E CLOUDFLARE
echo ==============================================================================
echo.
echo Crie um repositorio vazio no seu GitHub (ex: "sollius").
echo Em seguida, copie a URL do repositorio (ex: https://github.com/SEU_USUARIO/sollius.git).
echo.
set /p REPO_URL="Cole a URL do seu repositorio GitHub aqui: "

if "%REPO_URL%"=="" (
    echo [ERRO] Nenhuma URL digitada.
    pause
    exit /b 1
)

echo.
echo [1/3] Configurando repositorio remoto...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [2/3] Garantindo branch main...
git branch -M main

echo [3/3] Enviando codigo para o GitHub...
git push -u origin main

echo.
echo ==============================================================================
echo SUCESSO! O codigo do SOLLIUS foi enviado para o seu GitHub!
echo.
echo Agora na Cloudflare:
echo 1. Va em Workers ^& Pages -^> Create application -^> Pages -^> Connect to Git
echo 2. Selecione seu repositorio do GitHub recem-criado
echo 3. Clique em Save and Deploy!
echo.
echo A partir de agora, qualquer alteracao que eu ou voce fizermos
echo sera publicada na Cloudflare AUTOMATICAMENTE em segundos!
echo ==============================================================================
echo.
pause
