import http from 'k6/http';
import { sleep } from 'k6';

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
  },
  discardResponseBodies: true,
  thresholds: {
    'http_req_duration{test_type:globo}': ['avg>2.500'],
    'http_req_duration{test_type:g1}': ['avg>2.500'],
    'http_req_duration{test_type:ge}': ['avg>2.500'],
  },
};


export function globo() {
  http.get('https://www.globo.com/');
}

export function g1() {
  http.get('https://g1.globo.com/');
}

export function ge() {
  http.get('https://ge.globo.com/');
}