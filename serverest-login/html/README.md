# Executar o Script e criar um relatório HTML com k6-reporter

## 🧪 **1. Script k6 com suporte a relatório HTML**

Aqui está o script **completo**, incluindo o `handleSummary` para gerar o relatório:

### 📄 **login-test.js (com HTML)**

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// 📌 Executar por 5 minutos
export const options = {
    duration: '5m',
    vus: 1
};

// Carrega o JSON com os usuários
const usuarios = new SharedArray('usuarios', function () {
    const data = JSON.parse(open('./usuarios.json'));

    if (!data.usuarios || !Array.isArray(data.usuarios)) {
        throw new Error("O arquivo usuarios.json precisa conter a propriedade 'usuarios' como array.");
    }

    return data.usuarios;
});

// Função que retorna usuário aleatório
function getRandomUser() {
    return usuarios[Math.floor(Math.random() * usuarios.length)];
}

// Teste principal
export default function () {
    const u = getRandomUser();

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

    sleep(1);
}

// 📄 Gera relatório HTML ao final
export function handleSummary(data) {
    return {
        "relatorio.html": htmlReport(data),
    };
}
```

---

# 📁 **3. Executar o teste**

Basta rodar:

```bash
k6 run login.js
```

Ao final da execução, será criado automaticamente o arquivo:

```
relatorio.html
```

---

# 🔍 **4. Abrir o relatório**

Simplesmente abra no navegador:

```bash
xdg-open relatorio.html
```

ou no macOS:

```bash
open relatorio.html
```

ou no Windows:

```
relatorio.html
```

---

# 🎯 **Resumo do fluxo**

1️⃣ Baixar usuários:

```bash
./baixar_usuarios.sh
```

2️⃣ Rodar teste com relatório HTML:

```bash
k6 run login.js
```

3️⃣ Abrir o relatório gerado:

```
relatorio.html
```

---

