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

  sleep(1);
}
