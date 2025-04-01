import http from 'k6/http';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {

    const request = http.get('https://www.globo.com/healthcheck/');
    
    console.log('Status Code: ', request.status)
    
};
