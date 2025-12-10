#!/bin/bash

URL="https://serverest.dev/usuarios"
OUTPUT="usuarios.json"

echo "🔄 Baixando usuários de $URL ..."

curl -s -X GET "$URL" \
    -H "accept: application/json" \
    -o "$OUTPUT"

if [ $? -eq 0 ]; then
    echo "✅ Arquivo salvo com sucesso em: $OUTPUT"
else
    echo "❌ Erro ao baixar os dados"
fi
