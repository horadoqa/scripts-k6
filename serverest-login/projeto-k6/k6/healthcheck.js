import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  duration: '5m',
  vus: 10, // número de usuários virtuais
  // iterations: 10, // Se você quer 10 execuções totais
};

export default function () {
  http.get('https://www.horadoqa.com.br/healthchecks');
 
}


