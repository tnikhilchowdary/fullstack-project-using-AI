@echo off
title MERN Todo App - Servers
color 0A
echo.
echo ========================================
echo    Starting MERN Todo App Servers
echo ========================================
echo.
echo [1/2] Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"
timeout /t 2 /nobreak > nul
echo.
echo [2/2] Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm start"
echo.
echo ========================================
echo    Both Servers Are Starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Browser will open automatically in 30-60 seconds
echo.
echo To stop servers: Close the server windows or press Ctrl+C
echo.
pause

