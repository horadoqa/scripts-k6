import http from 'k6/http';
import { check } from 'k6';


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
    'http_req_duration{test_type:g1}': ['avg>2.500'],
    'http_req_duration{test_type:ge}': ['avg>3.000'],
    'http_req_duration{test_type:globo}': ['avg>6.000'],
    'http_req_duration{test_type:gshow}': ['avg>2.500'],
  },
};


export function globo() {
  const response = http.get('https://www.globo.com/');

  console.log('Globo: ', response.status);
  
  check(response, {
    'status é 200': (r) => r.status === 200,
  });
}

export function g1() {
  const response = http.get('https://g1.globo.com/');

  console.log('G1: ', response.status);

  check(response, {
    'status é 200': (r) => r.status === 200,
  });
}

export function ge() {
  const response = http.get('https://ge.globo.com/');

  console.log('GE: ', response.status);

  check(response, {
    'status é 200': (r) => r.status === 200,
  });
}

export function gshow() {
  const response = http.get('https://gshow.globo.com/');

  console.log('Gshow: ', response.status);

  check(response, {
    'status é 200': (r) => r.status === 200,
  });
}