@echo off
title Push Mobile Shop to GitHub
color 0b
echo ================================================================
echo          PUSHING QASIR MOBILE SHOP CODE TO GITHUB
echo ================================================================
echo.

cd /d D:\mobile

echo Setting up remote...
git remote set-url origin https://github.com/zubairanwar499-bi/Mobile_shop.git

echo.
echo Starting Push to https://github.com/zubairanwar499-bi/Mobile_shop.git ...
echo (If a GitHub sign-in window opens, please click 'Sign in with your browser')
echo.

git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ================================================================
    echo           SUCCESS! CODE PUSHED TO GITHUB SUCCESSFULLY!
    echo ================================================================
) else (
    echo ================================================================
    echo           PUSH FAILED. PLEASE CHECK GITHUB CREDENTIALS.
    echo ================================================================
)

echo.
pause
