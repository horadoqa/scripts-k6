#!/bin/bash

# Caminho do projeto
DIR="/home/seu_usuario/projeto-k6"

cd "$DIR"

echo "🔄 Baixando usuários..."
./baixar_usuarios.sh

echo "🧪 Executando teste k6..."
k6 run login-test.js

# Criar nome baseado na data
DATA=$(date +"%Y-%m-%d-%H-%M")

# Renomear relatório para histórico
mv relatorio.html "relatorios/relatorio-$DATA.html"

echo "📄 Relatório salvo em: relatorios/relatorio-$DATA.html"