<#
  deploy.ps1 — one command to publish the portfolio.

  Usage (from anywhere):
    cd "E:\Programmng Space\Portfolio"
    .\deploy.ps1                       # auto commit message
    .\deploy.ps1 "fixed hero text"     # custom commit message

  If PowerShell blocks the script, run once:
    Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
#>

param(
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

if (-not (Test-Path ".git")) {
    Write-Host "Not a git repository here. Run: git init" -ForegroundColor Red
    exit 1
}

if ([string]::IsNullOrWhiteSpace($Message)) {
    $Message = "update site - " + (Get-Date -Format "yyyy-MM-dd HH:mm")
}

# stage everything
git add -A

$pending = git status --porcelain
if ([string]::IsNullOrWhiteSpace($pending)) {
    Write-Host "Nothing to deploy - no changes since the last push." -ForegroundColor Yellow
    exit 0
}

git commit -m $Message
if ($LASTEXITCODE -ne 0) {
    Write-Host "Commit failed. Fix the error above and try again." -ForegroundColor Red
    exit 1
}

git push
if ($LASTEXITCODE -ne 0) {
    Write-Host "Push failed. Check your internet / GitHub login (gh auth status)." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Pushed. Cloudflare Pages rebuilds in about 30-60 seconds." -ForegroundColor Green
Write-Host "Live: https://developerx.site" -ForegroundColor Cyan
