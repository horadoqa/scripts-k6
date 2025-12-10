# Executando teste com Cron

## 🕒 **1. Objetivo do agendamento com cron**

Vamos automatizar:

### 1️⃣ Baixar usuários da API Serverest

```bash
./baixar_usuarios.sh
```

### 2️⃣ Rodar o teste k6 com relatório HTML

```bash
k6 run login-test.js
```

### 3️⃣ Guardar o relatório com um nome único por data

Exemplo:

```
relatorio-2025-12-10-20-15.html
```

---

# 🧰 **2. Criar script de automação**

Crie o arquivo:

### 📄 **executar_teste.sh**

```bash
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
```

---

# 📂 **3. Criar pasta para os relatórios**

```bash
mkdir -p relatorios
```

---

# 🔑 **4. Dar permissão de execução**

```bash
chmod +x executar-teste.sh
chmod +x baixar-usuarios.sh
```

---

# 🕒 **5. Configurar cron**

Edite o cron:

```bash
crontab -e
```

Agora escolha o agendamento desejado.

---

# 🗓️ **Exemplos de agendamento**

---

## ✔️ Executar **todos os dias às 02:00**

```cron
0 2 * * * /home/seu_usuario/projeto-k6/executar_teste.sh >> /home/seu_usuario/projeto-k6/cron.log 2>&1
```

---

## ✔️ Executar a cada **5 minutos**

```cron
*/5 * * * * /home/seu_usuario/projeto-k6/executar_teste.sh >> /home/seu_usuario/projeto-k6/cron.log 2>&1
```

---

## ✔️ Executar **toda hora**

```cron
0 * * * * /home/seu_usuario/projeto-k6/executar_teste.sh >> /home/seu_usuario/projeto-k6/cron.log 2>&1
```

---

# 📝 **6. Verificar logs do cron**

Todos os logs serão salvos em:

```
cron.log
```

Você pode visualizar assim:

```bash
tail -f cron.log
```

---

# 🎯 **Fluxo automático**

A cada execução do cron:

1️⃣ baixa os usuários
2️⃣ executa o k6
3️⃣ gera `relatorio.html`
4️⃣ salva com nome único baseado na data
5️⃣ armazena em `/relatorios/relatorio-AAAAMMDD-HHMM.html`

Tudo sem intervenção manual. 🚀

---

# Podemos também:

✔️ criar versão Dockerizada com cron interno
✔️ mandar o relatório por e-mail
✔️ enviar alerta no Telegram / Slack
✔️ manter histórico automático com limpeza após X dias

