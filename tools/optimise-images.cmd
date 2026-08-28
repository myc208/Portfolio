@echo off
REM ===========================================================================
REM  Drop any pictures or clips into the "incoming" folder next to this file,
REM  double-click this, and it shrinks them and files them where the site
REM  expects them. Then name them in assets/content.js.
REM
REM  Pictures  ->  assets/img/    as .webp
REM  Clips     ->  assets/gif/    as silent .mp4
REM ===========================================================================
setlocal
cd /d "%~dp0"
if not exist "incoming" mkdir "incoming"
where ffmpeg >nul 2>nul
if errorlevel 1 (
  echo.
  echo   ffmpeg is not on your PATH. Open a terminal and run:
  echo       winget install Gyan.FFmpeg
  echo   then close and reopen this window and try again.
  echo.
  pause
  exit /b 1
)
node "%~dp0optimise-images.mjs"
pause
