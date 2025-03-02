import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '10s', target: 10 },
    { duration: '10s', target: 0 },
  ],
};

function globo() {
  const res = http.get('https://www.globo.com/');
  check(res, { 'status was 200': (r) => r.status == 200 });
}

function g1() {
  const res = http.get('https://g1.globo.com/');
  check(res, { 'status was 200': (r) => r.status == 200 });

}

function ge() {
  const res = http.get('https://ge.globo.com/');
  check(res, { 'status was 200': (r) => r.status == 200 });

}

function gshow() {
  const res = http.get('https://gshow.globo.com/');
  check(res, { 'status was 200': (r) => r.status == 200 });

}

export default function testSuite() {
  globo();
  g1();
  ge();
  gshow();
}