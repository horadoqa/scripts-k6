import http from 'k6/http'
import { check, sleep } from 'k6';

export function g1() {
  const response = http.get('https://g1.globo.com/');
  check(response, { 'status é 200': (r) => r.status === 200 });
  sleep(0.1); 
}