@echo off
REM ChatApp Quick Start for Windows

echo.
echo ============================================
echo   ChatApp - AI Chat Application
echo ============================================
echo.
echo Step 1: Check .env file
echo.
if exist .env (
    echo ✓ .env file found
    echo.
    echo Open .env file in any text editor and add your OpenAI API key:
    echo.
    echo   OPENAI_API_KEY=sk-your-key-here
    echo.
    echo Get your key from: https://platform.openai.com/api-keys
    echo.
) else (
    echo ✗ .env file not found - creating one now...
    (
        echo # Add your OpenAI API key here
        echo OPENAI_API_KEY=sk-
        echo PORT=5174
    ) > .env
    echo ✓ .env file created
    echo.
    echo Now open .env and add your OpenAI API key
    echo.
)

echo Step 2: Start the app
echo.
echo Running: npm run dev
echo.
echo This will start:
echo   - Backend server on http://localhost:5174
echo   - Frontend on http://localhost:5173
echo.
pause

npm run dev
