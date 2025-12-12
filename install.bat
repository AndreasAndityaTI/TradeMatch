@echo off
REM TradeMatch Installation Script for Windows
REM This script sets up the complete TradeMatch application

echo ================================
echo TradeMatch Setup Script (Windows)
echo ================================
echo.

REM Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js v16 or higher.
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js is installed: %NODE_VERSION%

REM Check for npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install npm.
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm is installed: %NPM_VERSION%

REM Check for MySQL
where mysql >nul 2>nul
if %errorlevel% neq 0 (
    echo [WARNING] MySQL command line client not found in PATH
    echo Make sure MySQL Server is installed and running
) else (
    echo [OK] MySQL is found in PATH
)

echo.
echo Setting up Backend...

REM Navigate to backend directory
cd backend
if %errorlevel% neq 0 (
    echo [ERROR] backend directory not found
    exit /b 1
)

REM Install dependencies
echo.
echo Installing npm dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    exit /b 1
)
echo [OK] Dependencies installed successfully

REM Create .env.local from example
if not exist .env.local (
    echo.
    echo Creating .env.local...
    copy .env.local.example .env.local
    echo [OK] .env.local created. Please update with your MySQL credentials.
) else (
    echo [OK] .env.local already exists
)

echo.
echo ================================
echo Database Setup Instructions
echo ================================
echo.
echo Please run the following in your MySQL client (MySQL Workbench or Command Line):
echo.
echo   mysql -u root -p
echo   source ..\database\schema.sql;
echo.
echo Or directly in Command Prompt:
echo   mysql -u root -p < ..\database\schema.sql
echo.

echo.
echo ================================
echo Setup Complete!
echo ================================
echo.
echo Next steps:
echo 1. Update backend\.env.local with your MySQL credentials
echo 2. Create the database by running the SQL script
echo 3. Start the backend: npm run dev (from the backend folder)
echo 4. Open index.html in your browser for the frontend
echo.
echo Backend will run on: http://localhost:3000
echo Frontend: Open index.html in your browser
echo.
pause
