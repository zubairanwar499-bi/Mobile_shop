@echo off
title Deploy Qasir Mobile Shop to Vercel
color 0b
echo ================================================================
echo          DEPLOYING QASIR MOBILE SHOP TO VERCEL
echo ================================================================
echo.

cd /d D:\mobile

echo Running Vercel deployment...
echo (If prompted, log in with your GitHub or email)
echo.

npx vercel --prod

echo.
pause
