@echo off
title SOLLIUS - PUBLICAR ATUALIZACAO AUTOMATICA
cls

cd /d "%~dp0"

echo ==============================================================================
echo       SOLLIUS - DEPLOY AUTOMATICO PARA CLOUDFLARE PAGES
echo ==============================================================================
echo.
echo [1/3] Identificando alteracoes locais...
git add .

echo [2/3] Gerando commit de atualizacao...
set "MSG=Atualizacao Sollius: %date% as %time%"
git commit -m "%MSG%"

echo [3/3] Enviando para o GitHub (Disparando Deploy na Cloudflare)...
git push origin main

echo.
echo ==============================================================================
echo SUCESSO! Alteracoes enviadas para o GitHub!
echo A Cloudflare Pages ja detectou o envio e esta atualizando seu site ao vivo!
echo ==============================================================================
echo.
pause
