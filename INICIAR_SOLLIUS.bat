@echo off
title SOLLIUS ECOSYSTEM - SERVIDOR LOCAL
cls

cd /d "%~dp0"

echo ==============================================================================
echo       SOLLIUS - O ECOSSISTEMA DE FERRAMENTAS WEB DEFINITIVO
echo       100 por cento Processamento Local - Custo Zero de Nuvem
echo ==============================================================================
echo.
echo Abrindo seu navegador em http://localhost:8000 ...
echo.

start "" "http://localhost:8000"
python -m http.server 8000

pause
