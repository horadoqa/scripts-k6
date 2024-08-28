import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '10s', target: 20 },
    { duration: '10s', target: 0 },
  ],
};

function url1() {
  const res = http.get('https://globo.com/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

function url2() {
  const res = http.get('https://globo.com/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

function url3() {
  const res = http.get('https://globo.com/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

function url4() {
  const res = http.get('https://globo.com/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

export default function testSuite() {
  url1();
  url2();
  url3();
  url4();
}