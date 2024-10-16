import http from 'k6/http';

export const options = {
  vus: 100,
  duration: '30s',
};

export default function () {

    const request = http.get('https://g1.globo.com/ac/acre/eleicoes/2024/resultado-das-apuracoes/porto-acre.ghtml');
    
    console.log('Status Code: ', request.status)
    
};
