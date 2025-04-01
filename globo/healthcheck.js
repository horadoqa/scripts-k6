import http from 'k6/http';

export const options = {
    stages: [
      { duration: '10s', target: 10 },
      { duration: '60s', target: 10 },
      { duration: '10s', target: 0 },
    ],
};

export default function () {

    const request = http.get('https://www.globo.com/healthcheck/');
    
    //console.log('Status Code: ', request.status)
    
};

// https://www.globo.com/healthcheck/
// https://g1.globo.com/healthcheck/
// https://ge.globo.com/healthcheck/
// https://gshow.globo.com/healthcheck/


// https://cartola.globo.com/healthcheck/
// https://globoplay.globo.com/healthcheck/
// https://valor.globo.com/healthcheck/
// https://oglobo.globo.com/healthcheck/
