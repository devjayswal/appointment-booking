@echo off
SET BASE_URL=%1
IF "%BASE_URL%"=="" SET BASE_URL=http://localhost:3000

SET EMAIL=test%RANDOM%@example.com
SET PASSWORD=Passw0rd!

echo === Running API tests on %BASE_URL% ===

echo.
echo === 1. Register (Patient) ===
curl -X POST "%BASE_URL%/api/register" ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"%EMAIL%\",\"password\":\"%PASSWORD%\"}"

echo.
echo === 2. Login (Patient) ===
curl -i -X POST "%BASE_URL%/api/login" ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"%EMAIL%\",\"password\":\"%PASSWORD%\"}"

echo.
echo After the above login response, copy the token value manually.

pause

SET /P TOKEN="Paste token value here: "

echo.
echo === 3. Get Slots ===
curl "%BASE_URL%/api/slots" -b "token=%TOKEN%"

echo.
SET /P SLOTID="Enter a slotId from above (ISO string): "

echo.
echo === 4. Book Slot ===
curl -X POST "%BASE_URL%/api/book" ^
  -H "Content-Type: application/json" ^
  -b "token=%TOKEN%" ^
  -d "{\"slotId\":\"%SLOTID%\"}"

echo.
echo === 5. My Bookings ===
curl "%BASE_URL%/api/my-bookings" -b "token=%TOKEN%"
