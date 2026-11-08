@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Opening the static preview instead.
  start "" "%~dp0index.html"
  exit /b
)
start "Kumars website preview" /min cmd /c "node server.js"
timeout /t 2 /nobreak >nul
start "" "http://localhost:8080"
