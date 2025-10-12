@echo off
echo Starting MERN Todo App...
echo.
echo Starting Backend Server...
start cmd /k "cd backend && npm start"
timeout /t 3 /nobreak > nul
echo.
echo Starting Frontend Server...
start cmd /k "cd frontend && npm start"
echo.
echo Both servers are starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000 (will open automatically)
echo.
echo Press any key to exit this window (servers will keep running)
pause > nul

