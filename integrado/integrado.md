# INTEGRADO

No K6, você não pode importar diretamente scripts externos de outras funções ou arquivos K6, pois o K6 não suporta a importação de múltiplos arquivos da mesma forma que Node.js ou JavaScript no navegador. No entanto, você pode **refatorar seu código** para modularizar as funções e usá-las dentro de um único script.

### Solução: Modularizar Funções no K6

Embora o K6 não permita a importação direta de scripts como no Node.js, você pode organizar o código em funções e depois usá-las no script principal. Aqui está uma abordagem que pode funcionar para o seu caso:

#### Estrutura de Arquivos:
```
project/
│
├── script1.js   // Funções K6 do script1
├── script2.js   // Funções K6 do script2
├── main.js      // Script principal que chama as funções dos dois scripts
```

#### 1. **Modularizando as Funções no K6**:
Em vez de importar diretamente os scripts, você pode exportar as funções e chamá-las a partir de um único script. Aqui está como fazer isso:

### **Conteúdo de `script1.js`**:
```javascript
import http from 'k6/http';
import { check } from 'k6';

export function globo() {
  const response = http.get('https://www.globo.com/');
  check(response, { 'status é 200': (r) => r.status === 200 });
}
```

### **Conteúdo de `script2.js`**:
```javascript
import http from 'k6/http';
import { check } from 'k6';

export function g1() {
  const response = http.get('https://g1.globo.com/');
  check(response, { 'status é 200': (r) => r.status === 200 });
}
```

### **Conteúdo de `main.js`**:
No script principal, você pode chamar as funções exportadas de `script1.js` e `script2.js` para executar tudo em paralelo.

```javascript
import { globo } from './script1.js';  // Importa a função do script1
import { g1 } from './script2.js';     // Importa a função do script2
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '10s', target: 10 },
    { duration: '10s', target: 0 },
  ],
};

export default function() {
  // Chama as funções importadas em paralelo
  globo();
  g1();

  // Coloca um pequeno delay para não sobrecarregar o ambiente
  sleep(1);  // Isso garante que a execução do código seja um pouco mais controlada.
}
```

### Como Funciona:
- **Organização do Código**: Cada script exporta funções específicas e o script `main.js` chama essas funções.
- **Execução Paralela**: K6 executa todas as funções dentro da `default function` de forma simultânea, então as funções `globo()` e `g1()` são chamadas em paralelo.
- **Modularização**: O código é modularizado, e você ainda consegue centralizar a execução de múltiplos scripts em um único ponto (`main.js`).

### 2. **Script de Execução (main.js)**:
Esse script será o único que você executará com o comando `k6 run main.js`. As funções de `script1.js` e `script2.js` serão chamadas dentro da `default function` de `main.js`.

### **Limitação**:
Embora você consiga modularizar o código dessa forma, **não há paralelismo real entre os scripts** no K6. As requisições HTTP serão feitas uma após a outra, dentro da execução da função `default`. O K6 não permite a execução de múltiplos scripts em paralelo dentro de uma única execução, como você teria com a execução de processos em paralelo no Node.js.

### Conclusão:
Embora o K6 não ofereça uma forma de importar scripts diretamente como no Node.js, você pode estruturar seu código modularmente, com funções em arquivos separados, e chamá-las de maneira organizada. **A execução em paralelo de múltiplos scripts (em múltiplos VUs)** ocorre conforme as funções são executadas dentro da `default function`, mas **não há "paralelismo" no sentido de múltiplos scripts sendo executados simultaneamente**.