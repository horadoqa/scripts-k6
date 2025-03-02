# MISTO 

Este código é um script de teste de carga escrito usando o **K6**, uma ferramenta de teste de desempenho para APIs e websites. Vamos quebrá-lo e descrever as partes principais:

### 1. **Importação do módulo `http` do K6:**
```javascript
import http from 'k6/http';
```
Aqui, o script importa o módulo `http` do K6, que permite fazer requisições HTTP, como `GET` e `POST`, para os sites que você está testando.

### 2. **Configuração de cenários de teste (`options`):**
```javascript
export const options = {
  scenarios: {
    globo: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
      gracefulStop: '0s', 
      tags: { test_type: 'globo' },
      exec: 'globo',
    },
    g1: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
      gracefulStop: '0s', 
      tags: { test_type: 'g1' },
      exec: 'g1',
    },
    ge: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
      gracefulStop: '0s',
      tags: { test_type: 'ge' },
      exec: 'ge',
    },
    gshow: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
      gracefulStop: '0s',
      tags: { test_type: 'gshow' },
      exec: 'gshow',
    },
  },
  discardResponseBodies: true,
  thresholds: {
    'http_req_duration{test_type:globo}': ['avg>500'],
    'http_req_duration{test_type:g1}': ['avg>500'],
    'http_req_duration{test_type:ge}': ['avg>500'],
    'http_req_duration{test_type:gshow}': ['avg>500'],
  },
};
```

#### Explicação dos parâmetros:
- **`scenarios`**: Define os cenários de teste. Cada cenário descreve uma URL diferente para ser testada.
  - Cada cenário tem os seguintes parâmetros:
    - **`executor: 'constant-vus'`**: Define que o número de usuários virtuais (VUs) será constante durante a execução do teste.
    - **`vus: 10`**: Define que 10 usuários virtuais serão simulados.
    - **`duration: '30s'`**: O teste será executado por 30 segundos.
    - **`gracefulStop: '0s'`**: Não há tempo adicional para terminar o teste de forma suave.
    - **`tags`**: Usa tags para identificar e categorizar o teste (ex: `test_type: 'globo'`).
    - **`exec`**: Especifica a função que será executada para cada cenário (por exemplo, `globo`, `g1`, etc.).

- **`discardResponseBodies: true`**: Configuração para descartar os corpos das respostas, o que significa que os conteúdos das respostas HTTP não serão armazenados durante o teste. Isso ajuda a melhorar o desempenho dos testes.

- **`thresholds`**: Define limites para o desempenho dos testes. Aqui, é definido um limite para a duração da requisição HTTP (`http_req_duration`), que deve ser superior a 2.5 segundos em média para os sites `globo`, `g1`, e `ge`.

### 3. **Funções de execução (`globo`, `g1`, `ge`, `gshow`):**
```javascript
export function globo() {
  http.get('https://www.globo.com/');
}

export function g1() {
  http.get('https://g1.globo.com/');
}

export function ge() {
  http.get('https://ge.globo.com/');
}

export function gshow() {
  http.get('https://gshow.globo.com/');
}
```
Essas funções executam requisições HTTP **GET** para diferentes URLs. Cada função é chamada em seu respectivo cenário de teste:
- `globo()` faz uma requisição para `https://www.globo.com/`
- `g1()` faz uma requisição para `https://g1.globo.com/`
- `ge()` faz uma requisição para `https://ge.globo.com/`
- `gshow()` faz uma requisição para `https://gshow.globo.com/`

### Resumo:
Este código configura um teste de carga para quatro sites diferentes da Globo (Globo, G1, GE e Gshow). Para cada site, 10 usuários virtuais são simulados durante 30 segundos. A resposta de cada requisição HTTP é monitorada, e a duração da requisição deve ser, em média, superior a 2.5 segundos para passar no teste. O corpo das respostas não é armazenado, para otimizar a execução dos testes.

As requisições serão feitas em paralelo, com cada usuário virtual (VU) realizando a requisição para o seu respectivo site. O número de requisições simultâneas depende do número de usuários virtuais configurados (vus: 10), e cada um deles vai chamar a função especificada no cenário correspondente. O total de requisições será 10 por cenário, realizadas de forma simultânea para os 10 usuários virtuais.