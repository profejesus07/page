@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Profe Jesus Alvarez - servidor local
if not exist node_modules (
  echo Instalando dependencias...
  call npm install
)
echo Abriendo http://localhost:5183/ ...
call npm start
pause
