import { check } from 'k6';
import http from 'k6/http';

export const options = {
  vus: 10,
  duration: '30s',
};

const domain = 'https://test.k6.io';

export default function () {
    let responses = http.batch([
        ['GET', domain + '/'],
        ['GET', domain + '/static/css/site.css'],
        ['GET', domain + '/static/js/prisms.js'],
        ['GET', domain + '/static/favicon.ico']
    ])

    // console.log('/', responses[0].status)
    // console.log('/static/css/site.css', responses[1].status)
    // console.log('/static/js/prisms.js', responses[2].status)
    // console.log('/static/favicon.ico', responses[3].status)
    
  check(responses[0], {
    'Homepage successfully loaded': (r) => r.body.includes("Collection of simple web-pages suitable for load testing"),
  });
  
}