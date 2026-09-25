@echo off
title Incredible India - Local Web Server
echo ========================================================
echo   Launching Incredible India Static Website...
echo ========================================================
echo.
echo  Starting server at http://localhost:8085/
echo  Opening browser...
echo.

:: Open default web browser
start "" "http://localhost:8085"

:: Run inline PowerShell HTTP Listener
powershell -ExecutionPolicy Bypass -NoExit -Command "$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8085/'); $listener.Start(); Write-Host 'Server running at http://localhost:8085/'; Write-Host 'Keep this window open while browsing. Press Ctrl+C to stop.'; while ($listener.IsListening) { $context = $listener.GetContext(); $request = $context.Request; $response = $context.Response; $path = $request.Url.LocalPath; if ($path -eq '/') { $path = '/index.html' }; $localPath = Join-Path '%~dp0' $path.Substring(1).Replace('/', '\'); if (Test-Path $localPath -PathType Leaf) { $bytes = [System.IO.File]::ReadAllBytes($localPath); $response.ContentLength64 = $bytes.Length; if ($localPath.EndsWith('.html')) { $response.ContentType = 'text/html' } elseif ($localPath.EndsWith('.css')) { $response.ContentType = 'text/css' } elseif ($localPath.EndsWith('.js')) { $response.ContentType = 'application/javascript' } elseif ($localPath.EndsWith('.jpg') -or $localPath.EndsWith('.jpeg')) { $response.ContentType = 'image/jpeg' } elseif ($localPath.EndsWith('.png')) { $response.ContentType = 'image/png' }; $response.OutputStream.Write($bytes, 0, $bytes.Length) } else { $response.StatusCode = 404 }; $response.Close() }"
