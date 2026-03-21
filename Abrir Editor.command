#!/bin/bash
# Editor Visual — Clube dos Referidos

cd "$(dirname "$0")"

# Mata qualquer servidor anterior na porta 3456
lsof -ti :3456 | xargs kill -9 2>/dev/null

echo "Iniciando servidor local na porta 3456..."
python3 -m http.server 3456 &
SERVER_PID=$!

sleep 1

echo "Abrindo editor no Chrome..."
open -a "Google Chrome" "http://localhost:3456/editor.html" 2>/dev/null || \
open "http://localhost:3456/editor.html"

echo ""
echo "✅ Editor rodando em: http://localhost:3456/editor.html"
echo "   Feche esta janela para encerrar o servidor."
echo ""

# Mantém o servidor vivo enquanto a janela estiver aberta
wait $SERVER_PID
