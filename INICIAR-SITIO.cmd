@echo off
setlocal
cd /d "%~dp0"
set "PATH=%ProgramFiles%\nodejs;%PATH%"
where node.exe >nul 2>&1
if errorlevel 1 (
  echo No se encontro Node.js. Instala Node.js y vuelve a abrir este archivo.
  pause
  exit /b 1
)
if not exist "node_modules\vite\bin\vite.js" (
  echo Preparando las dependencias del sitio...
  call npm.cmd ci
  if errorlevel 1 (
    echo No se pudieron instalar las dependencias. Revisa la conexion a Internet y el error anterior.
    pause
    exit /b 1
  )
)
node.exe "%~dp0scripts\start-site.mjs" %*
if errorlevel 1 (
  echo.
  echo El sitio no pudo iniciar. El motivo aparece arriba.
  pause
  exit /b 1
)
endlocal
