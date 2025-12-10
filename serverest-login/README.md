# 📘 **Automação de Login com k6 usando Lista de Usuários da API Serverest**

Este projeto tem como objetivo:

1. **Baixar automaticamente a lista de usuários** da API publica `https://serverest.dev/usuarios`
2. **Salvar os dados no arquivo `usuarios.json`**
3. **Executar um teste de carga com k6**, fazendo tentativas de login usando usuários aleatórios durante 5 minutos

---

## 📂 Estrutura do projeto

```
/
├── baixar_usuarios.sh       # Script shell que baixa os usuários da API
├── usuarios.json            # Arquivo gerado automaticamente pelo script
└── login-randomico.js       # Script k6 que executa logins por 5 minutos
```

---

# 🧰 **1. Script Shell – Baixar usuários**

O arquivo `baixar_usuarios.sh` faz uma requisição GET para a API:

```
https://serverest.dev/usuarios
```

e salva o resultado no arquivo `usuarios.json`.

### 📄 **baixar_usuarios.sh**

```sh
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
```

---

## ▶️ Como usar o script shell

1. Torne o script executável:

```bash
chmod +x baixar_usuarios.sh
```

2. Execute o script:

```bash
./baixar_usuarios.sh
```

Isso irá gerar/atualizar o arquivo:

```
usuarios.json
```

O arquivo conterá algo como:

```json
{
  "quantidade": 383,
  "usuarios": [
    {
      "nome": "Fulano",
      "email": "fulano@teste.com",
      "password": "senha",
      "administrador": "false",
      "_id": "abc123"
    }
  ]
}
```

---

# ⚙️ **2. Script k6 – Teste de Login com Usuários Aleatórios**

O script `login-test.js` executa um teste que:

✔ Lê o arquivo `usuarios.json`
✔ Escolhe um usuário aleatório a cada iteração
✔ Faz login na API `https://serverest.dev/login`
✔ Executa por **5 minutos**
✔ Mostra status, email e senha usados na tentativa

---

### 📄 **login-test.js**

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// 📌 Configuração do teste: duração 5 minutos
export const options = {
    duration: '5m',
    vus: 1, // Ajuste se quiser mais carga
};

// Carrega somente o array "usuarios" do JSON
const usuarios = new SharedArray('usuarios', function () {
    const data = JSON.parse(open('./usuarios.json'));

    if (!data.usuarios || !Array.isArray(data.usuarios)) {
        throw new Error("O arquivo usuarios.json precisa conter a propriedade 'usuarios' como array.");
    }

    return data.usuarios; // Retorna somente o array
});

// Função para pegar um usuário aleatório
function getRandomUser() {
    return usuarios[Math.floor(Math.random() * usuarios.length)];
}

export default function () {

    const u = getRandomUser(); // <-- usuário randômico

    const payload = JSON.stringify({
        email: u.email,
        password: u.password
    });

    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };

    const res = http.post('https://serverest.dev/login', payload, { headers });

    check(res, {
        "status 200": (r) => r.status === 200,
    });

    console.log(`Email: ${u.email} | Password: ${u.password} | Status: ${res.status}`);

    sleep(1); // pequena pausa entre execuções
}
```

---

## ▶️ Como executar o teste k6

1. Verifique se o arquivo `usuarios.json` existe (rode o script shell antes).
2. Execute o teste:

```bash
k6 run login-randomico.js
```

O k6 irá:

* Escolher um usuário aleatoriamente a cada iteração
* Tentar fazer login por **5 minutos**
* Imprimir algo como:

```
Email: fulano@teste.com | Password: Senha@123 | Status: 200
```

---

# ✔️ **Fluxo Completo de Uso**

1️⃣ Baixar lista de usuários:

```bash
./baixar_usuarios.sh
```

2️⃣ Executar o teste de login:

```bash
k6 run login-randomico.js
```

3️⃣ Analisar resultados no terminal

---

# 🚀 Pronto!

Se quiser, posso criar também:

* 📊 versão com relatório HTML
* ⚙️ testes com múltiplos níveis de carga (ramp-up/down)
* 🧪 envio de métricas para Grafana/InfluxDB
* 🔁 agendamento automático com cron

É só pedir!
