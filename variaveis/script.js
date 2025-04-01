import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '10s', target: 10 },
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  const response = http.get(`${__ENV.MY_HOSTNAME}`);

  // console.log('Status Code: ', response.status);
  
  check(response, {
    'Status é 200': (r) => r.status === 200,
  });
}