import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { check, fail } from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

export const options = {
    stages: [
      { duration: '6s', target: 1 },
      { duration: '2s', target: 1 },
      { duration: '2s', target: 0 },
    ],
  };

const rotas = new SharedArray('rotas', function () {
    return papaparse.parse(open('rotas.csv'), { header: true }).data;
});

function request(config, rota) {
    const url = 'http://xxx/'+rota;
    console.log(url)
    return http.get(url);
}

export default function (config) {
    const rota = rotas[Math.floor(Math.random() * rotas.length-1)];

   if(typeof rota  !== "undefined"){

	const response = request(config, rota.rota);
    	if(!check(response, {
        	"step: response code was 200": (response) => response.status == 200,
    	})) {
        	fail("Falha na requisição"+rota.rota);
    	};
  }
}