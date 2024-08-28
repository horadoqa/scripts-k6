import http from 'k6/http';
import { check } from 'k6';

export default function () {
  // const res = http.get('https://test-api.k6.io/');

  // Faz o redirect automaticamente, http_reqs: 2
  // const res = http.get('https://globo.com');

  // Não precisa fazer o redirect, http_reqs: 1
  const res = http.get('https://www.globo.com');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'protocol is HTTP/2': (r) => r.proto === 'HTTP/2.0',
  });
}