# Scripts K6

Este repositório contém scripts escritos em JavaScript para utilizar com o K6, uma ferramenta de **teste de carga e performance**. Os scripts são projetados para simular usuários virtuais (VUs) que executam requisições HTTP em seus endpoints para avaliar o desempenho de sistemas.

## Como Usar

1. **Instalar o K6**:
   Caso ainda não tenha o K6 instalado, você pode instalá-lo utilizando os comandos abaixo dependendo do seu sistema operacional:

   - **Linux**: 
     ```bash
     sudo apt install k6
     ```

   - **macOS** (via Homebrew):
     ```bash
     brew install k6
     ```

   - **Windows**: 
     Baixe o instalador [aqui](https://k6.io/docs/getting-started/).

2. **Executar um Script**:
   Para executar um dos scripts K6, use o seguinte comando no terminal:

   ```bash
   k6 run <nome-do-script.js>
   ```

   Onde `<nome-do-script.js>` é o nome do arquivo de script que você deseja rodar.

## Estrutura dos Scripts

- **Cenários de Teste**: 
  Os scripts geralmente contêm cenários de teste, definidos na configuração `options`, que permitem simular um número constante ou variável de usuários virtuais (VUs), controlar a duração do teste e definir metas de performance.

- **Funções de Teste**:
  Cada script inclui funções específicas para realizar requisições HTTP e validar o comportamento do sistema. As funções podem ser distribuídas em múltiplos arquivos e importadas de forma modular.

## Exemplo de Execução de Script

### 1. **Script Básico**:

```javascript
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,         // Número de usuários virtuais
  duration: '30s', // Duração do teste
};

export default function () {
  const response = http.get('https://example.com');
  check(response, {
    'status é 200': (r) => r.status === 200,
  });
}
```

### 2. **Executando o Script**:
Execute o script básico com o comando:

```bash
k6 run basic-script.js
```

### 3. **Saída do Comando**:
Durante a execução, o K6 irá gerar métricas de performance, como a duração das requisições, tempo de resposta, taxas de erro e muito mais. A saída será exibida no terminal.

## Configuração Avançada

Você pode configurar diferentes **cenários** para simular diferentes condições de carga. Aqui está um exemplo de configuração com múltiplos cenários:

```javascript
export const options = {
  scenarios: {
    scenario1: {
      executor: 'constant-vus',
      vus: 10, 
      duration: '30s',
    },
    scenario2: {
      executor: 'ramping-vus',
      startVUs: 5,
      stages: [
        { duration: '30s', target: 20 },
        { duration: '30s', target: 0 },
      ],
    },
  },
};
```

## Recursos

- **Documentação do K6**: [https://k6.io/docs](https://k6.io/docs)
- **Configuração de Cenarios no K6**: [https://k6.io/docs/using-k6/scenarios](https://k6.io/docs/using-k6/scenarios)

## Contribuindo

Se você encontrar bugs ou tiver sugestões de melhorias, fique à vontade para contribuir com pull requests ou abrir uma issue.

---

Essa versão da documentação oferece mais contexto sobre como usar e entender os scripts K6, exemplos práticos e uma explicação básica sobre o funcionamento dos testes de carga com o K6.