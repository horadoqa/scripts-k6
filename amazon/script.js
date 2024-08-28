import { sleep } from 'k6';
import http from 'k6/http';

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
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '15s' },
        { target: 20, duration: '15s' },
        { target: 0, duration: '15s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
};

export function scenario_1() {
  let response;

  // Get homepage
  response = http.get('https://test.k6.io/');

  // Automatically added sleep
  sleep(1);
}