import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  cloud: {
    distribution: {
      'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 34 },
      'amazon:gb:london': { loadZone: 'amazon:gb:london', percent: 33 },
      'amazon:au:sydney': { loadZone: 'amazon:au:sydney', percent: 33 },
    },
  },
  thresholds: {},
  scenarios: {
    globo: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '15s' },
        { target: 20, duration: '15s' },
        { target: 0, duration: '15s' },
      ],
      gracefulRampDown: '30s',
      exec: 'globo',
    },
  },
};

export function globo() {
  
  const response = http.get('https://www.globo.com/');
  check(response, { 'status was 200': (r) => r.status == 200 });
  sleep(0.1);
}