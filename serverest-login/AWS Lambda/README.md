# Criar uma **AWS Lambda** para executar automação

---

## 📝 **Diferenças e considerações**

1. **Execução curta:**
   Lambda tem limite máximo de execução de **15 minutos** por invocação. Se seu teste durar mais que isso (ex.: 5 minutos), ok, mas não pode passar do limite.

2. **Agendamento via CloudWatch Events / EventBridge:**
   Você não usa `cron` dentro do Lambda, mas sim o **CloudWatch Events** ou **EventBridge** para agendar execuções periódicas.

3. **Ambiente sem persistência de arquivos:**
   Lambda possui um espaço temporário limitado (`/tmp`) para armazenar arquivos (até 512 MB). Então o `usuarios.json` e o `relatorio.html` devem ser salvos em `/tmp` e, se quiser persistência, você precisa enviar para **S3**.

4. **Execução de k6:**
   Para rodar k6 dentro de Lambda, você precisará de uma **imagem Lambda customizada (container)** que tenha o k6 instalado. Não dá para instalar k6 dinamicamente dentro do Lambda padrão Node.js ou Python.

---

# ✅ **Arquitetura sugerida**

1. Lambda function com **Node.js** (ou container custom)

2. Código Lambda faz:

   * Baixa `usuarios.json` via `fetch` ou `axios` (API Serverest)
   * Executa o teste k6 dentro do container
   * Salva o relatório HTML em `/tmp`
   * Faz upload do relatório para **S3**

3. CloudWatch Events / EventBridge dispara a Lambda conforme cron desejado, por exemplo:

   * Todo dia às 02:00
   * A cada 6 horas

---

# 🔹 **Fluxo resumido**

```
CloudWatch Event → Lambda
Lambda:
    1. Baixa /tmp/usuarios.json
    2. Executa k6 (teste de login) → gera /tmp/relatorio.html
    3. Envia relatorio.html para S3
S3: armazena histórico dos relatórios
```

---

# 🔹 **Alternativa mais simples**

Se quiser evitar container e k6 dentro do Lambda:

* Faça Lambda **somente baixar os usuários** e gerar JSON
* Salve em **S3**
* Continue rodando o **k6 local ou em EC2 / ECS** usando esse arquivo do S3

---

Se você quiser, eu posso criar um **exemplo completo de Lambda em Node.js** que:

* Baixa `usuarios.json` da API
* Salva no S3
* Opcionalmente dispara o k6 (se usar container)
