<#
  preview.ps1 — view the site locally before pushing.
  Opens http://localhost:5500 in your browser and serves this folder.
  Press Ctrl+C to stop the server.
#>

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

$port = 5500
Write-Host "Serving $PSScriptRoot" -ForegroundColor Cyan
Write-Host "Open: http://localhost:$port" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop." -ForegroundColor DarkGray

Start-Process "http://localhost:$port"

try {
    python -m http.server $port
}
catch {
    npx --yes serve -l $port .
}
